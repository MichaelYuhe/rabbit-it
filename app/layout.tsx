import './globals.css';

import type { Metadata } from 'next';

import Footer from '@/components/footer';
import Header from '@/components/header';

export const metadata: Metadata = {
  title: 'rabbit it',
  description: 'Make your site into r1 with one click.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex h-screen w-screen flex-col bg-black">
        <Header />

        {children}

        <Footer />
      </body>
    </html>
  );
}
