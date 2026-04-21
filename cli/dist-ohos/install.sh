#!/bin/bash
#
# Cline CLI for OpenHarmony - Installation Script
# 
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/thrones-zz/cline/ohos/scripts/install-ohos.sh | bash
#   or
#   sh install.sh
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default installation directory
PREFIX="${PREFIX:-$HOME/.local}"
BIN_DIR="$PREFIX/bin"
SHARE_DIR="$PREFIX/share/cline"

echo -e "${GREEN}Cline CLI for OpenHarmony Installer${NC}"
echo "======================================"

# Create directories
mkdir -p "$BIN_DIR"
mkdir -p "$SHARE_DIR"

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Copy files
echo "Installing to $BIN_DIR..."
cp "$SCRIPT_DIR/cli.mjs" "$BIN_DIR/cline"
chmod +x "$BIN_DIR/cline"

# Create wrapper script for OpenHarmony compatibility
cat > "$BIN_DIR/cline-ohos" << 'WRAPPER'
#!/bin/bash
# Cline OpenHarmony wrapper script
# This script handles platform detection for OpenHarmony

export npm_config_platform=linux
exec "$(dirname "$0")/cline" "$@"
WRAPPER
chmod +x "$BIN_DIR/cline-ohos"

echo -e "${GREEN}✓${NC} Installed cline to $BIN_DIR"
echo -e "${GREEN}✓${NC} Created cline-ohos wrapper"

# Verify installation
if "$BIN_DIR/cline" --version &>/dev/null; then
    echo -e "${GREEN}Installation successful!${NC}"
    echo ""
    echo "To use cline:"
    echo "  1. Set your API key:"
    echo "     export ANTHROPIC_API_KEY=your_key_here"
    echo "  2. Run cline:"
    echo "     cline --help"
    echo ""
    echo "Or use the OpenHarmony wrapper (recommended on OHOS):"
    echo "     cline-ohos --help"
else
    echo -e "${YELLOW}Warning: cline requires Node.js 20+ to run${NC}"
fi

echo ""
echo "For more information, visit: https://github.com/thrones-zz/cline"
