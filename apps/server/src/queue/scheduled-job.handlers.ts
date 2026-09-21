import { execFile } from 'node:child_process';
import { access, readdir } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import { logger } from '#/utils/useLogger.ts';

const execFileAsync = promisify(execFile);
const scriptsDirectory = path.resolve(import.meta.dirname, '../scripts');
const serverDirectory = path.resolve(scriptsDirectory, '../..');

// 每个服务端动作接收脚本参数，并返回执行结果文本。
export type ScheduledJobHandler = (args: string[]) => Promise<string | void>;

export type ScheduledJobActionOptions = {
  builtInActions: { label: string; value: string }[];
  scripts: { label: string; value: string }[];
};

/**
 * 扫描 src/scripts 目录及其子目录中的 TypeScript 文件。
 * 返回值使用相对路径，例如 cleanup.ts 会映射为 script:cleanup，
 * reports/daily.ts 会映射为 script:reports/daily。
 */
async function listScriptNames(directory = scriptsDirectory, prefix = ''): Promise<string[]> {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    const results = await Promise.all(
      entries.map(async (entry) => {
        const relativePath = path.posix.join(prefix, entry.name);
        if (entry.isDirectory())
          return listScriptNames(path.join(directory, entry.name), relativePath);
        if (entry.isFile() && entry.name.endsWith('.ts')) return [relativePath.slice(0, -3)];
        return [];
      }),
    );
    return results.flat();
  } catch (error: any) {
    // scripts 目录尚不存在时，页面只显示内置动作。
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

/**
 * 解析任务表中保存的脚本参数 JSON 数组。
 * 内置动作不使用参数，TS 脚本则将数组的每一项作为独立 argv 传入。
 */
export function parseScriptArgs(scriptArgs?: string): string[] {
  if (!scriptArgs?.trim()) return [];
  try {
    return validateScriptArgs(JSON.parse(scriptArgs));
  } catch {
    throw new Error('脚本参数必须是字符串数组');
  }
}

// 脚本任务保存时校验参数，避免运行后才发现格式错误。
export function validateScriptArgs(args: unknown): string[] {
  if (args === undefined) return [];
  if (!Array.isArray(args) || args.some((arg) => typeof arg !== 'string')) {
    throw new Error('脚本参数必须是字符串数组');
  }
  return args;
}

/**
 * 当前服务的启动环境决定脚本加载哪个环境文件：
 * - NODE_ENV=production：.env + .env.production
 * - 其他情况：.env + .env.development
 *
 * 这两个文件都是必需的。脚本会继承当前服务进程的环境变量，
 * 同时 Node 会按顺序再次读取这两个 env 文件。
 */
async function getEnvironmentArguments() {
  const environmentFile =
    process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
  const baseEnvironmentFile = path.join(serverDirectory, '.env');
  const modeEnvironmentFile = path.join(serverDirectory, environmentFile);
  try {
    await Promise.all([access(baseEnvironmentFile), access(modeEnvironmentFile)]);
  } catch {
    throw new Error(`脚本执行需要 ${baseEnvironmentFile} 和 ${modeEnvironmentFile}`);
  }
  return [`--env-file=${baseEnvironmentFile}`, `--env-file=${modeEnvironmentFile}`];
}

/**
 * 内置服务端动作注册表。
 * 在这里新增的动作会显示在“内置动作”选择器中。
 */
const builtInHandlers: Record<string, ScheduledJobHandler> = {
  // 用于测试调度是否正常：将固定文本写入服务端日志。
  'system:log': async () => {
    const message = '定时任务已执行';
    logger.info(`[scheduled-job] ${message}`);
    return message;
  },
};

export async function getScheduledJobActionOptions(): Promise<ScheduledJobActionOptions> {
  const scripts = await listScriptNames();
  return {
    builtInActions: [{ label: '写入服务端日志', value: 'system:log' }],
    scripts: scripts.map((name) => ({ label: `${name}.ts`, value: `script:${name}` })),
  };
}

/**
 * 判断动作是否存在。
 * 脚本动作必须真实存在于 src/scripts 中，不能由前端伪造路径。
 */
export async function hasScheduledJobHandler(handlerKey: string) {
  if (Object.hasOwn(builtInHandlers, handlerKey)) return true;
  if (!handlerKey.startsWith('script:')) return false;
  const scriptName = handlerKey.slice('script:'.length);
  return (await listScriptNames()).includes(scriptName);
}

/**
 * 根据任务动作键返回实际执行函数。
 * TS 脚本使用当前 Node 进程执行，并始终携带 .env 和当前环境文件。
 * 用户填写的参数只是 execFile 的独立参数，不会经过 Shell 解析。
 */
export async function getScheduledJobHandler(
  handlerKey: string,
): Promise<ScheduledJobHandler | undefined> {
  if (Object.hasOwn(builtInHandlers, handlerKey)) return builtInHandlers[handlerKey];
  if (!handlerKey.startsWith('script:')) return undefined;

  const scriptName = handlerKey.slice('script:'.length);
  if (!(await listScriptNames()).includes(scriptName)) return undefined;
  const scriptPath = path.resolve(scriptsDirectory, `${scriptName}.ts`);

  return async (args) => {
    const environmentArgs = await getEnvironmentArguments();
    const { stdout, stderr } = await execFileAsync(
      process.execPath,
      [...environmentArgs, scriptPath, ...args],
      {
        cwd: serverDirectory,
        shell: false,
        timeout: 300000,
      },
    );
    const output = [stdout, stderr].filter(Boolean).join('\n').trim();
    return output || `脚本 ${scriptName}.ts 执行完成`;
  };
}
