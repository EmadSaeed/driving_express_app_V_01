import { getSeoMetadata } from '@/lib/seo-config';
import HeroCarousel from '@/components/layout/HeroCarousel/HeroCarousel';
import SevenPostsSection from '@/components/layout/SevenPostsSection/SevenPostsSection';
import VerticalSlider from '@/components/layout/VerticalSlider/VerticalSlider'
import Link from 'next/link';
import NewsCard from '@/components/layout/NewsCard';

export const metadata = getSeoMetadata({
  title: 'Home | Driving Express',
  description: 'Welcome to the Next.js Featured starter template',
});

export default function Home() {
  return (
    <div>
      {/* <HeroCarousel /> */}
      <SevenPostsSection />
      <VerticalSlider />
      <SevenPostsSection />
    </div>
  );
}