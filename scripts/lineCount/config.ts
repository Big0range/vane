import path from 'path';
// 导出的文件名字
export const exitFileName = 'lineCount.txt';

// 忽略文件夹
export const excludeDir = [
  'node_modules',
  '.git',
  '.husky',
  'dist',
  'logs',
  '.vscode',
  'uploads',
  'public',
  'assets',
];
// 忽略文件
export const excludeFile = [exitFileName, 'yarn.lock', 'pnpm-lock.yaml'];
export const excludeExt = ['png', 'jpg', 'mp4', 'ico'];
// 不进行深度递归的文件夹名称
export const nodeep = ['assets'];

// 根目录路径
export const rootPath = path.resolve(import.meta.dirname, '../../');
