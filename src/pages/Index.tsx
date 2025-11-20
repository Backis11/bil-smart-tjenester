
import { useAuth } from "@/contexts/MockAuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceCards from "@/components/ServiceCards";
import UserCarsSection from "@/components/UserCarsSection";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  const { user } = useAuth();

  // If user is logged in, show service cards with user's cars section
  if (user) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <UserCarsSection />
          <ServiceCards />
        </div>
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
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
