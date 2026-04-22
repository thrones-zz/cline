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

echo "Installing..."

# Download cli.mjs from GitHub
echo "Downloading cli.mjs..."
curl -fsSL -o "$CLI_DIR/cli.mjs" "https://github.com/thrones-zz/cline/raw/ohos/cli/dist-ohos/cli.mjs"

# Link node_modules
echo "Setting up dependencies..."
rm -rf "$CLI_DIR/node_modules"
ln -sf /storage/Users/currentUser/cline/node_modules "$CLI_DIR/node_modules"

# Create wrapper
cat > "$BIN_DIR/cline" << 'WRAPPER'
#!/bin/sh
exec node /storage/Users/currentUser/.npm-global/lib/node_modules/cline/cli.mjs "$@"
WRAPPER

chmod +x "$BIN_DIR/cline"
chmod +x "$CLI_DIR/cli.mjs"

echo ""
echo "✓ Installed to $BIN_DIR/cline"
echo ""
echo "Add to PATH:"
echo "  echo 'export PATH=\"\$HOME/.npm-global/bin:\$PATH\"' >> ~/.bashrc"
echo "  source ~/.bashrc"
echo ""
echo "Usage: cline --version"
