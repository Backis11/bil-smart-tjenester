
import { Bell, User, Settings, LogOut, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SearchBar from "./SearchBar";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  showSearchBar: boolean;
  isNotificationOpen: boolean;
  setIsNotificationOpen: (open: boolean) => void;
}

const MobileMenu = ({ 
  isOpen, 
  setIsOpen, 
  showSearchBar, 
  isNotificationOpen, 
  setIsNotificationOpen 
}: MobileMenuProps) => {
  const unreadCount = 2; // This should come from props or context in a real app

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const searchTerm = (e.target as HTMLInputElement).value;
      if (searchTerm.trim()) {
        window.location.href = `/services?search=${encodeURIComponent(searchTerm)}`;
      }
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Search - Only show if not on homepage */}
            {showSearchBar && (
              <SearchBar onKeyDown={handleSearchKeyDown} />
            )}
            
            {/* Mobile Notifications */}
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="flex items-center w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <Bell className="h-5 w-5 mr-3" />
              <span>Varsler</span>
              {unreadCount > 0 && (
                <Badge className="ml-auto h-5 w-5 text-xs bg-red-500 hover:bg-red-500 p-0 flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </button>

            {/* Mobile User Options */}
            <div className="border-t border-gray-200 pt-2">
              <a
                href="#"
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <User className="h-5 w-5 mr-3" />
                Min profil
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <Settings className="h-5 w-5 mr-3" />
                Innstillinger
              </a>
              <a
                href="#"
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Logg ut
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
