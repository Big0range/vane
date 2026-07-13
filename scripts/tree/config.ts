import path from 'path';
// 导出的文件名字
export const exitFileName = 'tree.txt';

//  最大递归层数(实际层数 = maxIndex + 1),
//  当maxIndex -1 时,将不写入第一层的目录以及文件名字
export const maxIndex = 3;

// 忽略文件夹
export const excludeDir = ['node_modules', '.git', '.husky', 'dist'];
// 忽略文件
export const excludeFile = [exitFileName];
// 不进行深度递归的文件夹名称
export const nodeep = ['api', 'assets', 'logs'];

// 根目录路径
export const rootPath = path.resolve(import.meta.dirname, '../../');
