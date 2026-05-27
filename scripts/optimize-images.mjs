#!/usr/bin/env node
// Convert raw PNG/JPG masters to optimized WebP (+ JPG fallback).
// Usage: node scripts/optimize-images.mjs <inputDir> <outputDir> [maxWidth]
//   maxWidth defaults to 1280. Images are never upscaled.
//   Outputs <name>.webp (primary) and <name>.jpg (fallback) into outputDir.
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';

const [, , inDir, outDir, maxWStr] = process.argv;
if (!inDir || !outDir) {
  console.error('usage: node scripts/optimize-images.mjs <inputDir> <outputDir> [maxWidth]');
  process.exit(1);
}
const maxW = maxWStr ? parseInt(maxWStr, 10) : 1280;
const kb = (n) => (n / 1024).toFixed(0) + 'KB';

await mkdir(outDir, { recursive: true });
const files = (await readdir(inDir)).filter(
  (f) => /\.(png|jpe?g)$/i.test(f) && !f.startsWith('.')
);

if (files.length === 0) {
  console.log(`No PNG/JPG found in ${inDir}`);
  process.exit(0);
}

let before = 0;
let after = 0;
for (const f of files) {
  const { name } = parse(f);
  const src = join(inDir, f);
  const meta = await sharp(src).metadata();
  const width = Math.min(meta.width ?? maxW, maxW);
  const base = sharp(src).rotate().resize({ width, withoutEnlargement: true });

  const webpOut = join(outDir, `${name}.webp`);
  const jpgOut = join(outDir, `${name}.jpg`);
  await base.clone().webp({ quality: 80 }).toFile(webpOut);
  await base.clone().jpeg({ quality: 82, mozjpeg: true, progressive: true }).toFile(jpgOut);

  const [si, wi, ji] = await Promise.all([stat(src), stat(webpOut), stat(jpgOut)]);
  before += si.size;
  after += wi.size;
  console.log(`${f}  ${kb(si.size)} -> ${name}.webp ${kb(wi.size)} | ${name}.jpg ${kb(ji.size)}`);
}
console.log(`\nTotal (webp): ${kb(before)} -> ${kb(after)}  (${(100 - (after / before) * 100).toFixed(0)}% smaller)`);
