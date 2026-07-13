import { readdir, stat } from 'fs/promises';
import path from 'path';
import fs from 'fs';

import {
  exitFileName,
  excludeDir,
  excludeFile,
  nodeep,
  rootPath,
  excludeExt,
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

class DB {
  splitChar = '\\';
  constructor(splitChar) {
    if (splitChar) {
      this.splitChar = splitChar;
    }
    this.db = {};
  }
  defaultDB() {
    return { node: {}, value: '', size: 0 };
  }
  toString() {
    return JSON.stringify(this.db);
  }
  set(key, value) {
    if (!key) return;
    const keys = this.splitKey(key);
    const parent = this.searchOfSet(this.db, 0, keys);
    let item = {};
    if (parent.node[keys[keys.length - 1]] === undefined) {
      item = parent.node[keys[keys.length - 1]] = this.defaultDB();
    } else {
      item = parent.node[keys[keys.length - 1]];
    }
    item.value = value;
    parent.size++;
  }
  get(key) {
    const keys = this.splitKey(key);
    const data = this.searchOfGet(this.db, 0, keys);
    if (data === null) {
      console.log('没有找到');
      return null;
    }
    return [data.value, data.node];
  }
  remove(key) {
    const keys = this.splitKey(key);
    const parent = this.searchOfGet(keys);
    if (parent === null) return;
    delete parent.node[keys[keys.length - 1]];
    parent.size--;
  }
  getParent(keys = []) {
    const parent = this.searchOfGet(this.db, 0, keys.slice(0, keys.length - 1));
    return parent;
  }
  searchOfSet(db, index = 0, keys = []) {
    if (db[keys[index]] === undefined) {
      db[keys[index]] = this.defaultDB();
    }
    if (index === keys.length - 2) {
      return db[keys[index]];
    }
    return this.searchOfSet(db[keys[index]].node, index + 1, keys);
  }
  searchOfGet(db, index = 0, keys = []) {
    if (db[keys[index]] === undefined) {
      return null;
    }
    if (index === keys.length - 1) {
      return db[keys[index]];
    }
    return this.searchOfGet(db[keys[index]].node, index + 1, keys);
  }
  getAll() {
    return this.db;
  }
  splitKey(key) {
    return key.split(this.splitChar).filter(item => item);
  }
  clear() {
    this.db = this.defaultDB();
  }
}
const db = new DB();
// const aaa = 'D:\\git\\demo\\vane\\Dockerfile'
// db.set(aaa, 111111111)
// console.log(db.get(aaa))
// // db.remove(aaa)
// db.clear()
// console.log(db.get(aaa))
async function readFile(filePath = import.meta.dirname, index = 0) {
  const obj = {};
  // 计算空格数
  const spaceLength = index > 0 ? index * 4 : 0;
  const space = new Array(spaceLength).fill(' ').join('');

  const stats = await stat(filePath);
  // 判断是不是文件夹
  const isFile = await stats.isFile();

  if (!(index === -1)) {
    obj.str = `${space}|-- ${isFile ? '📄' : '🗂️'}${path.basename(filePath)}\n`;
  }
  // console.log('filePath',filePath)
  // 如果是文件类型
  if (isFile) {
    if (excludeExt.includes(path.extname(filePath).replace('.', ''))) {
      db.remove(filePath);
      return;
    }
    db.set(filePath, obj);
    // 统计行数
    const data = fs.readFileSync(filePath, 'utf-8');
    obj.lines = data.split('\n').length;
    obj.type = 'file';
  } else {
    db.set(filePath, obj);
    obj.type = 'dir';
    obj.lines = 0;
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
  // filePath !== rootPath && console.log(filePath, filePath.replace(rootPath, ''), obj)
}

async function start() {
  await readFile(rootPath, -1);
  const node = db.get(rootPath)[1];

  function getLines(data) {
    let lines = 0;
    for (const key in data) {
      const item = data[key];
      if (item.value.type === 'dir') {
        const sum = getLines(item.node);
        lines += sum;
        item.value.lines = sum;
      } else {
        lines += item.value.lines;
      }
    }
    return lines;
  }
  const lines = getLines(node);
  function wtite(data) {
    const lines = 0;
    for (const key in data) {
      const item = data[key];
      ws.write(item.value.str.replace(/\n$/, ` ${item.value.lines}行\n`));
      if (item.value.type === 'dir') {
        wtite(item.node);
      } else {
        // 11111111111111
      }
    }
    return lines;
  }
  wtite(node);
  ws.write(`\n总行数：${lines}行`);
}

start();
