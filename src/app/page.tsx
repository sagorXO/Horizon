'use client';

import Navigation from '@/components/Navigation';
import HeroVideoScrub from '@/components/hero/HeroVideoScrub';
import VisionSection from '@/components/sections/VisionSection';
import ResidencesSection from '@/components/sections/ResidencesSection';
import AmenitiesSection from '@/components/sections/AmenitiesSection';
import GallerySection from '@/components/sections/GallerySection';
import LocationSection from '@/components/sections/LocationSection';
import ContactCTASection from '@/components/sections/ContactCTASection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main>
      <Navigation />
      <HeroVideoScrub />
      <VisionSection />
      <ResidencesSection />
      <AmenitiesSection />
      <GallerySection />
      <LocationSection />
      <ContactCTASection />
      <Footer />
    </main>
  );
}
