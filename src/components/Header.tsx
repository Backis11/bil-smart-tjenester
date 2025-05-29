
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Wrench, Building2, Bell, Settings, FileText, DollarSign, Clock, User, LogOut } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const isWorkshopArea = location.pathname.startsWith('/workshop');
  
  const notifications = [
    {
      id: 1,
      title: "Nytt dokument fra Olsens Bil AS",
      description: "EU-kontroll rapport er lastet opp",
      time: "2 timer siden",
      type: "document",
      icon: FileText,
      unread: true
    },
    {
      id: 2,
      title: "Ny verdivurdering tilgjengelig",
      description: "Din Toyota Corolla 2020 har fått oppdatert verdi",
      time: "1 dag siden", 
      type: "valuation",
      icon: DollarSign,
      unread: true
    },
    {
      id: 3,
      title: "Service påminnelse",
      description: "EU-kontroll forfaller om 45 dager",
      time: "3 dager siden",
      type: "reminder",
      icon: Clock,
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;
  
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
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="relative">
                        <Bell className="h-4 w-4" />
                        {unreadCount > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {unreadCount}
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                      <DropdownMenuLabel>Varsler</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {notifications.map((notification) => (
                        <DropdownMenuItem key={notification.id} className="flex items-start space-x-3 p-3 cursor-pointer">
                          <div className={`p-2 rounded-full ${
                            notification.type === 'document' ? 'bg-blue-100' :
                            notification.type === 'valuation' ? 'bg-green-100' :
                            'bg-yellow-100'
                          }`}>
                            <notification.icon className={`h-4 w-4 ${
                              notification.type === 'document' ? 'text-blue-600' :
                              notification.type === 'valuation' ? 'text-green-600' :
                              'text-yellow-600'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <p className={`text-sm font-medium ${notification.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                                {notification.title}
                              </p>
                              {notification.unread && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{notification.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-center text-sm text-blue-600 cursor-pointer">
                        Se alle varsler
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  {/* User Menu with Settings */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="flex items-center space-x-2 p-1">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" alt="Bruker" />
                          <AvatarFallback className="bg-blue-100 text-blue-600">JD</AvatarFallback>
                        </Avatar>
                        <div className="hidden sm:block text-left">
                          <p className="text-sm font-medium text-gray-900">John Doe</p>
                          <p className="text-xs text-gray-500">Toyota Corolla 2020</p>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>Min konto</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profil</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Innstillinger</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Logg ut</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
