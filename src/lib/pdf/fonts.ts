import { Font } from '@react-pdf/renderer';
import type { ResumeFont } from '@/components/builder/previousResumes/ResumeInterface';

/**
 * The PDF renderer cannot use the webfonts loaded by next/font, so the same
 * families are served as static files from /public/fonts/pdf. Only the family
 * picked in Design is fetched when a PDF is built.
 */
interface PdfFontMeta {
  family: string;
  slug: string;
  weights: number[];
}

const PDF_FONTS: Record<ResumeFont, PdfFontMeta> = {
  inter: { family: 'Inter PDF', slug: 'inter', weights: [400, 600, 700] },
  manrope: { family: 'Manrope PDF', slug: 'manrope', weights: [400, 600, 700] },
  work: { family: 'Work Sans PDF', slug: 'work', weights: [400, 600, 700] },
  space: { family: 'Space Grotesk PDF', slug: 'space', weights: [400, 600, 700] },
  plex: { family: 'IBM Plex Sans PDF', slug: 'plex', weights: [400, 600, 700] },
  franklin: { family: 'Libre Franklin PDF', slug: 'franklin', weights: [400, 600, 700] },
  source: { family: 'Source Serif PDF', slug: 'source', weights: [400, 600, 700] },
  lora: { family: 'Lora PDF', slug: 'lora', weights: [400, 600, 700] },
  garamond: { family: 'EB Garamond PDF', slug: 'garamond', weights: [400, 600, 700] },
  playfair: { family: 'Playfair Display PDF', slug: 'playfair', weights: [400, 600, 700] },
  instrument: { family: 'Instrument Serif PDF', slug: 'instrument', weights: [400, 600, 700] },
  'plex-mono': { family: 'IBM Plex Mono PDF', slug: 'plex-mono', weights: [400, 600, 700] },
};

let registered = false;

/**
 * Browsers fetch the files from the public folder. In a Node context (tests or
 * server-side rendering) the same files are resolved from the repo instead.
 */
function fontSrc(slug: string, weight: number): string {
  const relative = `/fonts/pdf/${slug}-${weight}.ttf`;
  if (typeof window === 'undefined' && typeof process !== 'undefined' && process.cwd) {
    return `${process.cwd()}/public${relative}`;
  }
  return relative;
}

export function registerPdfFonts() {
  if (registered) return;
  registered = true;
  Object.values(PDF_FONTS).forEach((font) => {
    Font.register({
      family: font.family,
      fonts: font.weights.map((weight) => ({
        // Instrument Serif only ships one file. Registering the same file for
        // the heavier weights keeps the embedded font's character map intact
        // instead of letting a missing weight corrupt the PDF text layer.
        src: fontSrc(font.slug, font.slug === 'instrument' ? 400 : weight),
        fontWeight: weight,
      })),
    });
  });
}

export function pdfFont(font: ResumeFont | undefined): string {
  return (PDF_FONTS[font ?? 'inter'] ?? PDF_FONTS.inter).family;
}

export const PDF_MONO_FONT = PDF_FONTS['plex-mono'].family;
