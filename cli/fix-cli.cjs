
const fs = require('fs');
const content = fs.readFileSync(process.argv[2], 'utf8');

const oldRequire = `var __require = /* @__PURE__ */ ((x8) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x8, {
  get: (a8, b7) => (typeof require !== "undefined" ? require : a8)[b7]
}) : x8)(function(x8) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x8 + '" is not supported');
});`;

const newRequire = `var __require = _req;`;

let result = content.replace(oldRequire, newRequire);
fs.writeFileSync(process.argv[2], result);
console.log('Fixed');
