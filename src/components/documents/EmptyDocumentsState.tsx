
import { Button } from "@/components/ui/button";
import { FileText, Upload, TrendingUp } from "lucide-react";

interface EmptyDocumentsStateProps {
  onUploadClick: () => void;
}

const EmptyDocumentsState = ({ onUploadClick }: EmptyDocumentsStateProps) => {
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-md mx-auto">
        <FileText className="h-16 w-16 text-gray-400 mx-auto mb-6" />
        <h3 className="text-xl font-semibold text-gray-900 mb-3">
          Ingen dokumenter ennå
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Last opp all bilrelatert dokumentasjon på ett sted. Dette øker verdien av bilen din og gir deg full oversikt over servicehistorikk.
        </p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
          <h4 className="font-medium text-blue-900 mb-2 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            Fordeler med komplett dokumentasjon:
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Høyere videresalgsverdi</li>
            <li>• Enklere forsikringsoppgjør</li>
            <li>• Komplett servicehistorikk</li>
            <li>• Dokumentene følger bilen ved salg</li>
          </ul>
        </div>

        <Button onClick={onUploadClick} size="lg" className="flex items-center space-x-2">
          <Upload className="h-5 w-5" />
          <span>Last opp første dokument</span>
        </Button>
        
        <p className="text-sm text-gray-500 mt-4">
          Støttede filtyper: PDF, JPG, PNG, DOC, DOCX
        </p>
      </div>
    </div>
  );
};

export default EmptyDocumentsState;
