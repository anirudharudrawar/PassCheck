import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter as an example, Geist is better if available
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'PassCheck',
  description: 'Check your password strength.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        GeistSans.variable,
        GeistMono.variable
      )}>
        {children}
      </body>
    </html>
  );
}
