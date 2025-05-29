
import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

interface UserMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onNotificationClose: () => void;
}

const UserMenu = ({ isOpen, setIsOpen, onNotificationClose }: UserMenuProps) => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

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

  // Get user initials for avatar
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
    <div className="relative" ref={userMenuRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          onNotificationClose();
        }}
        className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
      >
        {getInitials()}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{getDisplayName()}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <div className="py-1">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <User className="h-4 w-4 mr-3" />
              Min profil
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="h-4 w-4 mr-3" />
              Innstillinger
            </Link>
            <div className="border-t border-gray-100"></div>
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logg ut
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
