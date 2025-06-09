
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, Car, Building2, Trash2, Eye } from "lucide-react";

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
  car?: {
    make: string;
    model: string;
    year: number;
    license_plate: string;
  };
}

interface DocumentCardProps {
  document: Document;
  onDownload: (document: Document) => void;
  onDelete: (documentId: string) => void;
  onView: (document: Document) => void;
}

const DocumentCard = ({ document, onDownload, onDelete, onView }: DocumentCardProps) => {
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

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg line-clamp-1">{document.title}</CardTitle>
          </div>
          <Badge className={getStatusColor(document.document_type)}>
            {getDocumentTypeLabel(document.document_type)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
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
            <p className="text-sm text-gray-600 line-clamp-2">{document.description}</p>
          )}
          
          <div className="text-sm text-gray-600">
            <p><span className="font-medium">Fil:</span> {document.file_name}</p>
            <p><span className="font-medium">Størrelse:</span> {formatFileSize(document.file_size)}</p>
          </div>
          
          <div className="flex gap-2 pt-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 flex items-center space-x-2"
              onClick={() => onView(document)}
            >
              <Eye className="h-4 w-4" />
              <span>Vis</span>
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 flex items-center space-x-2"
              onClick={() => onDownload(document)}
            >
              <Download className="h-4 w-4" />
              <span>Last ned</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(document.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCard;
