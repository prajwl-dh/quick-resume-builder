/** Generate real PDFs from the app's own renderer for every template/font pair. */
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const require = createRequire(import.meta.url);
require('./register.cjs');

const React = require('react');
const { pdf } = require('@react-pdf/renderer');
const ResumePdfDocument = require('../../src/lib/pdf/ResumePdfDocument').default;
const { createExampleResume } = require('../../src/lib/resumeDefaults');
const { TEMPLATES, FONTS } = require('../../src/lib/resumeDesign');

export const OUT_DIR = path.resolve(import.meta.dirname, 'out');
export const templateIds = TEMPLATES.map((template) => template.id);
export const fontIds = FONTS.map((font) => font.id);

export async function renderResumePdf(template, font) {
  const base = createExampleResume();
  const resume = {
    ...base,
    theme: { ...base.theme, template, font, onePage: false },
  };
  const blob = await pdf(
    React.createElement(ResumePdfDocument, { resume, fit: 1 })
  ).toBlob();
  return Buffer.from(await blob.arrayBuffer());
}

export async function writeResumePdf(template, font) {
  mkdirSync(OUT_DIR, { recursive: true });
  const buffer = await renderResumePdf(template, font);
  const file = path.join(OUT_DIR, `${template}-${font}.pdf`);
  writeFileSync(file, buffer);
  return file;
}
