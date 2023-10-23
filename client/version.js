/* eslint-disable @typescript-eslint/no-var-requires */
const prompts = require('prompts');
const fs = require('fs/promises');
const dayjs = require('dayjs');

(async () => {
  const reg = /"version":\s*"(.*?)"/;
  let pkgStr = await fs.readFile('./package.json', 'utf-8');
  const version = pkgStr.match(reg)[1];
  let vl = version.split('-')[0].split('.');
  let vr = version.split('-')[1];
  const response = await prompts({
    type: 'select',
    name: 'value',
    message: '请选择需要升级的版本规则',
    choices: [
      { title: 'v1', value: 0, description: '主版本号' },
      { title: 'v1.0', value: 1, description: '次版本号' },
      { title: 'v1.0.0', value: 2, description: '修订号' },
      { title: 'v1.0.0-日期', value: 3, description: '日期' },
      { title: '不升级', value: 4, description: '不升级' }
    ],
    initial: 0
  });
  if (response.value === undefined) {
    process.exit(1);
  }
  if (response.value === 4) return console.log('只打包,不升级');
  vr = dayjs().format('YYYYMMDDHHmmss');
  switch (response.value) {
    case 0:
      vl[0] = parseInt(vl[0]) + 1;
      vl[1] = 0;
      vl[2] = 0;
      break;
    case 1:
      vl[1] = parseInt(vl[1]) + 1;
      vl[2] = 0;
      break;
    case 2:
      vl[2] = parseInt(vl[2]) + 1;
      break;
    case 3:
      break;
  }
  // 组合version
  const newVersion = `${vl.join('.')}-${vr}`;
  const newPkgStr = pkgStr.replace(reg, `"version": "${newVersion}"`);
  fs.writeFile('./package.json', newPkgStr);
  console.log(`当前版本为：${version}，升级后版本为：${newVersion}`);
})();
