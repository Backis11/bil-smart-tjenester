
import { Bell, User, Settings, LogOut, Menu, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const unreadCount = 2; // This should come from props or context in a real app

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logget ut",
        description: "Du er nå logget ut av systemet",
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Feil ved utlogging",
        description: "Noe gikk galt, prøv igjen",
        variant: "destructive",
      });
    }
  };

  const getInitials = () => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name[0]}${user.user_metadata.last_name[0]}`.toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || "U";
  };

  const getDisplayName = () => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`;
    }
    return user?.email || "Bruker";
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
        <div className="md:hidden absolute top-16 left-0 right-0 border-t border-gray-200 bg-white shadow-lg z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* User info section if logged in */}
            {user && (
              <div className="px-3 py-3 border-b border-gray-200 mb-2">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full font-semibold text-sm">
                    {getInitials()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{getDisplayName()}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Search - Only show if not on homepage */}
            {showSearchBar && (
              <div className="px-3 py-2">
                <SearchBar />
              </div>
            )}
            
            {user ? (
              <>
                {/* Mobile Notifications */}
                <button
                  onClick={() => {
                    setIsNotificationOpen(!isNotificationOpen);
                    setIsOpen(false);
                  }}
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
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-5 w-5 mr-3" />
                    Min profil
                  </Link>
                  <Link
                    to="/settings"
                    className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    Innstillinger
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logg ut
                  </button>
                </div>
              </>
            ) : (
              /* Mobile Login/Register buttons */
              <div className="space-y-2 px-3 py-2">
                <Button variant="ghost" asChild className="w-full justify-start">
                  <Link to="/auth?tab=login" onClick={() => setIsOpen(false)}>
                    Logg inn
                  </Link>
                </Button>
                <Button asChild className="w-full">
                  <Link to="/auth?tab=register" onClick={() => setIsOpen(false)}>
                    Registrer deg
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
