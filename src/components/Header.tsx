
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Wrench, 
  Bell, 
  User, 
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: "Nytt dokument",
      message: "Verksted X har lastet opp et nytt dokument",
      time: "2 timer siden",
      unread: true
    },
    {
      id: 2,
      title: "Verdivurdering klar",
      message: "Du har fått en ny verdivurdering på din Toyota Corolla",
      time: "1 dag siden",
      unread: true
    },
    {
      id: 3,
      title: "Service påminnelse",
      message: "Det er snart tid for service på din Volkswagen Golf",
      time: "3 dager siden",
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <Wrench className="h-8 w-8 text-blue-500" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">Wrench</h1>
              <p className="text-xs text-gray-500">din digitale bilmappe</p>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Søk etter verksted eller tjeneste..."
                className="pl-10 pr-4 text-gray-900 placeholder:text-gray-500 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => {
                  setIsNotificationOpen(!isNotificationOpen);
                  setIsUserMenuOpen(false);
                }}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-red-500 hover:bg-red-500 p-0 flex items-center justify-center">
                    {unreadCount}
                  </Badge>
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Varsler</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                          notification.unread ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {notification.time}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  setIsUserMenuOpen(!isUserMenuOpen);
                  setIsNotificationOpen(false);
                }}
                className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
              >
                JD
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <User className="h-4 w-4 mr-3" />
                      Min profil
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="h-4 w-4 mr-3" />
                      Innstillinger
                    </a>
                    <div className="border-t border-gray-100"></div>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logg ut
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Søk etter verksted eller tjeneste..."
                  className="pl-10 pr-4 text-gray-900 placeholder:text-gray-500 bg-gray-50 border-gray-300"
                />
              </div>
              
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
      </div>
    </header>
  );
};

export default Header;
