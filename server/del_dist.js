/* eslint-disable @typescript-eslint/no-var-requires */
// Desc: 删除dist文件夹
const fs = require('fs');
const path = require('path');
// 递归删除文件夹
const folderPath = 'dist';
function deleteFolderRecursive(folderPath) {
  // 如果路径不存在，则直接返回
  if (!fs.existsSync(folderPath)) {
    return;
  }

  // 读取文件夹中的所有文件和子文件夹
  const files = fs.readdirSync(folderPath);

  // 遍历删除所有的子文件和子文件夹
  files.forEach(file => {
    const curPath = path.join(folderPath, file);
    if (fs.lstatSync(curPath).isDirectory()) {
      // 如果是文件夹，则递归删除
      deleteFolderRecursive(curPath);
    } else {
      // 删除文件
      fs.unlinkSync(curPath);
    }
  });

  // 删除文件夹
  fs.rmdirSync(folderPath);
}

deleteFolderRecursive(folderPath);
console.log(`删除${folderPath}文件夹成功`);
