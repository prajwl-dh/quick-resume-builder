import type { ResumeInterface } from '@/components/builder/previousResumes/ResumeInterface';
import { normalizeTheme } from '@/lib/resumeDefaults';
import { pdf } from '@react-pdf/renderer';
import ResumePdfDocument from './ResumePdfDocument';
import { registerPdfFonts } from './fonts';
import { MIN_ONE_PAGE_SCALE } from './limits';

export interface BuiltPdf {
  blob: Blob;
  pages: number;
  /** Typography scale used to make a one-page export. */
  scale: number;
}

/** Count page objects in the generated PDF. */
async function countPdfPages(blob: Blob): Promise<number> {
  const text = await blob.text();
  const pages = text.match(/\/Type\s*\/Page\b/g);
  return Math.max(1, pages?.length ?? 1);
}

async function render(resume: ResumeInterface, fit: number) {
  const blob = await pdf(<ResumePdfDocument resume={resume} fit={fit} />).toBlob();
  return { blob, pages: await countPdfPages(blob), scale: fit };
}

/**
 * Build a real vector PDF with selectable text, working links and the same
 * paper, margins and type settings shown in the live preview.
 *
 * When one-page mode is on, the document is rendered at decreasing type
 * scales until it fits. The smallest acceptable scale is 75%, below which
 * the type stops being readable.
 */
export async function buildResumePdf(resume: ResumeInterface): Promise<BuiltPdf> {
  registerPdfFonts();
  const theme = normalizeTheme(resume.theme);

  if (!theme.onePage) {
    return render(resume, 1);
  }

  const full = await render(resume, 1);
  if (full.pages === 1) return full;

  const clamp = MIN_ONE_PAGE_SCALE;
  const smallest = await render(resume, clamp);
  if (smallest.pages > 1) return smallest;

  let low = clamp;
  let high = 1;
  let best = smallest;

  // Four steps land within about 3% of the largest scale that still fits.
  for (let step = 0; step < 4; step += 1) {
    const mid = (low + high) / 2;
    const attempt = await render(resume, mid);
    if (attempt.pages === 1) {
      best = attempt;
      low = mid;
    } else {
      high = mid;
    }
  }

  return best;
}
