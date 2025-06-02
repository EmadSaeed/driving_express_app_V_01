import './styles/globals.css';
import type { Metadata } from 'next';
import { Jost } from 'next/font/google';

import { ThemeProvider } from '@/providers/theme-provider';
import { Toaster } from '@/components/ui/toaster';

import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { Footer } from '@/components/layout/footer';
import { PageTransition } from '@/components/ui/page-transition';
import { GA4 } from '@/components/analytics';
import ScrollToTop from '@/components/ScrollToTop';

const jost = Jost({ subsets: ['latin'] });

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
      <body className={`${jost.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-screen flex-col bg-[#F6F6F6] dark:bg-background">
            <Header />
            <div className="flex flex-1">
              <main className="flex-1 overflow-y-auto">
                <PageTransition>
                  <div className="w-full mx-auto md:px-0">
                    {children}
                    <ScrollToTop />

                  </div>
                </PageTransition>
              </main>
            </div>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
        <GA4 />
      </body>
    </html>
  );
}