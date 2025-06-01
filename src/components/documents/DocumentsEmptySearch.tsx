
import { Search } from "lucide-react";

const DocumentsEmptySearch = () => {
  return (
    <div className="text-center py-12">
      <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen dokumenter funnet</h3>
      <p className="text-gray-600">Prøv å justere søket ditt eller last opp nye dokumenter.</p>
    </div>
  );
};

export default DocumentsEmptySearch;
