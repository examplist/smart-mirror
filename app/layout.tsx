import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Auth from '@/app/common/Auth';
import Footer from '@/app/common/Footer';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '스마트미러',
  description: '스마트미러입니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Auth />
        {children}
        <Footer />
      </body>
    </html>
  );
}
