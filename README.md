# Quick Resume Builder

A free, open-source resume builder that runs entirely in your browser. No account, no uploads — resumes are saved in local storage and exported as real, text-based PDFs.

## What it does

- 12 templates and 12 fonts, with controls for type, spacing, margins and colour
- One-section-at-a-time editor with drag-to-reorder and hide/show sections
- Live preview beside the editor
- PDF export on A4 or Letter, one page or two, with selectable text and working links
- Resume check that flags missing dates, summary, contact details and thin bullets
- JSON backup and import, plus light and dark themes

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · Redux Toolkit · Tailwind CSS · Headless UI · Framer Motion · React PDF

## Run locally

Requires Node.js and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Other scripts: `npm run build`, `npm start`, `npm run lint`.

## ATS checks

The test harness renders PDFs with the app's own renderer and parses them with a pdf.js-based OpenResume-style parser, so it checks what an ATS actually reads rather than how the page looks.

```bash
npm run ats:test
npm run ats:parse -- ./resume.pdf
```

See [tests/ats/README.md](tests/ats/README.md) for the full matrix and options.

## Links

- Live: https://get-quick-resume.netlify.app
- Source: https://github.com/prajwl-dh/quick-resume-builder
