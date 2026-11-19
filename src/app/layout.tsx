import StoreProvider from '@/lib/store/StoreProvider';
import type { Metadata, Viewport } from 'next';
import {
  EB_Garamond,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Inter,
  Instrument_Serif,
  Libre_Franklin,
  Lora,
  Manrope,
  Playfair_Display,
  Source_Serif_4,
  Space_Grotesk,
  Work_Sans,
} from 'next/font/google';
import './globals.css';
import './resume-sheet.css';
import { Providers } from './provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

// Resume fonts. Loaded once and referenced by the sheet through CSS variables.
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-source',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora',
  display: 'swap',
});

const garamond = EB_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-garamond',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-work',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
});

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex',
  display: 'swap',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
});

const franklin = Libre_Franklin({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-franklin',
  display: 'swap',
});

const title = 'Quick Resume — a resume builder that stays out of the way';
const description =
  'Build a resume you can send today. Twelve templates, live preview, drag-to-reorder sections and a clean PDF export. No account, no uploads — everything is saved in your browser.';

export const metadata: Metadata = {
  metadataBase: new URL('https://get-quick-resume.netlify.app'),
  title,
  description,
  openGraph: {
    url: 'https://get-quick-resume.netlify.app',
    type: 'website',
    title,
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F6F2E9' },
    { media: '(prefers-color-scheme: dark)', color: '#111110' },
  ],
};

const fontVariables = [
  inter.variable,
  instrument.variable,
  sourceSerif.variable,
  lora.variable,
  garamond.variable,
  playfair.variable,
  manrope.variable,
  workSans.variable,
  spaceGrotesk.variable,
  plexSans.variable,
  plexMono.variable,
  franklin.variable,
].join(' ');

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${fontVariables} font-sans`}>
        <Providers>
          <StoreProvider>{children}</StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
