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

# Create @cli-kit stub for gRPC
echo "Setting up gRPC stubs..."
mkdir -p "$CLI_DIR/node_modules/@cli-kit"
cat > "$CLI_DIR/node_modules/@cli-kit/package.json" << 'PKGJSON'
{"name":"@cli-kit","version":"1.0.0","type":"commonjs","main":"env-service-stub.js"}
PKGJSON

cat > "$CLI_DIR/node_modules/@cli-kit/env-service-stub.js" << 'GRPCSTUB'
// Stub for CliEnvServiceClient - gRPC client stub
class GetHostVersionResponse {
  static create(data) {
    return { version: '1.0.0', os: 'linux', arch: 'aarch64' };
  }
  toJSON() { return { version: '1.0.0' }; }
}

class CliEnvServiceClient {
  constructor() {
    this.host = 'localhost';
    this.port = 8080;
  }
  
  getHostVersion(request, metadata, callback) {
    const response = { version: '1.0.0', os: 'linux', arch: 'aarch64' };
    if (typeof callback === 'function') {
      callback(null, response);
    }
    return Promise.resolve(response);
  }
  
  getEnvironmentInfo(request, metadata, callback) {
    const response = {
      version: '1.0.0',
      os: 'linux',
      arch: process.arch,
      platform: process.platform,
      nodeVersion: process.version
    };
    if (typeof callback === 'function') {
      callback(null, response);
    }
    return Promise.resolve(response);
  }
}

module.exports = { CliEnvServiceClient, GetHostVersionResponse };
module.exports.default = { CliEnvServiceClient, GetHostVersionResponse };
GRPCSTUB

# Create wrapper - use relative path to find cli.mjs
cat > "$BIN_DIR/cline" << 'WRAPPER'
#!/bin/sh
CLI_MJS="$(dirname "$(readlink -f "$0")")/../lib/node_modules/cline/cli.mjs"
NODE_PATH="/storage/Users/currentUser/cline/node_modules:$NODE_PATH" exec node "$CLI_MJS" "$@"
WRAPPER

chmod +x "$BIN_DIR/cline"
chmod +x "$CLI_DIR/cli.mjs"

# Auto-configure PATH in .bashrc
echo ""
echo "Configuring PATH..."
for rc in "$HOME/.bashrc" "$HOME/.profile" "$HOME/.zshrc"; do
    if [ -f "$rc" ]; then
        if ! grep -q "$BIN_DIR" "$rc" 2>/dev/null; then
            echo "" >> "$rc"
            echo "# Cline CLI for OpenHarmony" >> "$rc"
            echo "export PATH=\"$BIN_DIR:\$PATH\"" >> "$rc"
            echo "✓ Updated $rc"
        fi
    fi
done

echo ""
echo "✓ Installed to $BIN_DIR/cline"
echo ""
echo "Usage:"
echo "  cline --version"
echo "  cline --help"
echo ""
echo "If 'cline' not found in new terminal, run:"
echo "  source ~/.bashrc"
