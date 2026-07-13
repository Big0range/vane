import { readdir, stat } from 'fs/promises';
import path from 'path';
import fs from 'fs';
import {
  exitFileName,
  excludeDir,
  excludeFile,
  nodeep,
  maxIndex,
  rootPath,
} from './config.ts';

// 写入文件流
const ws = fs.createWriteStream(path.resolve(rootPath, exitFileName));

async function screenFileAndDir(filePath) {
  try {
    // 判断是否需要继续深度遍历
    if (nodeep.includes(path.basename(filePath))) {
      return [[], []];
    }
    const files = await readdir(filePath);
    // 文件夹数组
    let arrDir = [];
    // 文件数组
    let arrFile = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const stats = await stat(path.resolve(filePath, file));
      // 判断是不是文件夹
      const isFile = await stats.isFile();
      if (isFile) {
        arrFile.push(file);
      } else {
        arrDir.push(file);
      }
    }
    arrDir = arrDir.filter(item => !excludeDir.includes(item));
    arrFile = arrFile.filter(item => !excludeFile.includes(item));
    return [arrDir, arrFile];
  } catch (_error) {
    return [[], []];
  }
}

async function readFile(filePath = import.meta.dirname, index = 0) {
  // 计算空格数
  const spaceLength = index > 0 ? index * 4 : 0;
  const space = new Array(spaceLength).fill(' ').join('');

  const stats = await stat(filePath);
  // 判断是不是文件夹
  const isFile = await stats.isFile();

  if (!(index === -1)) {
    ws.write(`${space}|-- ${isFile ? '📄' : '🗂️'}${path.basename(filePath)}\n`);
  }
  // 如果是文件类型
  if (isFile) {
    // 也不需要干什么  上一步已经写入了
  } else {
    // 如果是文件夹类型
    if (maxIndex === index) return;
    // 分别取出文件夹数组 以及文件数组
    const [dirs, files] = await screenFileAndDir(filePath);
    // 文件夹数组 先运行一次
    for (let i = 0; i < dirs.length; i++) {
      // 文件夹名称
      const dir = dirs[i];
      await readFile(path.resolve(filePath, dir), index + 1);
    }
    // 再运行文件一次
    for (let a = 0; a < files.length; a++) {
      const file = files[a];
      await readFile(path.resolve(filePath, file), index + 1);
    }
  }
}

async function start() {
  await readFile(rootPath, -1);
}

start();
