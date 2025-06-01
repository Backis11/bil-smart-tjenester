
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import DocumentUploadDialog from "./DocumentUploadDialog";

interface DocumentsHeaderProps {
  documentsCount: number;
  onUpload: (
    file: File,
    carId: string,
    documentData: {
      title: string;
      description?: string;
      document_type: string;
      document_date?: string;
      workshop_name?: string;
    }
  ) => Promise<boolean>;
  uploading: boolean;
}

const DocumentsHeader = ({ documentsCount, onUpload, uploading }: DocumentsHeaderProps) => {
  if (documentsCount === 0) {
    return (
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Mine dokumenter</h1>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Mine dokumenter</h1>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <DocumentUploadDialog 
          onUpload={onUpload} 
          uploading={uploading}
        />
        
        <Button variant="outline" className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4" />
          <span>Forespør dokumentasjon fra verksted</span>
        </Button>
      </div>
    </div>
  );
};

export default DocumentsHeader;
