/**
 * Parse any PDF with the same OpenResume-style pipeline used by the tests.
 *
 *   npm run ats:parse -- ./resume.pdf
 *   npm run ats:parse -- ./resume.pdf --lines
 *   npm run ats:parse -- ./resume.pdf --third-party
 */
import { resolve } from 'node:path';
import { parseResumePdf } from './parser.mjs';

const args = process.argv.slice(2);
const file = args.find((arg) => !arg.startsWith('--'));
if (!file) {
  console.error('Usage: npm run ats:parse -- <path-to-pdf> [--lines] [--third-party]');
  process.exit(1);
}

const result = await parseResumePdf(resolve(file));
console.log(JSON.stringify({
  profile: result.profile,
  experience: result.experience,
  education: result.education,
  skills: result.skills,
  sections: result.sections,
  ...(args.includes('--lines') ? { lines: result.lines } : {}),
}, null, 2));

if (args.includes('--third-party')) {
  const { createRequire } = await import('node:module');
  const require = createRequire(import.meta.url);
  const parser = require('resume-parser-ats');
  const parsed = await parser.parseResumeAsync({ filePath: resolve(file) });
  console.log('\n--- resume-parser-ats (independent sanity check) ---');
  console.log(JSON.stringify(parsed.data ?? parsed, null, 2));
}
