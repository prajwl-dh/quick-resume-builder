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
  instrument: { family: 'Instrument Serif PDF', slug: 'instrument', weights: [400] },
  'plex-mono': { family: 'IBM Plex Mono PDF', slug: 'plex-mono', weights: [400, 600, 700] },
};

let registered = false;

export function registerPdfFonts() {
  if (registered) return;
  registered = true;
  Object.values(PDF_FONTS).forEach((font) => {
    Font.register({
      family: font.family,
      fonts: font.weights.map((weight) => ({
        src: `/fonts/pdf/${font.slug}-${weight}.ttf`,
        fontWeight: weight,
      })),
    });
  });
}

export function pdfFont(font: ResumeFont | undefined): string {
  return (PDF_FONTS[font ?? 'inter'] ?? PDF_FONTS.inter).family;
}

export const PDF_MONO_FONT = PDF_FONTS['plex-mono'].family;
