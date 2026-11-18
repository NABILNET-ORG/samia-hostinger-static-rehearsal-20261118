import { cpSync, lstatSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const source = fileURLToPath(new URL('./public', import.meta.url));
const output = fileURLToPath(new URL('./dist', import.meta.url));
mkdirSync(output, { recursive: true });
if (!lstatSync(output).isDirectory() || readdirSync(output).length !== 0) {
  throw new Error('The rehearsal build requires an empty, real dist directory.');
}

for (const entry of readdirSync(source)) {
  cpSync(join(source, entry), join(output, entry), {
    recursive: true,
    force: false,
    errorOnExist: true,
  });
}
