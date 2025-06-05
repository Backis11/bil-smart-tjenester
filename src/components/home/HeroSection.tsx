
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Wrench, 
  Users,
  FileText,
  Shield,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 py-20 lg:py-32 overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      {/* Floating shapes - more subtle */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-slate-300/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300/10 rounded-full blur-lg animate-pulse delay-500"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            {/* Trust indicators */}
            <div className="flex justify-center lg:justify-start items-center gap-3 mb-8">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <Shield className="h-5 w-5 text-green-400" />
                <span className="text-white text-sm font-medium">Sikker og trygg</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-white text-sm font-medium">100% gratis</span>
              </div>
            </div>

            <div className="flex justify-center lg:justify-start mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl">
                <Wrench className="h-12 w-12 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Din digitale <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">bilmappe</span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-200 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Hold orden på bilens viktige dokumenter på ett trygt sted. Komplett oversikt over service, reparasjoner og bilens historie.
            </p>
            
            {/* Enhanced CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105" asChild>
                <Link to="/auth">
                  <FileText className="h-5 w-5 mr-3" />
                  Start din bilmappe
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 font-semibold px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105" asChild>
                <Link to="/auth">
                  <Users className="h-5 w-5 mr-3" />
                  Logg inn
                </Link>
              </Button>
            </div>

            {/* Trust elements */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start text-slate-300 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>GDPR-godkjent</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Sikker lagring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Alltid gratis</span>
              </div>
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Main illustration container */}
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
                {/* Document stack illustration */}
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 shadow-lg transform rotate-2">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <div className="h-3 bg-gray-200 rounded flex-1"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                      <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-lg transform -rotate-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Wrench className="h-6 w-6 text-green-600" />
                      <div className="h-3 bg-gray-200 rounded flex-1"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-100 rounded w-2/3"></div>
                      <div className="h-2 bg-gray-100 rounded w-3/4"></div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4 shadow-lg transform rotate-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="h-6 w-6 text-purple-600" />
                      <div className="h-3 bg-gray-200 rounded flex-1"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-100 rounded w-full"></div>
                      <div className="h-2 bg-gray-100 rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements around illustration */}
              <div className="absolute -top-4 -right-4 bg-green-500 rounded-full p-3 shadow-lg animate-bounce">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500 rounded-full p-3 shadow-lg animate-pulse">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
