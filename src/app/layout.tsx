import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import AuthManager from '@/components/auth/auth-manager';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'EGX Portfolio Tracker',
  description: 'Track your investments in the Egyptian stock market and gold.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased dark">
      <body className={`${inter.variable} font-body`}>
        <FirebaseClientProvider>
          <AuthManager>
            {children}
          </AuthManager>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
