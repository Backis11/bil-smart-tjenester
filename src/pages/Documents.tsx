
import { useState } from "react";
import Header from "@/components/Header";
import { useDocuments } from "@/hooks/useDocuments";
import DocumentsHeader from "@/components/documents/DocumentsHeader";
import DocumentsSearch from "@/components/documents/DocumentsSearch";
import DocumentsGrid from "@/components/documents/DocumentsGrid";
import DocumentsEmptySearch from "@/components/documents/DocumentsEmptySearch";
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
        <DocumentsHeader 
          documentsCount={documents.length}
          onUpload={uploadDocument}
          uploading={uploading}
        />

        {documents.length > 0 && (
          <DocumentsSearch 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
        )}

        {documents.length === 0 ? (
          <EmptyDocumentsState onUploadClick={() => {}} />
        ) : (
          <>
            <DocumentsGrid
              documents={filteredDocuments}
              onDownload={downloadDocument}
              onDelete={deleteDocument}
            />
            
            {filteredDocuments.length === 0 && searchTerm && (
              <DocumentsEmptySearch />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Documents;
