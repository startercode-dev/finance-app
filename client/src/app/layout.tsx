import type { Metadata } from 'next';
import { Red_Hat_Display, Red_Hat_Mono } from 'next/font/google';
import './globals.css';

const sans = Red_Hat_Display({ subsets: ['latin'], variable: '--font-sans' });
const mono = Red_Hat_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${sans.variable} ${mono.variable} bg-white font-sans`}>
        {children}
      </body>
    </html>
  );
}