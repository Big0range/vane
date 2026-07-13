import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { createHtmlPlugin } from 'vite-plugin-html';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import removeConsole from 'vite-plugin-remove-console';
import { webUpdateNotice } from '@plugin-web-update-notification/vite';
import dayjs from 'dayjs';
import { execSync } from 'node:child_process';

function git(cmd: string): string {
  try {
    return execSync(cmd, { encoding: 'utf8' }).trim();
  } catch {
    return 'unknown';
  }
}

const buildInfo = {
  branch: git('git rev-parse --abbrev-ref HEAD'),
  commit: git('git rev-parse --short HEAD'),
  author: git('git log -1 --pretty=%an'),
  message: git('git log -1 --pretty=%s'),
  date: dayjs().format('YYYY-MM-DD HH:mm:ss'),
};
// https://vite.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  console.log('env', env);
  return {
    build: {
      minify: 'terser',
      terserOptions: {
        // compress: {
        //   drop_console: true,
        //   drop_debugger: true,
        // },
      },
    },
    plugins: [
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: env.VITE_APP_TITLE,
          },
        },
      }),
      vue(),
      vueJsx(),
      Components({
        dts: 'src/components/components.d.ts',
        dirs: ['src/components'],
        resolvers: [NaiveUiResolver()],
      }),
      tailwindcss(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
      // !打包时去除console.log
      removeConsole(),
      webUpdateNotice({
        versionType: 'custom',
        customVersion: buildInfo.date,
        logVersion: version => {
          console.log('version', version);
          console.log(buildInfo);
        },
        checkInterval: 20 * 60 * 1000,
        notificationProps: {
          title: '系统升级通知',
          description: '检测到当前系统版本已更新，请刷新页面后使用。',
          buttonText: '刷新',
          dismissButtonText: '忽略',
        },
      }),
    ],
    server: {
      host: '0.0.0.0',
      port: Number(env.VITE_APP_PORT),
      open: true, // 运行自动打开浏览器
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: 'http://127.0.0.1:9999/', //后端本地
          changeOrigin: true,
          rewrite: path =>
            path.replace(new RegExp('^' + env.VITE_APP_BASE_API), ''),
        },
      },
    },
    resolve: {
      // Vite路径别名配置
      alias: {
        '@': path.resolve('./src'),
        '@root': path.resolve('../'),
      },
    },
  };
});

/**
 *      ┌─┐       ┌─┐
 *   ┌──┘ ┴───────┘ ┴──┐
 *   │                 │
 *   │       ───       │
 *   │  ─┬┘       └┬─  │
 *   │                 │
 *   │       ─┴─       │
 *   │                 │
 *   └───┐         ┌───┘
 *       │         │
 *       │         │
 *       │         │
 *       │         └──────────────┐
 *       │                        │
 *       │                        ├─┐
 *       │                        ┌─┘
 *       │                        │
 *       └─┐  ┐  ┌───────┬──┐  ┌──┘
 *         │ ─┤ ─┤       │ ─┤ ─┤
 *         └──┴──┘       └──┴──┘
 *                神兽保佑
 *               代码无BUG!
 */
