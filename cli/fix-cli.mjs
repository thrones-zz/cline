import fs from 'fs';

const file = '/storage/Users/currentUser/cline/cli/dist-ohos/cli.mjs';
let content = fs.readFileSync(file, 'utf8');

// Replace __require definition with our polyfill
const oldRequire = `var __require = /* @__PURE__ */ ((x8) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x8, {
  get: (a8, b7) => (typeof require !== "undefined" ? require : a8)[b7]
}) : x8)(function(x8) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x8 + '" is not supported');
});`;

const newRequire = `var __require = _req;`;

content = content.replace(oldRequire, newRequire);

fs.writeFileSync(file, content);
console.log('Fixed');
