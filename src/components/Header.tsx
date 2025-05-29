
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wrench, User, Building2 } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const isWorkshopArea = location.pathname.startsWith('/workshop');
  
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Wrench className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Wrench</h1>
              <p className="text-xs text-gray-500">din digitale bilmappe</p>
            </div>
          </Link>
          
          <nav className="flex items-center space-x-4">
            {!isWorkshopArea ? (
              <>
                <Link to="/services">
                  <Button variant="ghost" size="sm">
                    Finn verksted
                  </Button>
                </Link>
                <Link to="/valuation">
                  <Button variant="ghost" size="sm">
                    Verdivurdering
                  </Button>
                </Link>
                <Link to="/workshop-login">
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <Building2 className="h-4 w-4" />
                    <span>Verksted</span>
                  </Button>
                </Link>
                <Button size="sm" className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>Logg inn</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/">
                  <Button variant="ghost" size="sm">
                    Til kundeområde
                  </Button>
                </Link>
                <Button size="sm" className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>Logg ut</span>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
