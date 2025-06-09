
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Calendar, Car, Building2, FileText, X } from "lucide-react";
import { useState, useEffect } from "react";

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
  storage_path: string;
  mime_type: string;
  car?: {
    make: string;
    model: string;
    year: number;
    license_plate: string;
  };
}

interface DocumentViewModalProps {
  document: Document | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (document: Document) => void;
}

const DocumentViewModal = ({ document, isOpen, onClose, onDownload }: DocumentViewModalProps) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (document && isOpen) {
      loadDocumentContent();
    }
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [document, isOpen]);

  const loadDocumentContent = async () => {
    if (!document) return;

    setLoading(true);
    setError(null);

    try {
      // Import supabase here to avoid circular dependencies
      const { supabase } = await import("@/integrations/supabase/client");
      
      const { data, error: downloadError } = await supabase.storage
        .from('bilmappa-files')
        .download(document.storage_path);

      if (downloadError) {
        throw downloadError;
      }

      const url = URL.createObjectURL(data);
      setFileUrl(url);
    } catch (err) {
      console.error('Error loading document:', err);
      setError('Kunne ikke laste dokumentet');
    } finally {
      setLoading(false);
    }
  };

  const getDocumentTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      'eu-kontroll': 'EU-kontroll',
      'service': 'Service',
      'forsikring': 'Forsikring',
      'dekkskift': 'Dekkskift',
      'other': 'Annet'
    };
    return types[type] || type;
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case "eu-kontroll":
        return "bg-green-100 text-green-800";
      case "service":
        return "bg-blue-100 text-blue-800";
      case "forsikring":
        return "bg-purple-100 text-purple-800";
      case "dekkskift":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isImageFile = (mimeType: string) => {
    return mimeType.startsWith('image/');
  };

  const isPdfFile = (mimeType: string) => {
    return mimeType === 'application/pdf';
  };

  if (!document) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6 text-blue-600" />
              <div>
                <DialogTitle className="text-xl">{document.title}</DialogTitle>
                <Badge className={`mt-1 ${getStatusColor(document.document_type)}`}>
                  {getDocumentTypeLabel(document.document_type)}
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          {/* Document Info */}
          <div className="mb-6 space-y-3">
            {document.car && (
              <div className="flex items-center text-sm text-gray-600">
                <Car className="h-4 w-4 mr-2" />
                <span>{document.car.license_plate} - {document.car.make} {document.car.model} ({document.car.year})</span>
              </div>
            )}
            
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                Lastet opp: {new Date(document.upload_date).toLocaleDateString('no-NO')}
                {document.document_date && (
                  <span className="ml-2">
                    • Utført: {new Date(document.document_date).toLocaleDateString('no-NO')}
                  </span>
                )}
              </span>
            </div>
            
            {document.workshop_name && (
              <div className="flex items-center text-sm text-gray-600">
                <Building2 className="h-4 w-4 mr-2" />
                <span>{document.workshop_name}</span>
              </div>
            )}

            {document.description && (
              <p className="text-sm text-gray-600">{document.description}</p>
            )}
            
            <div className="text-sm text-gray-600">
              <p><span className="font-medium">Fil:</span> {document.file_name}</p>
              <p><span className="font-medium">Størrelse:</span> {formatFileSize(document.file_size)}</p>
            </div>
          </div>

          {/* Document Content */}
          <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px] flex items-center justify-center">
            {loading && (
              <div className="text-center">
                <p className="text-gray-500">Laster dokument...</p>
              </div>
            )}

            {error && (
              <div className="text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={loadDocumentContent} variant="outline">
                  Prøv igjen
                </Button>
              </div>
            )}

            {fileUrl && !loading && !error && (
              <div className="w-full h-full">
                {isImageFile(document.mime_type) && (
                  <img 
                    src={fileUrl} 
                    alt={document.title}
                    className="max-w-full max-h-full object-contain mx-auto"
                  />
                )}

                {isPdfFile(document.mime_type) && (
                  <iframe
                    src={fileUrl}
                    className="w-full h-[500px] border-0"
                    title={document.title}
                  />
                )}

                {!isImageFile(document.mime_type) && !isPdfFile(document.mime_type) && (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">
                      Forhåndsvisning er ikke tilgjengelig for denne filtypen
                    </p>
                    <Button onClick={() => onDownload(document)} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Last ned for å åpne
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-4 border-t flex-shrink-0">
          <Button variant="outline" onClick={onClose}>
            Lukk
          </Button>
          <Button onClick={() => onDownload(document)}>
            <Download className="h-4 w-4 mr-2" />
            Last ned
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentViewModal;
