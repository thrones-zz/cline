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

# Link node_modules
echo "Setting up dependencies..."
rm -rf "$CLI_DIR/node_modules"
ln -sf /storage/Users/currentUser/cline/node_modules "$CLI_DIR/node_modules"

# Create wrapper - use relative path to find cli.mjs
cat > "$BIN_DIR/cline" << 'WRAPPER'
#!/bin/sh
CLI_MJS="$(dirname "$(readlink -f "$0")")/../lib/node_modules/cline/cli.mjs"
NODE_PATH="/storage/Users/currentUser/cline/node_modules:$NODE_PATH" exec node "$CLI_MJS" "$@"
WRAPPER

chmod +x "$BIN_DIR/cline"
chmod +x "$CLI_DIR/cli.mjs"

# Auto-configure PATH if not already set
PROFILE_FILE=""
if [ -f "$HOME/.bashrc" ]; then
    PROFILE_FILE="$HOME/.bashrc"
elif [ -f "$HOME/.profile" ]; then
    PROFILE_FILE="$HOME/.profile"
elif [ -f "$HOME/.zshrc" ]; then
    PROFILE_FILE="$HOME/.zshrc"
fi

if [ -n "$PROFILE_FILE" ]; then
    if ! grep -q "$BIN_DIR" "$PROFILE_FILE" 2>/dev/null; then
        echo "" >> "$PROFILE_FILE"
        echo "# Cline CLI for OpenHarmony" >> "$PROFILE_FILE"
        echo "export PATH=\"$BIN_DIR:\$PATH\"" >> "$PROFILE_FILE"
        echo "✓ Added PATH to $PROFILE_FILE"
        echo "  Please run: source $PROFILE_FILE"
    fi
fi

echo ""
echo "✓ Installed to $BIN_DIR/cline"
echo ""
echo "Usage:"
echo "  cline --version"
echo "  cline --help"
