import { getSeoMetadata } from '@/lib/seo-config';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata = getSeoMetadata({
  title: 'Home | Next.js Starter Template',
  description: 'Welcome to the Next.js Featured starter template',
});

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Welcome to your Next.js Starter Template
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                A beautifully designed and feature-rich template to kickstart your Next.js projects.
              </p>
            </div>
            <div className="space-x-4">
              <Link href="/dashboard">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/features">
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-20">
        <div className="container px-4 md:px-6">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Everything you need to build beautiful, responsive web applications.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">{feature.content}</CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full">
                    Learn More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: 'Modern Design',
    description: 'Clean, intuitive interfaces built with Tailwind CSS',
    content: 'Our components are designed with a focus on usability and aesthetics, providing a seamless user experience.',
  },
  {
    title: 'SEO Optimized',
    description: 'Improve your site visibility with built-in SEO tools',
    content: 'Each page is automatically optimized for search engines with our configuration-based metadata system.',
  },
  {
    title: 'Responsive Layout',
    description: 'Looks great on any device, from mobile to desktop',
    content: 'Our flexible layout system ensures your application looks and works perfectly on screens of all sizes.',
  },
  {
    title: 'Dark Mode',
    description: 'Support for light and dark themes',
    content: 'Give your users the option to choose their preferred theme with our built-in theme switching capabilities.',
  },
  {
    title: 'Animations',
    description: 'Subtle animations for a more engaging experience',
    content: 'Enhance user interactions with smooth, tasteful animations that provide visual feedback and delight.',
  },
  {
    title: 'Component Library',
    description: 'Built with shadcn/ui components',
    content: 'Access a comprehensive set of accessible, customizable UI components to build any interface quickly.',
  },
];