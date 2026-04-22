# Cline CLI for OpenHarmony

## 安装方法

### 方法 1: 下载预编译产物 (推荐)

```bash
# 下载打包产物
curl -L -o cline-ohos.tar.gz https://github.com/thrones-zz/cline/raw/ohos/cli/dist-ohos/cli.mjs

# 解压并安装
tar -xzf cline-ohos.tar.gz
cd dist-ohos
chmod +x install.sh
./install.sh

# 验证
~/.local/bin/cline --version
```

### 方法 2: 使用安装脚本

```bash
curl -fsSL https://raw.githubusercontent.com/thrones-zz/cline/ohos/cli/dist-ohos/install.sh | sh
```

## 本机编译安装

```bash
# 克隆仓库
git clone https://github.com/thrones-zz/cline.git
cd cline
git checkout ohos

# 安装依赖
npm install

# 编译
cd cli
npm install
node build-ohos-direct.mjs

# 安装
cd dist-ohos
./install.sh

# 验证
cline --version
```

## Patch 文件

Patch 文件位于: `/storage/Users/currentUser/cline-ohos-patch.diff`

使用方法:
```bash
# 在主仓库应用 patch
git checkout main
git apply cline-ohos-patch.diff
```

## GitHub 仓库

- **仓库**: https://github.com/thrones-zz/cline
- **分支**: `ohos`
- **提交**: 66269f3

## 版本信息

- **Cline 版本**: 2.15.0
- **目标平台**: OpenHarmony (Linux aarch64)
- **Node.js 要求**: >= 20.0.0
