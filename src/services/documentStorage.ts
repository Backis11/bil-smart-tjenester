
import { supabase } from "@/integrations/supabase/client";

export const uploadFileToStorage = async (file: File, filePath: string) => {
  console.log('Uploading file to path:', filePath);

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
  return uploadData;
};

export const downloadFileFromStorage = async (storagePath: string, fileName: string) => {
  console.log('Downloading document from path:', storagePath);
  
  const { data, error } = await supabase.storage
    .from('bilmappa-files')
    .download(storagePath);

  if (error) {
    console.error('Download error:', error);
    throw error;
  }

  // Create download link
  const url = URL.createObjectURL(data);
  const link = window.document.createElement('a');
  link.href = url;
  link.download = fileName;
  window.document.body.appendChild(link);
  link.click();
  window.document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const deleteFileFromStorage = async (storagePath: string) => {
  console.log('Deleting file from storage:', storagePath);
  const { error: storageError } = await supabase.storage
    .from('bilmappa-files')
    .remove([storagePath]);
  
  if (storageError) {
    console.warn('Could not delete file from storage:', storageError);
    // Don't throw error for storage cleanup failure
  }
};

export const getFileFromStorage = async (storagePath: string) => {
  console.log('Getting file from storage:', storagePath);
  
  const { data, error } = await supabase.storage
    .from('bilmappa-files')
    .download(storagePath);

  if (error) {
    console.error('Error getting file from storage:', error);
    throw error;
  }

  return data;
};
