
import { useState, useRef, useEffect } from "react";
import { User, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

interface UserMenuProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onNotificationClose: () => void;
}

const UserMenu = ({ isOpen, setIsOpen, onNotificationClose }: UserMenuProps) => {
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

  return (
    <div className="relative" ref={userMenuRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          onNotificationClose();
        }}
        className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors"
      >
        JD
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
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
            <Link
              to="/auth"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <LogOut className="h-4 w-4 mr-3" />
              Logg ut
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
