#!/bin/sh
# Cline CLI for OpenHarmony - Installation Script
set -e

PREFIX="${PREFIX:-$HOME/.local}"
BIN_DIR="$PREFIX/bin"

echo "Cline CLI for OpenHarmony Installer"
echo "=================================="

mkdir -p "$BIN_DIR"

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Installing to $BIN_DIR..."
cp "$SCRIPT_DIR/cli.mjs" "$BIN_DIR/cline.mjs"

# Create wrapper that calls node
cat > "$BIN_DIR/cline" << 'WRAPPER'
#!/bin/sh
exec node "$(dirname "$(readlink -f "$0")")/cline.mjs" "$@"
WRAPPER

chmod +x "$BIN_DIR/cline" "$BIN_DIR/cline.mjs"

echo "Installed successfully!"
echo ""
echo "Usage:"
echo "  ~/.local/bin/cline --version"
echo "  ~/.local/bin/cline --help"
