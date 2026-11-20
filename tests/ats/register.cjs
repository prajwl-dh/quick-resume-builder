/**
 * Minimal require hook so the Node test scripts can import the app's TS/TSX
 * modules directly. Uses the TypeScript compiler that is already a dev
 * dependency; no extra transpiler is needed.
 */
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const ts = require('typescript');

const root = path.resolve(__dirname, '../..');

const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  const mapped = request.startsWith('@/')
    ? path.join(root, 'src', request.slice(2))
    : request;
  return originalResolve.call(this, mapped, parent, isMain, options);
};

for (const ext of ['.ts', '.tsx']) {
  require.extensions[ext] = (module, filename) => {
    const source = fs.readFileSync(filename, 'utf8');
    const { outputText } = ts.transpileModule(source, {
      fileName: filename,
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
        allowJs: true,
      },
    });
    module._compile(outputText, filename);
  };
}
