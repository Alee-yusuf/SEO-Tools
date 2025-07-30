import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SEO Tools - Free Online SEO Utilities',
  description: 'Free SEO tools including word counter, grammar checker, plagiarism checker, and case converter. Boost your content quality with our professional SEO utilities.',
  keywords: 'SEO tools, word counter, grammar checker, plagiarism checker, case converter, content optimization',
  openGraph: {
    title: 'SEO Tools - Free Online SEO Utilities',
    description: 'Free SEO tools including word counter, grammar checker, plagiarism checker, and case converter.',
    type: 'website',
    url: 'https://your-domain.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Tools - Free Online SEO Utilities',
    description: 'Free SEO tools including word counter, grammar checker, plagiarism checker, and case converter.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}