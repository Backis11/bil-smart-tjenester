
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCards from "@/components/ServiceCards";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FeaturedWorkshopsSection from "@/components/home/FeaturedWorkshopsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  const { user } = useAuth();

  // If user is logged in, show service cards
  if (user) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <ServiceCards />
        <Footer />
      </div>
    );
  }

  // If user is not logged in, show the original landing page
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <FeaturedWorkshopsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
