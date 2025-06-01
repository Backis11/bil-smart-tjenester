
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Document {
  id: string;
  car_id: string;
  title: string;
  description?: string;
  document_type: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  storage_path: string;
  upload_date: string;
  document_date?: string;
  workshop_name?: string;
  status: string;
  car?: {
    make: string;
    model: string;
    year: number;
    license_plate: string;
  };
}

export const useDocuments = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchDocuments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('documents')
        .select(`
          *,
          car:cars(make, model, year, license_plate)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setDocuments(data || []);
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
    documentData: {
      title: string;
      description?: string;
      document_type: string;
      document_date?: string;
      workshop_name?: string;
    }
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
      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${user.id}/${carId}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('bilmappa-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Save document metadata to database
      const { data: documentRecord, error: dbError } = await supabase
        .from('documents')
        .insert({
          car_id: carId,
          title: documentData.title,
          description: documentData.description,
          document_type: documentData.document_type,
          file_name: file.name,
          file_size: file.size,
          mime_type: file.type,
          storage_path: uploadData.path,
          document_date: documentData.document_date,
          workshop_name: documentData.workshop_name
        })
        .select()
        .single();

      if (dbError) throw dbError;

      toast({
        title: "Dokument lastet opp",
        description: "Dokumentet er nå lagret for bilen din"
      });

      fetchDocuments();
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
      const { data, error } = await supabase.storage
        .from('bilmappa-files')
        .download(document.storage_path);

      if (error) throw error;

      // Create download link using window.document instead of document
      const url = URL.createObjectURL(data);
      const link = window.document.createElement('a');
      link.href = url;
      link.download = document.file_name;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      URL.revokeObjectURL(url);
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
      const { error } = await supabase
        .from('documents')
        .update({ status: 'archived' })
        .eq('id', documentId);

      if (error) throw error;

      toast({
        title: "Dokument slettet",
        description: "Dokumentet er fjernet fra listen"
      });

      fetchDocuments();
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
