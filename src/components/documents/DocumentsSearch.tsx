
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface DocumentsSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const DocumentsSearch = ({ searchTerm, onSearchChange }: DocumentsSearchProps) => {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        placeholder="Søk i dokumenter..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 text-gray-900 placeholder:text-gray-500"
      />
    </div>
  );
};

export default DocumentsSearch;
