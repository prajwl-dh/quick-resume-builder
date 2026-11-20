# ATS test harness

Generates real PDFs with the app's own renderer and parses them with an
OpenResume-style parser built on pdf.js text items. This checks what an ATS
actually reads, not what the page looks like.

Templates and fonts are read from `src/lib/resumeDesign.ts`, so adding a new
template automatically adds it to the test matrix.

## Commands

```bash
npm run ats:test                     # every template × the example font
ATS_FONTS=all npm run ats:test       # every template × every font (exploratory)
ATS_ONLY=folio npm run ats:test      # one template (debugging)
ATS_KEEP_PDFS=1 npm run ats:test     # keep generated PDFs in tests/ats/out

npm run ats:parse -- ./resume.pdf              # parse any PDF
npm run ats:parse -- ./resume.pdf --lines      # include grouped text lines
npm run ats:parse -- ./resume.pdf --third-party # also run resume-parser-ats
```

Generated PDFs live in `tests/ats/out/` (gitignored).

`ATS_FONTS=all` is useful for finding font-specific problems: a monospace
body font can produce word-level text items whose gaps exceed pdf.js's typical
character width, so OpenResume splits a company name or school into separate
items. The default run uses the example font, which the parser handles.

## What is asserted

For every template/font pair, the example resume must yield:

- name, email and phone
- a detected Work Experience section with both jobs, their job titles and at least three bullets each
- a detected Education section with the school and degree
- no ` / ` field separator in the job header line

The checks cover the regressions fixed so far: merged name/role text, missing
job titles (case-sensitive role keywords), unextractable bullet dots, joined
contact fields, slash separators and unrecognised section headings.

## Files

- `parser.mjs` — OpenResume-faithful pdf.js pipeline (read → group lines → group sections → extract fields)
- `generate.mjs` — renders PDFs for all discovered templates/fonts
- `check.mjs` — assertions and CLI reporting
- `parse.mjs` — parse an arbitrary PDF
- `register.cjs` — TypeScript/JSX require hook for the test scripts
