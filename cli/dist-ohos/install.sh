#!/bin/sh
# Cline CLI for OpenHarmony - Installation Script
set -e

PREFIX="${PREFIX:-$HOME/.npm-global}"
BIN_DIR="$PREFIX/bin"
LIB_DIR="$PREFIX/lib/node_modules"
CLI_DIR="$LIB_DIR/cline"

echo "Cline CLI for OpenHarmony Installer"
echo "=================================="

mkdir -p "$BIN_DIR"
mkdir -p "$CLI_DIR"

echo "Installing to $PREFIX..."

# Download cli.mjs from GitHub
echo "Downloading cli.mjs..."
curl -fsSL -o "$CLI_DIR/cli.mjs" "https://github.com/thrones-zz/cline/raw/ohos/cli/dist-ohos/cli.mjs"

# Create all stub modules
echo "Creating stub modules..."

mkdir -p "$CLI_DIR/node_modules/@cli-kit"
cat > "$CLI_DIR/node_modules/@cli-kit/package.json" << 'EOF'
{"name":"@cli-kit","version":"1.0.0","type":"commonjs","main":"index.js"}
EOF
cat > "$CLI_DIR/node_modules/@cli-kit/index.js" << 'EOF'
class GetHostVersionResponse{static create(data){return{version:"1.0.0",os:"linux",arch:"aarch64"}}toJSON(){return{version:"1.0.0"}}}
class CliEnvServiceClient{getHostVersion(r,m,cb){const res={version:"1.0.0",os:"linux",arch:"aarch64"};if(typeof cb==="function")cb(null,res);return Promise.resolve(res)}}
module.exports={CliEnvServiceClient,GetHostVersionResponse};
EOF

mkdir -p "$CLI_DIR/node_modules/@vscode/ripgrep"
cat > "$CLI_DIR/node_modules/@vscode/ripgrep/package.json" << 'EOF'
{"name":"@vscode/ripgrep","version":"1.0.0","type":"commonjs","main":"index.js"}
EOF
cat > "$CLI_DIR/node_modules/@vscode/ripgrep/index.js" << 'EOF'
module.exports={rgPath:null};
EOF

mkdir -p "$CLI_DIR/node_modules/chalk"
cat > "$CLI_DIR/node_modules/chalk/package.json" << 'EOF'
{"name":"chalk","version":"1.0.0","type":"commonjs","main":"index.js"}
EOF
cat > "$CLI_DIR/node_modules/chalk/index.js" << 'EOF'
const fn=(s)=>s!=null?s:'';fn.red=fn;fn.green=fn;fn.yellow=fn;fn.blue=fn;fn.cyan=fn;fn.magenta=fn;fn.bold=fn;fn.dim=fn;module.exports=fn;
EOF

mkdir -p "$CLI_DIR/node_modules/vscode-uri"
cat > "$CLI_DIR/node_modules/vscode-uri/package.json" << 'EOF'
{"name":"vscode-uri","version":"1.0.0","type":"commonjs","main":"index.js"}
EOF
cat > "$CLI_DIR/node_modules/vscode-uri/index.js" << 'EOF'
class URI{static parse(s){return new URI(s)}static file(s){return new URI(s)}constructor(u){this.scheme='file';this.path=u}toString(){return this.scheme+'://'+this.path}toFilePath(){return this.path||''}}
module.exports={URI};
EOF

mkdir -p "$CLI_DIR/node_modules/ora"
cat > "$CLI_DIR/node_modules/ora/package.json" << 'EOF'
{"name":"ora","version":"1.0.0","type":"commonjs","main":"index.js"}
EOF
cat > "$CLI_DIR/node_modules/ora/index.js" << 'EOF'
module.exports=()=>({start:()=>{},succeed:()=>{},fail:()=>{},stop:()=>{}});
EOF

mkdir -p "$CLI_DIR/node_modules/ink"
cat > "$CLI_DIR/node_modules/ink/package.json" << 'EOF'
{"name":"ink","version":"1.0.0","type":"commonjs","main":"index.js"}
EOF
cat > "$CLI_DIR/node_modules/ink/index.js" << 'EOF'
module.exports=()=>null;
EOF

mkdir -p "$CLI_DIR/node_modules/pino"
cat > "$CLI_DIR/node_modules/pino/package.json" << 'EOF'
{"name":"pino","version":"1.0.0","type":"commonjs","main":"index.js"}
EOF
cat > "$CLI_DIR/node_modules/pino/index.js" << 'EOF'
module.exports=()=>({info:()=>{},warn:()=>{},error:()=>{},debug:()=>{}});
EOF

mkdir -p "$CLI_DIR/node_modules/events"
cat > "$CLI_DIR/node_modules/events/package.json" << 'EOF'
{"name":"events","version":"1.0.0","type":"commonjs","main":"index.js"}
EOF
cat > "$CLI_DIR/node_modules/events/index.js" << 'EOF'
module.exports=require("events");
EOF

mkdir -p "$CLI_DIR/node_modules/open"
cat > "$CLI_DIR/node_modules/open/package.json" << 'EOF'
{"name":"open","version":"1.0.0","type":"commonjs","main":"index.js"}
EOF
cat > "$CLI_DIR/node_modules/open/index.js" << 'EOF'
module.exports=async()=>{};
EOF

mkdir -p "$CLI_DIR/node_modules/marked"
cat > "$CLI_DIR/node_modules/marked/package.json" << 'EOF'
{"name":"marked","version":"1.0.0","type":"commonjs","main":"index.js"}
EOF
cat > "$CLI_DIR/node_modules/marked/index.js" << 'EOF'
module.exports={parse:(s)=>s};
EOF

mkdir -p "$CLI_DIR/node_modules/cli-highlight"
cat > "$CLI_DIR/node_modules/cli-highlight/package.json" << 'EOF'
{"name":"cli-highlight","version":"1.0.0","type":"commonjs","main":"index.js"}
EOF
cat > "$CLI_DIR/node_modules/cli-highlight/index.js" << 'EOF'
module.exports={highlight:(s)=>s};
EOF

echo "✓ Created all stub modules"

# Create wrapper
cat > "$BIN_DIR/cline" << 'WRAPPER'
#!/bin/sh
CLI_DIR="$(dirname "$(readlink -f "$0")")/../lib/node_modules/cline"
NODE_PATH="$CLI_DIR/node_modules:$NODE_PATH" exec node "$CLI_DIR/cli.mjs" "$@"
WRAPPER

chmod +x "$BIN_DIR/cline"
chmod +x "$CLI_DIR/cli.mjs"

# Auto-configure PATH
for rc in "$HOME/.bashrc" "$HOME/.profile" "$HOME/.zshrc"; do
    if [ -f "$rc" ]; then
        if ! grep -q "$BIN_DIR" "$rc" 2>/dev/null; then
            echo "" >> "$rc"
            echo "export PATH=\"$BIN_DIR:\$PATH\"" >> "$rc"
        fi
    fi
done

echo ""
echo "✓ Installed to $BIN_DIR/cline"
echo ""
echo "Usage: cline --version"
