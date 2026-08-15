import type { Metadata } from 'next';
import { Cinzel } from 'next/font/google';
import './globals.css';

// Cinzel loaded once — applied only where explicitly used via font-cinzel class
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  // Variable name matches the CSS var used in globals.css
  variable: '--font-cinzel-loaded',
});

export const metadata: Metadata = {
  title: 'HORIZON — Architectural Residences',
  description: 'An architectural landmark of luxury, precision, and permanence.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply cinzel variable to html; body defaults to Helvetica from globals.css
    <html lang="en" className={cinzel.variable}>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
