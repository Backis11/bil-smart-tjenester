
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
      console.log('Fetching documents for user:', user.id);
      
      const { data, error } = await supabase
        .from('documents')
        .select(`
          *,
          car:cars(make, model, year, license_plate)
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching documents:', error);
        throw error;
      }

      console.log('Fetched documents:', data);
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
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('Fil for stor. Maksimal størrelse er 10MB.');
      }

      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/jpg', 
        'image/png',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Ugyldig filtype. Støttede typer: PDF, JPG, PNG, DOC, DOCX');
      }

      // Create file path following the pattern expected by storage policies
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${user.id}/${carId}/${fileName}`;

      console.log('Uploading file to path:', filePath);

      // Upload file to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('bilmappa-files')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Storage upload error:', uploadError);
        throw uploadError;
      }

      console.log('File uploaded successfully:', uploadData);

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

      if (dbError) {
        console.error('Database insert error:', dbError);
        // Clean up uploaded file if database insert fails
        await supabase.storage
          .from('bilmappa-files')
          .remove([uploadData.path]);
        throw dbError;
      }

      console.log('Document record created:', documentRecord);

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
      console.log('Downloading document from path:', document.storage_path);
      
      const { data, error } = await supabase.storage
        .from('bilmappa-files')
        .download(document.storage_path);

      if (error) {
        console.error('Download error:', error);
        throw error;
      }

      // Create download link
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
      console.log('Deleting document:', documentId);
      
      // Find the document to get storage path for cleanup
      const documentToDelete = documents.find(doc => doc.id === documentId);
      
      // Mark document as archived in database
      const { error } = await supabase
        .from('documents')
        .update({ status: 'archived' })
        .eq('id', documentId);

      if (error) {
        console.error('Database delete error:', error);
        throw error;
      }

      // Delete file from storage
      if (documentToDelete?.storage_path) {
        const { error: storageError } = await supabase.storage
          .from('bilmappa-files')
          .remove([documentToDelete.storage_path]);
        
        if (storageError) {
          console.warn('Could not delete file from storage:', storageError);
          // Don't throw error for storage cleanup failure
        }
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
