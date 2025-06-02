
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import type { Document, DocumentUploadData } from "@/types/document";
import { validateDocumentFile, createFilePath } from "@/utils/documentValidation";
import { uploadFileToStorage, downloadFileFromStorage, deleteFileFromStorage } from "@/services/documentStorage";
import { fetchDocumentsFromDatabase, saveDocumentToDatabase, archiveDocumentInDatabase } from "@/services/documentDatabase";

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchDocuments = async () => {
    if (!user) return;

    try {
      console.log('Fetching documents for user:', user.id);
      const data = await fetchDocumentsFromDatabase();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast({
        title: "Feil",
        description: "Kunne ikke hente dokumenter",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadDocument = async (
    file: File,
    carId: string,
    documentData: DocumentUploadData
  ) => {
    if (!user) {
      toast({
        title: "Feil",
        description: "Du må være logget inn for å laste opp dokumenter",
        variant: "destructive"
      });
      return false;
    }

    setUploading(true);

    try {
      // Validate file
      validateDocumentFile(file);

      // Create file path following the pattern expected by storage policies
      const filePath = createFilePath(user.id, carId, file.name);

      // Upload file to storage
      const uploadData = await uploadFileToStorage(file, filePath);

      // Save document metadata to database
      await saveDocumentToDatabase(carId, file, uploadData.path, documentData);

      toast({
        title: "Dokument lastet opp",
        description: "Dokumentet er nå lagret for bilen din"
      });

      await fetchDocuments();
      return true;
    } catch (error) {
      console.error('Error uploading document:', error);
      
      let errorMessage = "Kunne ikke laste opp dokumentet";
      if (error instanceof Error) {
        if (error.message.includes('row-level security')) {
          errorMessage = "Du har ikke tilgang til å laste opp dokumenter for denne bilen";
        } else if (error.message.includes('storage')) {
          errorMessage = "Feil ved opplasting av fil. Prøv igjen.";
        } else if (error.message.includes('Fil for stor') || error.message.includes('Ugyldig filtype')) {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Feil ved opplasting",
        description: errorMessage,
        variant: "destructive"
      });
      return false;
    } finally {
      setUploading(false);
    }
  };

  const downloadDocument = async (document: Document) => {
    try {
      await downloadFileFromStorage(document.storage_path, document.file_name);
    } catch (error) {
      console.error('Error downloading document:', error);
      toast({
        title: "Feil ved nedlasting",
        description: "Kunne ikke laste ned dokumentet",
        variant: "destructive"
      });
    }
  };

  const deleteDocument = async (documentId: string) => {
    try {
      console.log('Deleting document:', documentId);
      
      // Find the document to get storage path for cleanup
      const documentToDelete = documents.find(doc => doc.id === documentId);
      
      // Mark document as archived in database
      await archiveDocumentInDatabase(documentId);

      // Delete file from storage
      if (documentToDelete?.storage_path) {
        await deleteFileFromStorage(documentToDelete.storage_path);
      }

      toast({
        title: "Dokument slettet",
        description: "Dokumentet er fjernet fra listen"
      });

      await fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: "Feil",
        description: "Kunne ikke slette dokumentet",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [user]);

  return {
    documents,
    loading,
    uploading,
    uploadDocument,
    downloadDocument,
    deleteDocument,
    refetch: fetchDocuments
  };
};
