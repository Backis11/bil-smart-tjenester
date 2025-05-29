
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Wrench, Building2, Bell, Settings } from "lucide-react";

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
                
                {/* User logged in section */}
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
                  </Button>
                  
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt="Bruker" />
                      <AvatarFallback className="bg-blue-100 text-blue-600">JD</AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block">
                      <p className="text-sm font-medium text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-500">Toyota Corolla 2020</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/">
                  <Button variant="ghost" size="sm">
                    Til kundeområde
                  </Button>
                </Link>
                <Button size="sm" className="flex items-center space-x-1">
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
