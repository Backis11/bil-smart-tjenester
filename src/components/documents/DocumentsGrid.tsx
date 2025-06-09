
import DocumentCard from "./DocumentCard";

interface Document {
  id: string;
  title: string;
  description?: string;
  document_type: string;
  file_name: string;
  file_size: number;
  upload_date: string;
  document_date?: string;
  workshop_name?: string;
  car?: {
    make: string;
    model: string;
    year: number;
    license_plate: string;
  };
}

interface DocumentsGridProps {
  documents: Document[];
  onDownload: (document: Document) => void;
  onDelete: (documentId: string) => void;
  onView: (document: Document) => void;
}

const DocumentsGrid = ({ documents, onDownload, onDelete, onView }: DocumentsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((document) => (
        <DocumentCard
          key={document.id}
          document={document}
          onDownload={onDownload}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </div>
  );
};

export default DocumentsGrid;
