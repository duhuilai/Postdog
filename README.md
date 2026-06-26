# 🐕 Postdog - 开源API工具

<div align="center">

![Postdog Logo](src/browser/src/assets/images/logo.svg)

**Postdog** 是一个强大的开源、跨平台 API 开发测试工具,支持 API 文档导出功能。

[![License](https://img.shields.io/github/license/Postdoglab/postdog)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.1.0-blue)](https://github.com/Postdoglab/postdog/releases)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)](https://github.com/Postdoglab/postdog/releases)

</div>

---

## ✨ 特性

- 🚀 **跨平台支持**: Windows、macOS、Linux
- 📝 **API 测试**: 支持 REST、Websocket 等协议
- 📄 **文档导出**: 一键导出 API 文档为 Word 或 PDF 格式
- 🔌 **插件系统**: 强大的扩展能力
- 💾 **本地存储**: 数据完全本地化,安全可控
- 🎨 **现代 UI**: 基于 Angular + Electron 构建

## 📦 快速开始

### 从源码构建

```bash
# 克隆仓库
git clone https://gitee.com/your-username/postdog.git
cd postdog

# 安装依赖
yarn install

# 开发模式运行
yarn start

# 构建生产版本
yarn build

# 打包应用
yarn electron:pack
```

### 生成安装包

构建完成后,安装包位于 `dist/` 目录:
- Windows: `Postdog-Setup-0.1.0.exe`
- macOS: `Postdog-0.1.0.dmg`
- Linux: `Postdog-0.1.0.AppImage`



## 🤝 贡献

欢迎提交 Issue 和 Pull Request!

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

---




# POSTDOG API 客户端（Client）


<p align="center"><a href="wiki/README.en.md">English</a> | <span>简体中文</span></p>
<p align="center">
  <a href="https://github.com/Postdoglab/postdog"><img src="https://img.shields.io/github/license/Postdoglab/postdog?sanitize=true" alt="License"></a>
  <a href="https://github.com/Postdoglab/postdog/releases"><img src="https://img.shields.io/github/v/release/Postdoglab/postdog?sanitize=true" alt="Version"></a>
  <a href="https://github.com/Postdoglab/postdog/releases"><img src="https://img.shields.io/github/downloads/Postdoglab/postdog/total?sanitize=true" alt="Downloads"></a>
  <a href="https://discord.gg/W3uk39zJCR"><img src="https://img.shields.io/badge/chat-on%20discord-7289da.svg?sanitize=true" alt="Chat"></a>
</p>

## 概述

**POSTDOG** 是一个强大的开源、免费的、跨平台（Windows、Mac、Linux、Browsers...）的 **API 开发测试工具**，支持 REST、Websocket 等协议（即将支持 GraphQL、gRPC、TCP、UDP），帮助你加速完成 API 开发和测试工作。它非常适合中小团队及个人使用。




## 开发 POSTDOG

<details>

<summary>运行代码</summary>

</br>

请确保你已经部署好所需的开发环境：

- Node.js >= 14.17.x

- yarn >= 1.22.x

我们在开发和构建时使用 yarn 作为包管理工具，强烈建议你也这么做，但如果您希望使用 npm 也完全没问题，只是在安装依赖时可能需要多花一些时间。

### 运行桌面端程序

```shell

yarn install

yarn start

```

### 运行浏览器程序

```shell

cd src/browser&&npm install

yarn start

```

### 提高效率

如果想提高开发效率，可以安装 Angular 官方提供的命令行 Angular-cli 快速生成组件、服务等模板。

```

yarn add @angular/cli --global

```

</details>

<details>

<summary>内置命令</summary>

### 运行命令

|命令 |描述 |
| ------------ | ------------ |
|yarn start |开发模式下，同时运行在浏览器和桌面端 |
|yarn start:zh|中文开发模式，同时运行在浏览器和桌面端| 
|yarn start:web |仅运行在浏览器,同时开启后端代理 |
|yarn start:electron|仅运行在桌面端 |

> 本项目 i18n 使用的是编译手段，所以开发时无法切换语言
### 打包构建

|命令 |描述 |
| ------------ | ------------ |
|sudo yarn build|各系统打包 Electron 应用 |

### 运行测试

|命令 |描述 |
| ------------ | ------------ |
|yarn test |执行单元测试 |

