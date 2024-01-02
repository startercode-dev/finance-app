import type { Metadata } from 'next';
import { Notable, Gantari } from 'next/font/google';
import './globals.css';

const sans = Gantari({
  subsets: ['latin'],
  variable: '--font-sans',
});
const title = Notable({
  subsets: ['latin'],
  variable: '--font-title',
  weight: ['400'],
});

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
      <body className={`${sans.variable} ${title.variable} bg-white font-sans`}>
        {children}
      </body>
    </html>
  );
}
