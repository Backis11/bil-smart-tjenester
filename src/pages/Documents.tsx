
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MessageSquare } from "lucide-react";
import Header from "@/components/Header";
import { useDocuments } from "@/hooks/useDocuments";
import DocumentUploadDialog from "@/components/documents/DocumentUploadDialog";
import DocumentCard from "@/components/documents/DocumentCard";
import EmptyDocumentsState from "@/components/documents/EmptyDocumentsState";

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { 
    documents, 
    loading, 
    uploading, 
    uploadDocument, 
    downloadDocument, 
    deleteDocument 
  } = useDocuments();

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.document_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.workshop_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.car?.make?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.car?.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.car?.license_plate?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-500">Laster dokumenter...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Mine dokumenter</h1>
          
          {documents.length > 0 && (
            <>
              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 mb-6">
                <DocumentUploadDialog 
                  onUpload={uploadDocument} 
                  uploading={uploading}
                />
                
                <Button variant="outline" className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Forespør dokumentasjon fra verksted</span>
                </Button>
              </div>
              
              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Søk i dokumenter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-gray-900 placeholder:text-gray-500"
                />
              </div>
            </>
          )}
        </div>

        {/* Content */}
        {documents.length === 0 ? (
          <EmptyDocumentsState onUploadClick={() => {}} />
        ) : (
          <>
            {/* Documents grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDocuments.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  onDownload={downloadDocument}
                  onDelete={deleteDocument}
                />
              ))}
            </div>
            
            {filteredDocuments.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ingen dokumenter funnet</h3>
                <p className="text-gray-600">Prøv å justere søket ditt eller last opp nye dokumenter.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Documents;
