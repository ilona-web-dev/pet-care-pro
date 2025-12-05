import HeroSection from '../components/sections/HeroSection';
import ServiceSection from '../components/sections/ServiceSection';

export default function Home() {
  return (
    <div className="space-y-24 py-8">
      <HeroSection />
      <ServiceSection />
    </div>
  );
}
