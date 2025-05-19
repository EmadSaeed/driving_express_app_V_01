'use client';

import { PageLoader } from '@/components/ui/page-loader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

export default function FeaturesPage() {
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "Features Page Loaded",
      description: "You've navigated to the features page. This is a demo toast notification.",
    });
  }, [toast]);
  
  return (
    <>
      <PageLoader />
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Features</h1>
          <p className="text-muted-foreground">
            Explore the powerful features of our Next.js starter template.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{feature.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

const features = [
  {
    title: 'Tailwind CSS',
    description: 'Utility-first CSS framework',
    content: 'Build beautiful interfaces without writing custom CSS. Tailwind provides low-level utility classes to build completely custom designs.'
  },
  {
    title: 'Shadcn UI',
    description: 'Beautifully designed components',
    content: 'A collection of re-usable components built using Radix UI and Tailwind CSS. Accessible, customizable, and open source.'
  },
  {
    title: 'Page Transitions',
    description: 'Smooth page animations',
    content: 'Enhance user experience with subtle page transition animations powered by Framer Motion, making navigation feel smooth and polished.'
  },
  {
    title: 'Dark Mode',
    description: 'Light and dark theme support',
    content: 'Built-in theme switching capabilities using next-themes, offering users their preferred color scheme across the entire application.'
  },
  {
    title: 'Dynamic SEO',
    description: 'Config-based metadata',
    content: 'Easily manage SEO metadata through a centralized, configuration-based approach for consistent and optimized search engine visibility.'
  },
  {
    title: 'Toast Notifications',
    description: 'User feedback system',
    content: 'Keep users informed with a robust toast notification system, providing feedback for actions and events within the application.'
  },
  {
    title: 'Responsive Layout',
    description: 'Mobile-first design',
    content: 'Fully responsive layout with a sidebar, header, and main content area, ensuring optimal viewing experience across all device sizes.'
  },
  {
    title: 'Type Safety',
    description: 'TypeScript integration',
    content: 'Built with TypeScript for enhanced developer experience, providing better code completion, type checking, and error prevention.'
  },
  {
    title: 'Code Organization',
    description: 'Well-structured codebase',
    content: 'Organized file structure following best practices for Next.js applications, making it easy to scale and maintain your project.'
  }
];