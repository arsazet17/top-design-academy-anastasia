import fs from 'node:fs';
const root = new URL('../', import.meta.url);
const read = p => fs.readFileSync(new URL(p, root), 'utf8');
const write = (p,s) => fs.writeFileSync(new URL(p, root), s);
const vj = JSON.parse(read('version.json'));
const parts = vj.version.split('.').map(Number);
parts[2] += 1;
const version = parts.join('.');
const d = new Date();
const pad = n => String(n).padStart(2,'0');
const build = `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}-${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}`;
write('version.json', JSON.stringify({version,build})+'\n');
write('version.js', `window.APP_VERSION = "${version}";\nwindow.BUILD_ID = "${build}";\n`);
let sw = read('sw.js').replace(/const BUILD_ID = '[^']+';/, `const BUILD_ID = '${build}';`); write('sw.js', sw);
for (const file of ['index.html','manifest.webmanifest']) {
  let s = read(file);
  s = s.replace(/\?v=(?:__BUILD__|[0-9]{8}-[0-9]{4,6})/g, `?v=${build}`);
  write(file,s);
}
console.log(`Bumped to v${version} build ${build}`);
