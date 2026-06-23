
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturedEbooks from "@/components/FeaturedEbooks";
import TopWriters from "@/components/TopWriters";
import BrowseByGenre from "@/components/BrowseByGenre";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseFable from "@/components/WhyChooseFable";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturedEbooks />
        <TopWriters />
        <BrowseByGenre />
        <HowItWorks />
        <WhyChooseFable />
        <Testimonials />
        <CTASection />
      </main>
    </>
  );
}
