
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Wrench, 
  Users,
  FileText 
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
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-20 lg:py-32 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-300/20 rounded-full blur-lg animate-pulse delay-500"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl">
              <Wrench className="h-16 w-16 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-8 leading-tight">
            Din digitale <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">bilmappe</span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto font-medium">
            Hold orden på bilens viktige dokumenter - enkelt, sikkert og gratis.
          </p>
          
          {/* Enhanced CTAs with modern styling */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105" asChild>
              <Link to="/auth">
                <FileText className="h-5 w-5 mr-3" />
                Se din bilmappe
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 font-semibold px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105" asChild>
              <Link to="/auth">
                <Users className="h-5 w-5 mr-3" />
                Logg inn
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
