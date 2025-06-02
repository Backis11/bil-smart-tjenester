
import { supabase } from "@/integrations/supabase/client";
import type { Document, DocumentUploadData } from "@/types/document";

export const fetchDocumentsFromDatabase = async (): Promise<Document[]> => {
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
  return data || [];
};

export const saveDocumentToDatabase = async (
  carId: string,
  file: File,
  storagePath: string,
  documentData: DocumentUploadData
) => {
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
      storage_path: storagePath,
      document_date: documentData.document_date,
      workshop_name: documentData.workshop_name
    })
    .select()
    .single();

  if (dbError) {
    console.error('Database insert error:', dbError);
    throw dbError;
  }

  console.log('Document record created:', documentRecord);
  return documentRecord;
};

export const archiveDocumentInDatabase = async (documentId: string) => {
  const { error } = await supabase
    .from('documents')
    .update({ status: 'archived' })
    .eq('id', documentId);

  if (error) {
    console.error('Database delete error:', error);
    throw error;
  }
};
