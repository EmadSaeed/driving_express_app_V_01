import './styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';

import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { PageTransition } from '@/components/ui/page-transition';
import { GA4 } from '@/components/analytics';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NextJS Featured starter Template',
  description: 'Features: Tailwind CSS, Google analytics, Page loader animation, Dynamic Head component | SEO, Responsive Navbar, Footer, Font setup, EsLint',
  keywords:
    'Tailwind CSS, Next.js, Google Analytics, Page Loader Animation, Dynamic Head Component',
  openGraph: {
    title: 'NextJS Featured Starter Template',
    description: 'Features: Tailwind CSS, Google Analytics, Page loader animation, Dynamic Head component | SEO, Responsive Navbar, Footer, Font setup, EsLint',
    url: process.env.NEXT_PUBLIC_APP_URL,
    type: 'website'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex flex-1">
              <Sidebar />
              <main className="flex-1 overflow-y-auto">
                <PageTransition>
                  <div className="container mx-auto py-6 px-4 md:px-6">
                    {children}
                  </div>
                </PageTransition>
              </main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
        <GA4 />
      </body>
    </html>
  );
}