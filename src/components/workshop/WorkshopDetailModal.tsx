
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building, Award } from 'lucide-react';
import type { Workshop } from '@/types/workshop';

interface WorkshopDetailModalProps {
  workshop: Workshop | null;
  isOpen: boolean;
  onClose: () => void;
}

const WorkshopDetailModal = ({ workshop, isOpen, onClose }: WorkshopDetailModalProps) => {
  if (!workshop) return null;

  const formatCertifications = (certifications: string[]) => {
    return certifications.map(cert => {
      if (cert.includes('BILVERKSTED')) return 'Bilverksted';
      if (cert.includes('KONTROLLORGAN')) return 'EU-kontroll';
      if (cert.includes('DEKK')) return 'Dekk';
      if (cert.includes('LAKK')) return 'Lakk';
      if (cert.includes('BREMSE')) return 'Bremse';
      return cert;
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{workshop.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Adresse</p>
              <p className="text-gray-600">{workshop.address}</p>
              {workshop.city && <p className="text-gray-600">{workshop.city}</p>}
            </div>
          </div>

          {workshop.org_number && (
            <div className="flex items-center gap-3">
              <Building className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">Organisasjonsnummer</p>
                <p className="text-gray-600">{workshop.org_number}</p>
              </div>
            </div>
          )}

          {workshop.certifications && workshop.certifications.length > 0 && (
            <div className="flex items-start gap-3">
              <Award className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium mb-2">Sertifiseringer</p>
                <div className="flex flex-wrap gap-2">
                  {formatCertifications(workshop.certifications).map((cert, index) => (
                    <Badge key={index} variant="secondary">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WorkshopDetailModal;
