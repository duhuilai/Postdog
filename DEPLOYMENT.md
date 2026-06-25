# Postdog 部署指南

## 📋 目录
1. [创建Gitee仓库](#1-创建gitee仓库)
2. [推送代码到Gitee](#2-推送代码到gitee)
3. [安装依赖](#3-安装依赖)
4. [构建项目](#4-构建项目)
5. [生成安装包](#5-生成安装包)
6. [发布版本](#6-发布版本)

---

## 1. 创建Gitee仓库

### 步骤:
1. 访问 https://gitee.com 并登录
2. 点击右上角 "+" → "新建仓库"
3. 填写信息:
   - **仓库名称**: `postdog`
   - **路径**: 会自动生成
   - **是否开源**: 根据需要选择
   - **初始化仓库**: ❌ 不要勾选任何初始化选项
4. 点击"创建"
5. 复制仓库URL (格式: `https://gitee.com/您的用户名/postdog.git`)

---

## 2. 推送代码到Gitee

在命令行中执行:

```bash
# 进入项目目录
cd D:/dev-tool/postdog

# 添加远程仓库 (替换为您的Gitee用户名)
git remote add origin https://gitee.com/您的用户名/postdog.git

# 推送主分支
git push -u origin main

# 推送标签
git push origin v0.1.0
```

---

## 3. 安装依赖

### 前提条件:
- Node.js 16+ (推荐 18 LTS)
- Yarn 1.22+

### 安装步骤:

```bash
# 安装 Node.js (如果未安装)
# Windows: 从 https://nodejs.org/ 下载安装

# 安装 Yarn
npm install -g yarn

# 验证安装
node --version  # 应该显示 v16+ 或 v18+
yarn --version  # 应该显示 1.22+

# 进入项目目录
cd D:/dev-tool/postdog

# 安装项目依赖
yarn install
```

**注意**: 首次安装可能需要较长时间,请耐心等待。

---

## 4. 构建项目

### 开发模式 (用于测试):

```bash
# 启动开发服务器
yarn start
```

这会同时启动:
- Angular 开发服务器 (http://localhost:4200)
- Electron 桌面应用

### 生产构建:

```bash
# 构建浏览器端
yarn build:browser

# 构建 Electron 主进程
yarn build:electron
```

---

## 5. 生成安装包

### 自动打包 (推荐):

```bash
# 完整构建流程 (包括编译、打包、生成安装包)
yarn build
```

或者分步执行:

```bash
# 1. 编译 TypeScript
yarn build:electron

# 2. 打包 Electron 应用
yarn electron:pack
```

### 生成平台特定安装包:

```bash
# Windows 安装包 (.exe)
yarn electron:pack --win

# macOS 安装包 (.dmg)
yarn electron:pack --mac

# Linux 安装包 (.AppImage)
yarn electron:pack --linux
```

### 安装包输出位置:

构建完成后,安装包位于 `dist/` 目录:

```
dist/
├── Postdog-Setup-0.1.0.exe      # Windows 安装包
├── Postdog-0.1.0.dmg            # macOS 安装包
├── Postdog-0.1.0.AppImage       # Linux 安装包
└── ...
```

---

## 6. 发布版本

### 在Gitee上创建Release:

1. 访问您的Gitee仓库页面
2. 点击 "发布" → "新建发布"
3. 填写发布信息:
   - **标签**: 选择 `v0.1.0`
   - **标题**: `Postdog v0.1.0 - 初始版本`
   - **描述**: 
     ```
     ## 新功能
     - 从Postcat重命名为Postdog
     - 全新的狗狗形象Logo
     - API文档导出功能 (支持Word和PDF格式)
     
     ## 改进
     - 全局品牌更新
     - 配置文件优化
     ```
4. 上传安装包文件:
   - 点击 "上传文件"
   - 拖拽或选择 `dist/` 目录中的安装包
5. 点击 "发布"

---

## 🔧 常见问题

### Q1: yarn install 失败

**解决方案**:
```bash
# 清除缓存
yarn cache clean

# 使用淘宝镜像
yarn config set registry https://registry.npmmirror.com

# 重新安装
yarn install
```

### Q2: 构建时提示缺少依赖

**解决方案**:
```bash
# Windows 用户需要安装 Visual Studio Build Tools
# 下载地址: https://visualstudio.microsoft.com/visual-cpp-build-tools/

# 安装时勾选 "使用 C++ 的桌面开发"
```

### Q3: Electron 打包失败

**解决方案**:
```bash
# 清理输出目录
rm -rf dist/

# 重新打包
yarn electron:pack
```

### Q4: 安装包生成后无法运行

**解决方案**:
- 确保 Node.js 版本 >= 16
- 检查是否有杀毒软件拦截
- 尝试以管理员身份运行

---

## 📞 获取帮助

如果遇到问题:
1. 查看项目 README.md
2. 检查 Gitee Issues
3. 参考原 Postcat 文档

---

## ✅ 检查清单

在发布前,请确认:

- [ ] 代码已推送到Gitee
- [ ] v0.1.0 标签已推送
- [ ] Windows 安装包测试通过
- [ ] macOS 安装包测试通过 (如适用)
- [ ] Linux 安装包测试通过 (如适用)
- [ ] README 文档已更新
- [ ] Release 已创建并上传安装包

---

**祝您部署成功! 🎉**
