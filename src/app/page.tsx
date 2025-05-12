import type { Metadata } from 'next';
import { PasswordChecker } from '@/components/password-checker';

export const metadata: Metadata = {
  title: 'PassCheck - Password Strength Analyzer',
  description: 'Analyze the strength of your passwords with PassCheck. Get instant feedback and suggestions to create stronger, more secure passwords.',
};

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-background to-secondary">
      <PasswordChecker />
    </main>
  );
}
