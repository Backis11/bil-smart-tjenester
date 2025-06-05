
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M50 0l50 50-50 50L0 50z" fill="%23ffffff" fill-opacity="0.02"/%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-pink-400/20 rounded-full blur-lg animate-pulse delay-500"></div>
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
          Klar til å komme i gang?
        </h2>
        <p className="text-blue-100 text-xl mb-4 max-w-3xl mx-auto">
          Opprett din digitale bilmappa i dag og dokumenter bilens historie
        </p>
        <p className="text-yellow-300 font-bold text-lg mb-12">
          Helt gratis!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-blue-700 hover:bg-gray-100 font-bold px-10 py-5 text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
            asChild
          >
            <Link to="/auth">
              Start gratis bilmappa
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 font-bold px-10 py-5 text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105" 
            asChild
          >
            <Link to="/auth">
              Logg inn
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
