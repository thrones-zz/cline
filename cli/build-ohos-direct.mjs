import * as esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist-ohos');
const stubModulesDir = path.join(distDir, 'node_modules');
if (!fs.existsSync(stubModulesDir)) {
  fs.mkdirSync(stubModulesDir, { recursive: true });
}

// Create chalk stub
const chalkDir = path.join(stubModulesDir, 'chalk');
fs.mkdirSync(chalkDir, { recursive: true });
fs.writeFileSync(path.join(chalkDir, 'package.json'), JSON.stringify({name:'chalk', version:'1.0.0', type:'commonjs', main:'index.js'}));
fs.writeFileSync(path.join(chalkDir, 'index.js'), `const c=(s)=>s;const fn=(s)=>s!=null?c(s):'';fn.red=fn;fn.green=fn;fn.yellow=fn;fn.blue=fn;fn.cyan=fn;fn.magenta=fn;fn.bold=fn;fn.dim=fn;fn.inverse=fn;fn.gray=fn;fn.grey=fn;fn.bgRed=fn;fn.bgGreen=fn;fn.bgYellow=fn;fn.bgBlue=fn;fn.default=fn;module.exports=fn;`);

// Create vscode-uri stub
const vscodeUriDir = path.join(stubModulesDir, 'vscode-uri');
fs.mkdirSync(vscodeUriDir, { recursive: true });
fs.writeFileSync(path.join(vscodeUriDir, 'package.json'), JSON.stringify({name:'vscode-uri', version:'1.0.0', type:'commonjs', main:'index.js'}));
fs.writeFileSync(path.join(vscodeUriDir, 'index.js'), `const{fileURLToPath:nodeFUTP,pathToFileURL:nodePTFU}=require('url');const fileURLToPath=(url)=>{if(!url)return'';return nodeFUTP(url);};const pathToFileURL=(p)=>nodePTFU(p);class URI{static parse(s){return new URI(s);}static file(s){return new URI(s);}static fileURLToPath(url){return fileURLToPath(url);}static pathToFileURL(path){return pathToFileURL(path);}constructor(u){this.scheme='file';this.path=u;}toString(){return this.scheme+'://'+this.path;}toFilePath(){return this.path?(this.path.startsWith('/')?this.path:'/'+this.path):'';}}module.exports={URI,fileURLToPath,pathToFileURL};module.exports.default={URI,fileURLToPath,pathToFileURL};`);

// Create @cli-kit/env-service-stub
const cliKitDir = path.join(stubModulesDir, '@cli-kit');
fs.mkdirSync(cliKitDir, { recursive: true });
fs.writeFileSync(path.join(cliKitDir, 'package.json'), JSON.stringify({name:'@cli-kit', version:'1.0.0', type:'commonjs', main:'index.js'}));
fs.writeFileSync(path.join(cliKitDir, 'env-service-stub.js'), `
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
`);

// Create other stubs
const stubs = {
  '@vscode/ripgrep': 'module.exports={rgPath:null};module.exports.default=module.exports;',
  'ink': 'module.exports=({children})=>null;module.exports.default=module.exports;',
  'ink-spinner': 'module.exports=()=>null;module.exports.default=module.exports;',
  'ink-picture': 'module.exports=()=>null;module.exports.default=module.exports;',
  'ora': 'module.exports=()=>({start:()=>{},succeed:()=>{},fail:()=>{},stop:()=>{}});module.exports.default=module.exports;',
  'cli-highlight': 'module.exports={default:{highlight:(s)=>s}};module.exports.default=module.exports;',
  'marked': 'module.exports={default:{parse:(s)=>s}};module.exports.default=module.exports;',
  'open': 'module.exports=async(url)=>{};module.exports.default=module.exports;',
  'pino': 'module.exports=()=>({info:()=>{},warn:()=>{},error:()=>{},debug:()=>{}});module.exports.default=module.exports;',
  'pino-roll': 'module.exports=()=>({info:()=>{},warn:()=>{},error:()=>{},debug:()=>{}});module.exports.default=module.exports;',
  'events': 'module.exports=require("events");module.exports.default=module.exports;',
};

for (const [name, code] of Object.entries(stubs)) {
  const dir = path.join(stubModulesDir, name);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({name, version:'1.0.0', type:'commonjs', main:'index.js'}));
  fs.writeFileSync(path.join(dir, 'index.js'), code);
}

// VSCode stub plugin
const vscodeStubPlugin = {
  name: 'vscode-stub',
  setup(build) {
    build.onResolve({ filter: /^vscode$/ }, () => ({
      path: path.join(__dirname, 'src/vscode-shim.ts')
    }));
  },
};

// Banner with polyfill - define __dirname and __filename BEFORE the bundle runs
const banner = `import { createRequire } from 'module';
import { fileURLToPath as _futp } from 'url';
import { dirname } from 'path';
const _u = import.meta.url;
const _fname = _futp(_u);
const _dname = dirname(_fname);
const _require = createRequire(_u);
const _req = (id) => {
  if (typeof id === 'string' && id.startsWith('node:')) {
    return _require(id.slice(5));
  }
  return _require(id);
};
// Set up global __dirname and __filename before any code runs
globalThis.__filename = _fname;
globalThis.__dirname = _dname;
var __dirname = _dname;
var __filename = _fname;
`;

await esbuild.build({
  bundle: true,
  entryPoints: [path.join(__dirname, 'src/index.ts')],
  outfile: path.join(__dirname, 'dist-ohos/cli.mjs'),
  platform: 'node',
  target: 'node20',
  format: 'esm',
  plugins: [vscodeStubPlugin],
  external: ['@grpc/reflection', 'grpc-health-check', 'better-sqlite3', '@vscode/ripgrep', 'ink', 'ink-spinner', 'ink-picture', 'react', 'react-dom', 'aws4fetch', 'pino', 'pino-roll', 'chalk', 'ora', 'cli-highlight', 'marked', 'open', 'vscode-uri', 'events'],
  sourcemap: false,
  minify: false,
  logLevel: 'silent',
  tsconfig: path.join(__dirname, 'tsconfig.json'),
  define: { 'process.env.IS_STANDALONE': '"true"', 'process.env.IS_CLI': '"true"' },
  banner: { js: banner }
});

// Fix __require definition
const outputFile = path.join(__dirname, 'dist-ohos/cli.mjs');
let content = fs.readFileSync(outputFile, 'utf8');

const oldRequire = `var __require = /* @__PURE__ */ ((x8) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x8, {
  get: (a8, b7) => (typeof require !== "undefined" ? require : a8)[b7]
}) : x8)(function(x8) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x8 + '" is not supported');
});`;

const newRequire = `var __require = _req;`;

content = content.replace(oldRequire, newRequire);
fs.writeFileSync(outputFile, content);

console.log('Build complete with @cli-kit stub');
