import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { parse } from '@typescript-eslint/typescript-estree';
import postcss from 'postcss';
import scss from 'postcss-scss';
import ts from 'typescript';

const validChecks = new Set([
  'exports', 'props', 'examples', 'classes', 'tokens', 'motion', 'loc', 'dependencies', 'guidance',
]);
const argumentsList = process.argv.slice(2);
const checkIndex = argumentsList.indexOf('--check');
const requestedChecks = checkIndex === -1
  ? []
  : (argumentsList[checkIndex + 1] ?? '').split(',').filter(Boolean);
const reportOnly = argumentsList.includes('--report-only');
const componentIndex = argumentsList.indexOf('--components');
const components = componentIndex === -1
  ? []
  : (argumentsList[componentIndex + 1] ?? '').split(',').filter(Boolean);

for (const check of requestedChecks) {
  if (!validChecks.has(check)) {
    console.error(`Unknown contract check: ${check}`);
    process.exitCode = 2;
  }
}
if (process.exitCode) process.exit();

const root = process.cwd();
const sourceRoot = join(root, 'packages', 'core', 'src');
const docsRoot = join(root, 'packages', 'docs', 'src');
const builtCssPath = join(root, 'packages', 'core', 'dist', 'lyco-ui.css');
const files = [];
function visit(directory) {
  if (!existsSync(directory)) return;
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) visit(path);
    else if (/\.(?:ts|tsx|scss)$/.test(entry)) files.push(path);
  }
}
visit(sourceRoot);
const documentationFiles = [];
function visitDocs(directory) {
  if (!existsSync(directory)) return;
  for (const entry of readdirSync(directory)) {
    const path = join(directory, entry);
    if (statSync(path).isDirectory()) visitDocs(path);
    else if (/\.(?:ts|tsx)$/.test(entry)) documentationFiles.push(path);
  }
}
visitDocs(docsRoot);

const inventory = { files: files.length, components, checks: requestedChecks, exportSymbols: 0, cssSelectors: 0 };
const findings = [];
for (const file of files) {
  const source = readFileSync(file, 'utf8');
  if (/\.(?:ts|tsx)$/.test(file)) parse(source, { jsx: file.endsWith('.tsx'), loc: true });
  if (file.endsWith('.scss')) scss.parse(source, { from: file });
  if (requestedChecks.includes('loc') && source.split(/\r?\n/).length > 220) {
    findings.push({ check: 'loc', file: relative(root, file), message: 'physical line count exceeds 220' });
  }
  if (requestedChecks.includes('classes') && /(?:__|--)[a-z0-9-]+/i.test(source)) {
    findings.push({ check: 'classes', file: relative(root, file), message: 'contains legacy BEM-style class syntax' });
  }
  if (requestedChecks.includes('dependencies') && file.endsWith('.vanilla.ts') && /from ['"](?:react|react-dom|clsx)['"]/.test(source)) {
    findings.push({ check: 'dependencies', file: relative(root, file), message: 'Vanilla source imports a framework dependency' });
  }
  if (requestedChecks.includes('motion') && /transition:\s*[^;]*(?:width|height|margin|padding|grid-template)/.test(source)) {
    findings.push({ check: 'motion', file: relative(root, file), message: 'transition includes a layout property' });
  }
  if (requestedChecks.includes('tokens') && /(?:color|background|border):\s*#[0-9a-f]{3,8}\b/i.test(source)) {
    findings.push({ check: 'tokens', file: relative(root, file), message: 'hardcoded color found in a style source' });
  }
}

if (existsSync(builtCssPath)) {
  const stylesheet = postcss.parse(readFileSync(builtCssPath, 'utf8'), { from: builtCssPath });
  stylesheet.walkRules(() => { inventory.cssSelectors += 1; });
}

if (requestedChecks.includes('exports')) {
  const indexPath = join(sourceRoot, 'index.ts');
  const program = ts.createProgram([indexPath], { jsx: ts.JsxEmit.ReactJSX, skipLibCheck: true });
  const checker = program.getTypeChecker();
  const indexSource = program.getSourceFile(indexPath);
  const moduleSymbol = indexSource && checker.getSymbolAtLocation(indexSource);
  const exportCount = moduleSymbol ? checker.getExportsOfModule(moduleSymbol).length : 0;
  inventory.exportSymbols = exportCount;
  const documentedApiFiles = documentationFiles.filter((file) => /[\\/]api(?:\.tsx|[\\/])/.test(file)).length;
  if (documentedApiFiles < exportCount) {
    findings.push({ check: 'exports', file: relative(root, docsRoot), message: `${exportCount} public export groups exceed ${documentedApiFiles} API files` });
  }
}

if (requestedChecks.includes('props')) {
  const apiFiles = documentationFiles.filter((file) => /[\\/]api(?:\.tsx|[\\/])/.test(file));
  const interfaces = files.filter((file) => /\.(?:ts|tsx)$/.test(file)).flatMap((file) =>
    [...readFileSync(file, 'utf8').matchAll(/(?:interface|type)\s+([A-Za-z0-9]+Props)\b/g)].map((match) => match[1]),
  );
  const documentedProps = apiFiles.flatMap((file) =>
    [...readFileSync(file, 'utf8').matchAll(/(?:Props|props)\s*[:=]/g)].map((match) => match.index),
  );
  if (documentedProps.length < interfaces.length) {
    findings.push({ check: 'props', file: relative(root, docsRoot), message: `${interfaces.length} source prop interfaces exceed ${documentedProps.length} documented prop mappings` });
  }
}

if (requestedChecks.includes('examples')) {
  for (const file of documentationFiles.filter((candidate) => /[\\/]examples[\\/]/.test(candidate))) {
    const source = readFileSync(file, 'utf8');
    if (!/export\s+(?:const\s+)?vanillaHtml\b/.test(source)) {
      findings.push({ check: 'examples', file: relative(root, file), message: 'example lacks vanillaHtml metadata' });
    }
  }
}

console.log(JSON.stringify({ inventory, findings }, null, 2));
if (!reportOnly && findings.length > 0) process.exitCode = 1;
