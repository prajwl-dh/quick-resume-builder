import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './provider';
import StoreProvider from './store/StoreProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quick Resume - Build Free Professional Resumes Instantly',
  description:
    "Quick Resume is your go-to platform for creating professional resumes effortlessly. Choose from multiple styles, save your resumes locally, and generate PDFs with ease. Perfect for job seekers looking to make a great impression. And it's completely free!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang='en' suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </StoreProvider>
  );
}
