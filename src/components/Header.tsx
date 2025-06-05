
import { useState, useEffect } from "react";
import { Wrench } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import SearchBar from "./header/SearchBar";
import NotificationDropdown from "./header/NotificationDropdown";
import UserMenu from "./UserMenu";
import MobileMenu from "./header/MobileMenu";

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = event.target as Element;
        const mobileMenuButton = target.closest('[data-mobile-menu]');
        const mobileMenu = target.closest('[data-mobile-menu-content]');
        
        if (!mobileMenuButton && !mobileMenu) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Show search bar when user is logged in OR when not on homepage
  const showSearchBar = !!user || location.pathname !== '/';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <Wrench className="h-8 w-8 text-blue-500" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Bilmappa</h1>
              <p className="text-xs text-gray-500">alt om bilen din på ett sted</p>
            </div>
          </Link>

          {/* Desktop Search - Only visible on desktop and when conditions are met */}
          {showSearchBar && (
            <div className="hidden lg:flex flex-1 max-w-lg mx-8">
              <SearchBar className="w-full" />
            </div>
          )}

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <>
                <NotificationDropdown
                  isOpen={isNotificationOpen}
                  setIsOpen={setIsNotificationOpen}
                  onUserMenuClose={() => setIsUserMenuOpen(false)}
                />
                <UserMenu
                  isOpen={isUserMenuOpen}
                  setIsOpen={setIsUserMenuOpen}
                  onNotificationClose={() => setIsNotificationOpen(false)}
                />
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" asChild className="text-gray-600 hover:text-gray-900">
                  <Link to="/auth?tab=login">Logg inn</Link>
                </Button>
                <Button size="sm" asChild className="bg-gray-900 hover:bg-gray-800 text-white">
                  <Link to="/auth?tab=register">Registrer deg</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div data-mobile-menu>
            <MobileMenu
              isOpen={isMobileMenuOpen}
              setIsOpen={setIsMobileMenuOpen}
              showSearchBar={showSearchBar}
              isNotificationOpen={isNotificationOpen}
              setIsNotificationOpen={setIsNotificationOpen}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
