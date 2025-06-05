
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
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <Wrench className="h-16 w-16 text-blue-500" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Din digitale <span className="text-blue-500">bilmappa</span>
          </h1>
          <p className="text-xl text-gray-600 mb-2 max-w-2xl mx-auto">
            Dokumenter bilens historie og få verdi ved salg
          </p>
          <p className="text-lg text-green-600 font-semibold mb-8">
            Helt gratis!
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Søk etter verksted, by eller tjeneste..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-8">
                Søk
              </Button>
            </form>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="outline" size="lg" asChild>
              <Link to="/auth">
                <FileText className="h-4 w-4 mr-2" />
                Start din bilmappa
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/auth">
                <Users className="h-4 w-4 mr-2" />
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
