
export interface Document {
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

export interface DocumentUploadData {
  title: string;
  description?: string;
  document_type: string;
  document_date?: string;
  workshop_name?: string;
}
