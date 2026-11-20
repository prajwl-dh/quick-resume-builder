/**
 * ATS regression check.
 *
 *   npm run ats:test                 # every template × core fonts
 *   ATS_FONTS=all npm run ats:test    # every template × every font
 *   ATS_ONLY=folio npm run ats:test   # one template
 *
 * Templates and fonts are discovered from the app's own lists, so newly added
 * templates are covered automatically.
 */
import assert from 'node:assert/strict';
import { rmSync } from 'node:fs';
import { parseResumePdf } from './parser.mjs';
import { OUT_DIR, fontIds, templateIds, writeResumePdf } from './generate.mjs';

const normalize = (value) =>
  (value ?? '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const expected = {
  name: 'alex morgan',
  email: 'alex.morgan@example.com',
  phone: '+1 415 555 0132',
  jobs: [
    { company: 'northstar labs', jobTitle: 'senior frontend engineer' },
    { company: 'pixel code', jobTitle: 'frontend developer' },
  ],
  school: 'university of texas at austin',
  degree: 'b s computer science',
};

const only = process.env.ATS_ONLY?.trim().toLowerCase();
const templates = only
  ? templateIds.filter((id) => id.toLowerCase() === only)
  : templateIds;
if (!templates.length) {
  console.error(`Unknown template "${only}". Known templates: ${templateIds.join(', ')}`);
  process.exit(1);
}

// The default run uses the example resume's font. `ATS_FONTS=all` additionally
// exercises every typeface; monospace glyph widths can make pdf.js split words
// into separate text items, which is a parser limitation worth surfacing.
const fonts = process.env.ATS_FONTS === 'all' ? fontIds : ['source'];

if (process.env.ATS_KEEP_PDFS !== '1') rmSync(OUT_DIR, { recursive: true, force: true });

let passed = 0;
const failures = [];
for (const template of templates) {
  for (const font of fonts) {
    const label = `${template}/${font}`;
    try {
      const file = await writeResumePdf(template, font);
      const result = await parseResumePdf(file);

      assert.ok(
        normalize(result.profile.name).includes(expected.name),
        `name: expected to contain "${expected.name}", got "${result.profile.name}"`
      );
      assert.equal(result.profile.email, expected.email, `email: got "${result.profile.email}"`);
      // OpenResume's phone regex captures the 10-digit local number, not +1.
      assert.ok(
        (result.profile.phone ?? '').replace(/\D/g, '').endsWith('4155550132'),
        `phone: got "${result.profile.phone}"`
      );

      const workHeading = result.sections.find((name) =>
        /experience|work|employment/i.test(name)
      );
      assert.ok(workHeading, `no work-experience section; sections: ${result.sections.join(', ')}`);
      assert.ok(
        result.sections.some((name) => /education/i.test(name)),
        `no education section; sections: ${result.sections.join(', ')}`
      );

      assert.equal(
        result.experience.length,
        expected.jobs.length,
        `work experiences: expected ${expected.jobs.length}, got ${result.experience.length}`
      );
      expected.jobs.forEach((job, index) => {
        const actual = result.experience[index];
        assert.equal(
          normalize(actual.company),
          job.company,
          `experience[${index}].company: got "${actual.company}"`
        );
        assert.equal(
          normalize(actual.jobTitle),
          job.jobTitle,
          `experience[${index}].jobTitle: got "${actual.jobTitle}"`
        );
        assert.ok(
          actual.descriptions.length >= 3,
          `experience[${index}].descriptions: expected at least 3 bullets, got ${actual.descriptions.length}`
        );
      });

      const education = result.education[0];
      assert.ok(education, 'no education entry parsed');
      assert.equal(
        normalize(education.school),
        expected.school,
        `education.school: got "${education.school}"`
      );
      assert.equal(
        normalize(education.degree),
        expected.degree,
        `education.degree: got "${education.degree}"`
      );

      // Guard against the old "/" field separator sneaking back into the PDF.
      const headerLine = result.lines.find((line) =>
        line.some((item) => item.includes('Northstar Labs'))
      );
      assert.ok(headerLine, 'could not find the first job header line');
      assert.ok(
        !headerLine.some((item) => item.includes(' / ')),
        `slash separator found in job header: ${headerLine.join(' ')}`
      );

      passed += 1;
      console.log(`  ✓ ${label}`);
    } catch (error) {
      failures.push({ label, message: error.message });
      console.log(`  ✗ ${label} — ${error.message}`);
    }
  }
}

console.log(`\n${passed} passed, ${failures.length} failed (${templates.length} templates × ${fonts.length} fonts)`);
if (failures.length) {
  console.log(`\nGenerated PDFs kept in ${OUT_DIR} for inspection.`);
  process.exit(1);
}
if (process.env.ATS_KEEP_PDFS !== '1') rmSync(OUT_DIR, { recursive: true, force: true });
