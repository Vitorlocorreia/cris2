import {cp, mkdir, readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';

const root = new URL('./', import.meta.url);
const output = new URL('./public/', root);
await mkdir(output, {recursive: true});
await cp(new URL('./dist/', root), new URL('./app/', output), {recursive: true});
const presentation = (await readFile(new URL('./apresentacao.html', root), 'utf8'))
  .replace('LOCALHOST · Protótipo', 'CRIS · Protótipo');
await writeFile(new URL('./index.html', output), presentation);
console.log('Site estático pronto em ' + fileURLToPath(output));
