import { execSync, spawnSync } from 'node:child_process';

const MAX_COMMAND_LENGTH = 7000;

const files = execSync('git diff --cached --name-only --diff-filter=ACMR', {
  encoding: 'utf8',
})
  .split('\n')
  .filter(Boolean);

const formatFiles = files.filter(file =>
  /\.(js|jsx|ts|tsx|vue|json|css|scss|md|yaml|yml)$/.test(file),
);

if (!formatFiles.length) {
  process.exit(0);
}

function quoteArg(arg: string) {
  return /\s/.test(arg) ? `"${arg}"` : arg;
}

function chunkArgs(baseArgs: string[], args: string[]) {
  const chunks: string[][] = [];
  let current: string[] = [];
  let currentLength = baseArgs.map(quoteArg).join(' ').length;

  for (const arg of args) {
    const argLength = quoteArg(arg).length + 1;

    if (current.length && currentLength + argLength > MAX_COMMAND_LENGTH) {
      chunks.push(current);
      current = [];
      currentLength = baseArgs.map(quoteArg).join(' ').length;
    }

    current.push(arg);
    currentLength += argLength;
  }

  if (current.length) {
    chunks.push(current);
  }

  return chunks;
}

function runChunked(command: string, baseArgs: string[], args: string[]) {
  for (const chunk of chunkArgs(baseArgs, args)) {
    const result = spawnSync(command, [...baseArgs, ...chunk], {
      stdio: 'inherit',
      shell: true,
    });

    if (result.status !== 0) {
      process.exit(result.status ?? 1);
    }
  }
}

const eslintFiles = formatFiles.filter(file =>
  /\.(js|jsx|ts|tsx|vue)$/.test(file),
);

if (eslintFiles.length) {
  console.log('Start eslint fix');
  runChunked('pnpm', ['eslint', '--fix'], eslintFiles);
}

console.log('Start prettier format');
runChunked('pnpm', ['prettier', '--write'], formatFiles);

runChunked('git', ['add'], formatFiles);
