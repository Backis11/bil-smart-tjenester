
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ 
  placeholder = "Søk etter verksted eller tjeneste...", 
  className = "",
  onKeyDown 
}: SearchBarProps) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <Input
        placeholder={placeholder}
        className="pl-10 pr-4 text-gray-900 placeholder:text-gray-500 bg-gray-50 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default SearchBar;
