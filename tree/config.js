const path = require('path')
// 导出的文件名字
const exitFileName = 'tree.txt'

//  最大递归层数(实际层数 = maxIndex + 1),
//  当maxIndex -1 时,将不写入第一层的目录以及文件名字
const maxIndex = 3

// 忽略文件夹
const excludeDir = ['node_modules', '.git', '.husky', 'dist']
// 忽略文件
const excludeFile = [exitFileName]
// 不进行深度递归的文件夹名称
const nodeep = ['api', 'assets', 'logs']

// 根目录路径
const rootPath = path.resolve(__dirname, '../')
module.exports = {
  exitFileName,
  maxIndex,
  excludeDir,
  excludeFile,
  nodeep,
  rootPath,
}
