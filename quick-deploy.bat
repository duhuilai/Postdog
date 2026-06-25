@echo off
chcp 65001 >nul
echo ========================================
echo   Postdog 快速部署脚本
echo ========================================
echo.

REM 检查Node.js
echo [1/6] 检查Node.js环境...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 错误: 未找到Node.js
    echo.
    echo 请先安装Node.js 16或更高版本:
    echo https://nodejs.org/
    echo.
    pause
    exit /b 1
)
node --version
echo ✅ Node.js 已安装
echo.

REM 检查Yarn
echo [2/6] 检查Yarn...
where yarn >nul 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  Yarn未安装,正在安装...
    npm install -g yarn
    if %errorlevel% neq 0 (
        echo ❌ 安装Yarn失败
        pause
        exit /b 1
    )
)
yarn --version
echo ✅ Yarn 已安装
echo.

REM 安装依赖
echo [3/6] 安装项目依赖 (这可能需要几分钟)...
call yarn install
if %errorlevel% neq 0 (
    echo ❌ 安装依赖失败
    pause
    exit /b 1
)
echo ✅ 依赖安装完成
echo.

REM 构建项目
echo [4/6] 构建项目...
call yarn build:browser
if %errorlevel% neq 0 (
    echo ❌ 构建浏览器端失败
    pause
    exit /b 1
)

call yarn build:electron
if %errorlevel% neq 0 (
    echo ❌ 构建Electron失败
    pause
    exit /b 1
)
echo ✅ 构建完成
echo.

REM 打包应用
echo [5/6] 打包Electron应用...
call yarn electron:pack
if %errorlevel% neq 0 (
    echo ❌ 打包失败
    pause
    exit /b 1
)
echo ✅ 打包完成
echo.

REM 显示结果
echo [6/6] 部署完成!
echo.
echo ========================================
echo   安装包位置:
echo ========================================
dir /b dist\*.exe 2>nul
dir /b dist\*.dmg 2>nul
dir /b dist\*.AppImage 2>nul
echo.
echo ========================================
echo   下一步:
echo ========================================
echo 1. 在Gitee创建仓库: https://gitee.com/projects/new
echo 2. 推送代码:
echo    git remote add origin https://gitee.com/您的用户名/postdog.git
echo    git push -u origin main
echo    git push origin v0.1.0
echo 3. 在Gitee创建Release并上传安装包
echo.
pause
