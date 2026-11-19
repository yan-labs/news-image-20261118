// Entry for the 18 November 2026 one-day news image.
//
// The image is the entry: entry.png beside this file, drawn by
// tools/render.py from the day's researched stories. This program's only
// job is to hand that image to the grader, after re-checking the gate the
// rules state, so a broken render fails loudly here instead of silently
// scoring 0:
//   - PNG or JPEG, told apart by its first bytes;
//   - at most 1 MiB (1048576 bytes);
//   - at most 1024 by 1024 pixels (PNG IHDR chunk, or the first JPEG
//     start-of-frame segment).
// The same input bytes always produce the same output bytes, so the two
// grader runs agree. Destination is /output, or $MAKEFUN_OUTPUT_DIR
// outside the grader's container:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const LIMIT_BYTES = 1048576;
const LIMIT_SIDE = 1024;

const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_SIG = Buffer.from([0xff, 0xd8, 0xff]);

function reject(detail) {
  throw new Error(`entry image rejected: ${detail}`);
}

function pngSize(buf) {
  if (buf.length < 33 || buf.toString('ascii', 12, 16) !== 'IHDR') {
    reject('PNG header has no IHDR chunk where expected');
  }
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function jpegSize(buf) {
  // Walk the JPEG marker stream until a start-of-frame segment (SOF0/1/2)
  // reports height and width; skip every segment we do not need.
  let at = 2;
  while (at + 9 < buf.length) {
    if (buf[at] !== 0xff) reject('JPEG marker stream is malformed');
    const marker = buf[at + 1];
    const len = buf.readUInt16BE(at + 2);
    if (marker >= 0xc0 && marker <= 0xcf &&
        marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { width: buf.readUInt16BE(at + 7), height: buf.readUInt16BE(at + 5) };
    }
    at += 2 + len;
  }
  reject('JPEG has no start-of-frame segment');
}

const image = await readFile(new URL('./entry.png', import.meta.url));

let kind;
let size;
if (image.subarray(0, 8).equals(PNG_SIG)) {
  kind = 'PNG';
  size = pngSize(image);
} else if (image.subarray(0, 3).equals(JPEG_SIG)) {
  kind = 'JPEG';
  size = jpegSize(image);
} else {
  reject('first bytes are neither PNG nor JPEG');
}

if (image.length > LIMIT_BYTES) {
  reject(`${kind} is ${image.length} bytes, over the 1 MiB limit`);
}
if (size.width > LIMIT_SIDE || size.height > LIMIT_SIDE) {
  reject(`${kind} is ${size.width}x${size.height}, over the 1024x1024 limit`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
await mkdir(outDir, { recursive: true });
const dest = join(outDir, 'entry.png');
await writeFile(dest, image);
console.error(`wrote ${kind} ${size.width}x${size.height}, ${image.length} bytes -> ${dest}`);
