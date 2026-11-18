import StoreProvider from '@/lib/store/StoreProvider';
import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';
import { Providers } from './provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const title = 'Quick Resume — A quiet, private resume builder';
const description =
  'Build a clean, ATS-friendly resume in your browser. No account, no uploads — your data stays on your device. Download a print-ready PDF when you are done.';

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
    site: 'get-quick-resume.netlify.app',
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} font-sans`}
      >
        <Providers>
          <StoreProvider>{children}</StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
