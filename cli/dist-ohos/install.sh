#!/bin/sh
# Cline CLI for OpenHarmony - Installation Script
set -e

PREFIX="${PREFIX:-$HOME/.npm-global}"
BIN_DIR="$PREFIX/bin"
LIB_DIR="$PREFIX/lib/node_modules"

echo "Cline CLI for OpenHarmony Installer"
echo "=================================="

mkdir -p "$BIN_DIR"
mkdir -p "$LIB_DIR"

# Get the actual path to this script
SCRIPT_PATH="$0"
if [ -f "$SCRIPT_PATH" ]; then
    SCRIPT_DIR="$(cd "$(dirname "$SCRIPT_PATH")" && pwd)"
else
    # Fallback: assume we're in dist-ohos directory
    SCRIPT_DIR="$(pwd)"
fi

echo "Installing to $BIN_DIR..."

# Install cli.mjs
if [ -f "$SCRIPT_DIR/cli.mjs" ]; then
    mkdir -p "$LIB_DIR/cline"
    cp "$SCRIPT_DIR/cli.mjs" "$LIB_DIR/cline/"
    echo "✓ Installed cli.mjs"
else
    echo "Error: cli.mjs not found in $SCRIPT_DIR"
    exit 1
fi

# Link node_modules
if [ -d "$SCRIPT_DIR/node_modules" ]; then
    mkdir -p "$LIB_DIR/cline"
    rm -rf "$LIB_DIR/cline/node_modules"
    ln -sf "$SCRIPT_DIR/node_modules" "$LIB_DIR/cline/node_modules"
    echo "✓ Linked node_modules"
fi

# Create wrapper script
cat > "$BIN_DIR/cline" << 'WRAPPER'
#!/bin/sh
exec node /storage/Users/currentUser/.npm-global/lib/node_modules/cline/cli.mjs "$@"
WRAPPER

chmod +x "$BIN_DIR/cline"

echo ""
echo "✓ Installed cline to $BIN_DIR"
echo ""
echo "Add to PATH if needed:"
echo "  echo 'export PATH=\"\$HOME/.npm-global/bin:\$PATH\"' >> ~/.bashrc"
echo "  source ~/.bashrc"
echo ""
echo "Usage:"
echo "  cline --version"
echo "  cline --help"
