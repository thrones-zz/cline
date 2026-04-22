# Cline CLI 鸿蒙全局安装指南

## 方法一: 使用预编译产物

### 1. 下载编译产物

```bash
# 创建安装目录
mkdir -p ~/cline-install
cd ~/cline-install

# 下载 CLI 主程序
curl -L -o cli.mjs https://github.com/thrones-zz/cline/raw/ohos/cli/dist-ohos/cli.mjs

# 下载安装脚本
curl -L -o install.sh https://github.com/thrones-zz/cline/raw/ohos/cli/dist-ohos/install.sh
```

### 2. 全局安装

```bash
cd ~/cline-install

# 方式A: 使用安装脚本
chmod +x install.sh
./install.sh

# 方式B: 手动安装到 /usr/local/bin
sudo cp cli.mjs /usr/local/bin/cline
sudo chmod +x /usr/local/bin/cline
sudo ln -sf /usr/local/bin/cline /usr/local/bin/cline-ohos
```

### 3. 验证安装

```bash
# 方式1: 通过 PATH
cline --version

# 方式2: 直接执行
/usr/local/bin/cline --version
```

## 方法二: 从 tar.gz 包安装

```bash
# 下载打包文件
curl -L -o cline.tar.gz https://github.com/thrones-zz/cline/raw/ohos/cli/dist-ohos/cli.mjs

# 解压
tar -xzf cline.tar.gz

# 进入目录并安装
cd dist-ohos
chmod +x install.sh
./install.sh

# 或手动全局安装
sudo cp cli.mjs /usr/local/bin/cline
sudo cp install.sh /usr/local/bin/cline-install.sh
sudo chmod +x /usr/local/bin/cline
```

## 方法三: 克隆源码编译

```bash
# 克隆仓库
git clone https://github.com/thrones-zz/cline.git
cd cline
git checkout ohos

# 安装依赖
npm install
cd cli
npm install

# 编译 (需要 Node.js 20+)
node build-ohos-direct.mjs

# 全局安装
sudo cp dist-ohos/cli.mjs /usr/local/bin/cline
sudo chmod +x /usr/local/bin/cline
```

## 环境配置

### 设置 API Key

```bash
# 临时设置 (当前会话)
export ANTHROPIC_API_KEY="sk-ant-..."

# 永久设置 (添加到 ~/.bashrc 或 ~/.profile)
echo 'export ANTHROPIC_API_KEY="sk-ant-..."' >> ~/.bashrc
source ~/.bashrc
```

### 添加到 PATH (如果使用 ~/.local 安装)

```bash
# 确认安装位置
ls ~/.local/bin/cline

# 添加到 PATH (如果是首次使用 ~/.local)
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# 验证
which cline
cline --version
```

## 使用方法

```bash
# 基本用法
cline "帮我写一个 Hello World 程序"

# 使用 act 模式
cline --act "重构 src/utils 文件夹"

# 使用 plan 模式 (预览操作)
cline --plan "添加新功能"

# Yolo 模式 (自动批准所有操作)
cline --yolo "批量修改文件"

# 指定模型
cline --model claude-sonnet "任务描述"

# 指定工作目录
cline --cwd /path/to/project "任务"

# 查看帮助
cline --help
```

## 卸载

```bash
# 删除可执行文件
sudo rm /usr/local/bin/cline
sudo rm /usr/local/bin/cline-ohos

# 或如果安装在 ~/.local
rm ~/.local/bin/cline
rm ~/.local/bin/cline-ohos

# 删除配置 (可选)
rm -rf ~/.cline
```

## 常见问题

### Q: 提示 "command not found"
```bash
# 检查 PATH
echo $PATH

# 确认文件存在
ls -la /usr/local/bin/cline
# 或
ls -la ~/.local/bin/cline
```

### Q: 提示权限错误
```bash
# 使用 sudo 安装
sudo cp cli.mjs /usr/local/bin/cline
sudo chmod +x /usr/local/bin/cline
```

### Q: Node.js 版本问题
```bash
# 检查 Node.js 版本
node --version

# 需要 Node.js 20+
# 升级 Node.js (如果需要)
```

## 快捷命令别名

添加到 `~/.bashrc`:

```bash
# Cline CLI 别名
alias cline='/usr/local/bin/cline'
alias cl='cline'

# 带环境变量的别名
alias cline-api='ANTHROPIC_API_KEY="sk-ant-..." cline'
```

## 验证清单

- [ ] `cline --version` 输出 2.15.0
- [ ] `cline --help` 显示帮助信息
- [ ] `which cline` 显示安装路径
- [ ] 环境变量 `ANTHROPIC_API_KEY` 已设置
