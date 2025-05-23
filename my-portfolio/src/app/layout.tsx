import Background from '@/components/Background';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const poppins = Poppins({ weight: ['300', '400', '500', '600', '700'], subsets: ['latin'] });

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
      <body className={poppins.className}>
        <Background />
        {children}
        <Analytics />
        <SpeedInsights />
        </body>
    </html>
  );
}