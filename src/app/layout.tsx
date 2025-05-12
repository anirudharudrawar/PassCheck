import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
// Not importing GeistMono to avoid previous "Module not found" errors.
// Tailwind's font-mono will fall back to system defaults if --font-geist-mono is not set.
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'PassCheck - Password Strength Analyzer',
  description: 'Analyze the strength of your passwords with PassCheck. Get instant feedback and suggestions to create stronger, more secure passwords.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(GeistSans.variable, 'dark')} suppressHydrationWarning>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
