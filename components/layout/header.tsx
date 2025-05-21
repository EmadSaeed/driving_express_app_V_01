'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactClick = () => {
    toast({
      title: "Contact feature",
      description: "This would open a contact form in a real application.",
    });
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b transition-all duration-200",
      isScrolled ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-background"
    )}>
      <div className="flex h-16 items-center md:px-4 max-w-screen-xl mx-auto">
        <div className="mr-1 flex lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
        <div className="flex items-center space-x-4 w-full">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-[170px] h-[24px] md:w-[246px] md:h-[29px] dark:hidden">
              <Image
                src="/Driving-Express-logo.svg"
                alt="Driving Express Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="relative w-[170px] h-[24px] md:w-[246px] md:h-[29px] hidden dark:block">
              <Image
                src="/Driving-Express-logo-white.svg"
                alt="Driving Express Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>
          <nav className="hidden lg:flex justify-center items-center space-x-6 w-full">
            <Link href="/" className="nav-link dark:text-white text-md font-medium selected">
              Home
            </Link>
            <Link href="/features" className="nav-link dark:text-white text-md font-medium">
              Learner Hub
            </Link>
            <Link href="/features" className="nav-link dark:text-white text-md font-medium">
              Theory Test
            </Link>
            <Link href="/features" className="nav-link dark:text-white text-md font-medium">
              Hazard Perception
            </Link>
            <Link href="/features" className="nav-link dark:text-white text-md font-medium">
              News
            </Link>
            <Link href="/features" className="nav-link dark:text-white text-md font-medium">
              Tips & Tricks
            </Link>
          </nav>

        </div>
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={handleContactClick} className="border">
            Subscribe
          </Button>
          <ThemeToggle />
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t p-4 bg-background">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Pricing
            </Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}