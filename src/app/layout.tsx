import StoreProvider from '@/lib/store/StoreProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://get-quick-resume.netlify.app'),
  title:
    'Quick Resume - Build Free Professional ATS Friendly Resumes Instantly',
  description:
    "Quick Resume is your go-to platform for creating professional ats friendly resumes effortlessly. No login/signup required, save your resumes locally, and generate PDFs with ease. Perfect for job seekers looking to make a great impression. And it's completely free!",
  openGraph: {
    url: 'https://get-quick-resume.netlify.app',
    type: 'website',
    title:
      'Quick Resume - Build Free Professional ATS Friendly Resumes Instantly',
    description:
      "Quick Resume is your go-to platform for creating professional ats friendly resumes effortlessly. No login/signup required, save your resumes locally, and generate PDFs with ease. Perfect for job seekers looking to make a great impression. And it's completely free!",
  },
  twitter: {
    card: 'summary_large_image',
    site: 'get-quick-resume.netlify.app',
    title:
      'Quick Resume - Build Free Professional ATS Friendly Resumes Instantly',
    description:
      "Quick Resume is your go-to platform for creating professional ats friendly resumes effortlessly. No login/signup required, save your resumes locally, and generate PDFs with ease. Perfect for job seekers looking to make a great impression. And it's completely free!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <StoreProvider>{children} </StoreProvider>
        </Providers>
      </body>
    </html>
  );
}
