# Cline CLI for OpenHarmony

This is the OpenHarmony-compatible build of Cline CLI, an autonomous coding agent.

## Installation

### Quick Install

```bash
# Download and run
curl -fsSL https://raw.githubusercontent.com/thrones-zz/cline/ohos/cli/dist-ohos/install.sh | bash

# Or manually
cd cli/dist-ohos
./install.sh
```

### Manual Install

1. Copy `cli.mjs` to your PATH (e.g., `~/.local/bin/`)
2. Make it executable: `chmod +x cli.mjs`
3. Create a wrapper script if needed (see below)

## OpenHarmony Compatibility

OpenHarmony is not yet recognized by npm packages as a supported platform.
This build includes workarounds for:

- Node.js platform detection (reports as Linux)
- Native module compatibility
- File system path handling

## Usage

```bash
# Set your API key
export ANTHROPIC_API_KEY=sk-ant-...

# Run cline
cline --help

# On OpenHarmony, you may need to use the wrapper
cline-ohos --help
```

## Requirements

- Node.js >= 20.0.0
- npm >= 10.x (for dependencies)

## Building from Source

See [../BUILD-OHOS.md](../BUILD-OHOS.md) for build instructions.

## License

Apache-2.0

## Links

- [Main Repository](https://github.com/thrones-zz/cline)
- [OpenHarmony Branch](https://github.com/thrones-zz/cline/tree/ohos)
- [Documentation](https://docs.cline.bot)
