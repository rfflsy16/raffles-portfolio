import Background from '@/components/Background';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rafles Yohanes Portfolio',
  description: 'Fullstack Developer crafting exceptional digital experiences with modern web technologies',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return ( 
    <html lang="en">
      <body className={inter.className}>
        <Background />
        {children}
        <Analytics/>
        </body>
    </html>
  );
}