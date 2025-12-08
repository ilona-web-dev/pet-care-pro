import HeroSection from '../components/sections/HeroSection';
import ServiceSection from '../components/sections/ServiceSection';
import TeamSection from '../components/sections/TeamSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';

export default function Home() {
  return (
    <div className="space-y-24 py-8">
      <HeroSection />
      <ServiceSection />
      <TeamSection />
      <TestimonialsSection />
    </div>
  );
}
