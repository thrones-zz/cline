import * as esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';

const distDir = path.join(process.cwd(), 'dist-ohos');
const stubModulesDir = path.join(distDir, 'node_modules');

// Create stub modules directory
if (!fs.existsSync(stubModulesDir)) {
  fs.mkdirSync(stubModulesDir, { recursive: true });
}

// Create @vscode/ripgrep stub
const ripgrepDir = path.join(stubModulesDir, '@vscode', 'ripgrep');
if (!fs.existsSync(ripgrepDir)) {
  fs.mkdirSync(ripgrepDir, { recursive: true });
  fs.writeFileSync(path.join(ripgrepDir, 'package.json'), JSON.stringify({
    name: '@vscode/ripgrep',
    version: '1.0.0',
    main: 'stub.js'
  }));
  fs.writeFileSync(path.join(ripgrepDir, 'stub.js'), `
// @vscode/ripgrep stub for OpenHarmony
module.exports = {
  rgpath: null,
};
`);
}

// Create vscode stub
const vscodeDir = stubModulesDir;
if (!fs.existsSync(vscodeDir)) {
  fs.mkdirSync(vscodeDir, { recursive: true });
}
fs.writeFileSync(path.join(vscodeDir, 'package.json'), JSON.stringify({
  name: 'vscode',
  version: '1.0.0',
  main: 'index.js'
}));
fs.writeFileSync(path.join(vscodeDir, 'index.js'), `
// VSCode stub for OpenHarmony CLI
module.exports = {
  commands: {
    registerCommand: () => ({ dispose: () => {} }),
    executeCommand: () => Promise.resolve(),
  },
  window: {
    showInformationMessage: () => {},
    showWarningMessage: () => {},
    showErrorMessage: () => {},
    createOutputChannel: () => ({
      appendLine: () => {},
      show: () => {},
      dispose: () => {},
    }),
  },
  workspace: {
    workspaceFolders: [],
    getConfiguration: () => ({
      get: () => undefined,
      update: () => Promise.resolve(),
    }),
    createFileSystemWatcher: () => ({ dispose: () => {} }),
  },
  env: {
    openExternal: () => Promise.resolve(),
  },
  TreeItem: class {},
  TreeItemCollapsibleState: { None: 0, Collapsed: 1, Expanded: 2 },
};
`);

// VSCode stub plugin for bundling
const vscodeStubPlugin = {
  name: 'vscode-stub',
  setup(build) {
    build.onResolve({ filter: /^vscode$/ }, () => {
      return { path: path.join(process.cwd(), 'src/vscode-shim.ts') };
    });
  },
};

const __dirname = process.cwd();

await esbuild.build({
  bundle: true,
  entryPoints: [path.join(__dirname, 'src/index.ts')],
  outfile: path.join(__dirname, 'dist-ohos/cli.mjs'),
  platform: 'node',
  target: 'node20',
  format: 'esm',
  plugins: [vscodeStubPlugin],
  external: [
    '@vscode/ripgrep',
    '@grpc/reflection',
    'grpc-health-check',
    'better-sqlite3',
    'ink',
    'ink-spinner',
    'ink-picture',
    'react',
    'aws4fetch',
    'pino',
    'pino-roll'
  ],
  sourcemap: false,
  minify: false,
  logLevel: 'silent',
  tsconfig: path.join(__dirname, 'tsconfig.json'),
  define: {
    'process.env.IS_STANDALONE': '"true"',
    'process.env.IS_CLI': '"true"'
  },
  banner: {
    js: `#!/usr/bin/env node
process.emitWarning = () => {};
import{createRequire as _createRequire}from"module";
import{fileURLToPath as _fileURLToPath}from"url";
import{dirname as _dirname}from"path";
const require=_createRequire(import.meta.url);
const __filename=_fileURLToPath(import.meta.url);
const __dirname=_dirname(__filename);`
  }
});

console.log('Build complete');
