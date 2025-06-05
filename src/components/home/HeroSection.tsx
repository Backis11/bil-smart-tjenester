
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
            Hold orden på bilens viktige dokumenter - enkelt, sikkert og gratis.
          </p>
          <p className="text-lg text-green-600 font-semibold mb-8">
            Helt gratis!
          </p>
          
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
