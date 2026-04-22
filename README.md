# Cline CLI for OpenHarmony

<div align="center">

**OpenHarmony 平台的 Cline CLI 命令行工具**

[![Version](https://img.shields.io/badge/version-2.15.0-blue.svg)](https://github.com/thrones-zz/cline)
[![Platform](https://img.shields.io/badge/platform-OpenHarmony-green.svg)](https://gitee.com/openharmony)
[![Node.js](https://img.shields.io/badge/node-%3E%3D%2020.0.0-orange.svg)](https://nodejs.org/)

</div>

---

## 🚀 快速安装

### 方法一: 一键安装 (推荐)

```bash
curl -fsSL https://raw.githubusercontent.com/thrones-zz/cline/ohos/cli/dist-ohos/install.sh | sh
```

### 方法二: 手动安装

```bash
# 1. 下载编译产物
curl -L -o cli.mjs https://github.com/thrones-zz/cline/raw/ohos/cli/dist-ohos/cli.mjs

# 2. 创建目录并安装
mkdir -p ~/.npm-global/bin
mkdir -p ~/.npm-global/lib/node_modules

# 3. 复制文件
cp cli.mjs ~/.npm-global/lib/node_modules/cline/cli.mjs

# 4. 链接 node_modules
ln -sf /storage/Users/currentUser/cline/node_modules ~/.npm-global/lib/node_modules/cline/node_modules

# 5. 创建可执行文件
cat > ~/.npm-global/bin/cline << 'EOF'
#!/bin/sh
exec node /storage/Users/currentUser/.npm-global/lib/node_modules/cline/cli.mjs "$@"
EOF
chmod +x ~/.npm-global/bin/cline

# 6. 添加到 PATH
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

## 📦 从源码编译

```bash
# 1. 克隆仓库
git clone https://github.com/thrones-zz/cline.git
cd cline
git checkout ohos

# 2. 安装依赖
npm install
cd cli
npm install

# 3. 编译
node build-ohos-direct.mjs

# 4. 安装
cd dist-ohos
./install.sh
```

## ✅ 验证安装

```bash
# 检查版本
cline --version
# 输出: 2.15.0

# 查看帮助
cline --help
```

## 🔧 使用方法

### 基本使用

```bash
# 设置 API Key
export ANTHROPIC_API_KEY="sk-ant-..."

# 运行任务
cline "帮我写一个 Hello World 程序"

# 使用 act 模式
cline --act "重构 src/utils 文件夹"

# 使用 plan 模式 (预览)
cline --plan "添加新功能"

# Yolo 模式 (自动批准)
cline --yolo "批量修改文件"

# 指定模型
cline --model claude-sonnet "任务描述"

# 指定工作目录
cline --cwd /path/to/project "任务"
```

### 常用命令

```bash
# 查看帮助
cline --help

# 检查版本
cline --version

# 交互模式
cline --interactive

# 禁用安全确认
cline --yes "自动化任务"
```

## 📁 文件结构

```
dist-ohos/
├── cli.mjs              # 主程序
├── install.sh           # 安装脚本
├── README.md            # 本文档
└── node_modules/        # 依赖模块
    ├── chalk/
    ├── events/
    ├── vscode-uri/
    └── ...
```

## 🔍 故障排除

### 提示 "command not found"

```bash
# 检查 PATH
echo $PATH

# 确认安装
ls -la ~/.npm-global/bin/cline
```

### 提示权限错误

```bash
# 使用 chmod 修改权限
chmod +x ~/.npm-global/bin/cline
chmod +x ~/.npm-global/lib/node_modules/cline/cli.mjs
```

### Node.js 版本问题

```bash
# 检查版本
node --version

# 需要 Node.js 20+
```

## 📚 相关资源

- [GitHub 仓库](https://github.com/thrones-zz/cline)
- [OpenHarmony 分支](https://github.com/thrones-zz/cline/tree/ohos)
- [官方文档](https://docs.cline.bot)
- [Cline Discord](https://discord.gg/cline)

## 📄 许可证

[Apache 2.0](./LICENSE)

---

**版本**: 2.15.0 | **平台**: OpenHarmony (Linux aarch64) | **Node.js**: >= 20.0.0
