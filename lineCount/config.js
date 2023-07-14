const path = require('path')
// 导出的文件名字
const exitFileName = 'lineCount.txt'


// 忽略文件夹
const excludeDir = ['node_modules', '.git', '.husky', 'dist','logs']
// 忽略文件
const excludeFile = [exitFileName, 'yarn.lock', 'pnpm-lock.yaml']
const excludeExt = ['png', 'jpg', 'mp4', 'ico']
// 不进行深度递归的文件夹名称
const nodeep = ['assets']

// 根目录路径
const rootPath = path.resolve(__dirname, '../')
module.exports = {
  exitFileName,
  excludeExt,
  excludeDir,
  excludeFile,
  nodeep,
  rootPath,
}
