import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/MockAuthContext";
import type { Document, DocumentUploadData } from "@/types/document";

interface MockDocument extends Document {
  user_id: string;
  archived_at?: string;
}

const DOCUMENTS_STORAGE_KEY = 'mock_documents_data';

const getDocumentsFromStorage = (userId: string): Document[] => {
  const data = localStorage.getItem(DOCUMENTS_STORAGE_KEY);
  if (!data) return [];
  try {
    const allDocs: MockDocument[] = JSON.parse(data);
    return allDocs.filter(doc => doc.user_id === userId && !doc.archived_at);
  } catch (e) {
    return [];
  }
};

const saveDocumentToStorage = (document: MockDocument) => {
  const data = localStorage.getItem(DOCUMENTS_STORAGE_KEY);
  let allDocs: MockDocument[] = [];
  if (data) {
    try {
      allDocs = JSON.parse(data);
    } catch (e) {
      allDocs = [];
    }
  }
  
  allDocs.push(document);
  localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(allDocs));
};

const updateDocumentInStorage = (documentId: string, updates: Partial<MockDocument>) => {
  const data = localStorage.getItem(DOCUMENTS_STORAGE_KEY);
  if (!data) return;
  
  try {
    let allDocs: MockDocument[] = JSON.parse(data);
    const index = allDocs.findIndex(doc => doc.id === documentId);
    if (index >= 0) {
      allDocs[index] = { ...allDocs[index], ...updates };
      localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(allDocs));
    }
  } catch (e) {
    console.error('Error updating document:', e);
  }
};

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchDocuments = async () => {
    if (!user) {
      console.log('No user found when fetching documents');
      setLoading(false);
      return;
    }

    try {
      const docs = getDocumentsFromStorage(user.id);
      setDocuments(docs);
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
      // Convert file to base64
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const newDocument: MockDocument = {
        id: `doc_${Date.now()}`,
        user_id: user.id,
        car_id: carId,
        title: documentData.title,
        description: documentData.description,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type,
        storage_path: base64, // Store base64 directly
        document_type: documentData.document_type,
        document_date: documentData.document_date,
        workshop_name: documentData.workshop_name,
        upload_date: new Date().toISOString(),
        status: 'active'
      };

      saveDocumentToStorage(newDocument);

      toast({
        title: "Dokument lastet opp",
        description: "Dokumentet er nå lagret for bilen din"
      });

      await fetchDocuments();
      return true;
    } catch (error) {
      console.error('Error uploading document:', error);
      toast({
        title: "Feil ved opplasting",
        description: "Kunne ikke laste opp dokumentet",
        variant: "destructive"
      });
      return false;
    } finally {
      setUploading(false);
    }
  };

  const downloadDocument = async (document: Document) => {
    try {
      // For mock, we'll trigger download from base64
      const link = window.document.createElement('a');
      link.href = document.storage_path; // storage_path contains base64
      link.download = document.file_name;
      link.click();
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
      updateDocumentInStorage(documentId, {
        archived_at: new Date().toISOString()
      });

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
