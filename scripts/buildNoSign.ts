import { sign } from 'app-builder-lib/out/codeSign/windowsCodeSign';
import type { Configuration } from 'electron-builder';
import { Platform, build } from 'electron-builder';
import minimist from 'minimist';

import pkgInfo from '../package.json';
import { ELECTRON_BUILD_CONFIG } from './baseConfig';

import { exec, spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { exit, platform } from 'node:process';

const pkgPath = path.join(__dirname, '../package.json');
// 当前 POSTDOG 版本
const version = process.env.npm_package_version;
// 保存签名时的参数，供签名后面生成的 自定义安装界面 安装包
let signOptions: Parameters<typeof sign>;

const isWin = process.platform === 'win32';
// 参数同 electron-builder cli 命令行参数
const argv = minimist(process.argv.slice(2));
// https://nodejs.org/docs/latest/api/util.html#util_class_util_textdecoder
const decoder = new TextDecoder('gbk');

// 删除 minimist 解析后默认带的 _ 属性，防止 electron-builder 执行报错
Reflect.deleteProperty(argv, '_');

// mac 系统删除 release 目录
if (process.platform === 'darwin') {
  exec(`rm -r ${path.resolve(__dirname, '../release')}`);
}

// window 系统删除 release 目录
if (process.platform === 'win32') {
  exec(`rd/s/q ${path.resolve(__dirname, '../release')}`);
}

const config: Configuration = {
  ...ELECTRON_BUILD_CONFIG,
  win: {
    icon: 'src/app/common/images/logo.ico',
    target: ['nsis', 'portable']
  }
};

// 这里动态往 package.json 中写入 electron-builder 配置，主要是为了给 build-for-electron.bat 脚本读取配置
const modifyPkgInfo = () => {
  // @ts-ignore
  pkgInfo.build = config;
  writeFileSync(pkgPath, JSON.stringify(pkgInfo, null, 2));
  // 退出进程/意外退出进程 时主动还原 package.json 信息
  process.on('exit', restorePkgInfo);
  process.on('uncaughtException', restorePkgInfo);
};

const restorePkgInfo = () => {
  Reflect.deleteProperty(pkgInfo, 'build');
  // 还原 package.json 文件
  writeFileSync(pkgPath, JSON.stringify(pkgInfo, null, 2));
};

// 要打包的目标平台
const targetPlatform: Platform = {
  darwin: Platform.MAC,
  win32: Platform.WINDOWS,
  linux: Platform.LINUX
}[platform];

console.log('打包参数', argv);

Promise.all([
  build({
    config,
    targets: targetPlatform.createTarget(),
    ...argv
  })
])
  .then(async () => {
    modifyPkgInfo();

    const ls = spawn('yarn', ['wininstaller'], {
      // 仅在当前运行环境为 Windows 时，才使用 shell
      shell: isWin
    });

    ls.stdout.on('data', async data => {
      console.log(decoder.decode(data));
      // build-by-external.bat
      if (decoder.decode(data).includes('pack POSTDOG finished!')) {
        console.log('\x1b[32m', '打包完成🎉🎉🎉你要的都在 release 目录里🤪🤪🤪');
        exit();
      }
    });
  })
  .catch(async error => {
    if (error.includes?.('HttpError')) {
    }
    console.log('\x1b[31m', '打包失败，错误信息：', error);
    exit();
  });
