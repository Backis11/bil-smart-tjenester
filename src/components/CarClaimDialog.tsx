
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText } from "lucide-react";

interface CarClaimDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onClaim: () => void;
  carInfo: {
    make: string;
    model: string;
    year: number;
    idle_since: string;
  };
  documentCount: number;
  isClaiming: boolean;
}

const CarClaimDialog = ({ 
  isOpen, 
  onClose, 
  onClaim, 
  carInfo, 
  documentCount, 
  isClaiming 
}: CarClaimDialogProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('no-NO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Overta eksisterende bil?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4 text-left">
              <p>
                Denne bilen har eksisterende data i systemet. Du kan overta den med all historikk.
              </p>
              
              <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                <div className="font-medium text-gray-900">
                  {carInfo.make} {carInfo.model} ({carInfo.year})
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Ledig siden: {formatDate(carInfo.idle_since)}
                </div>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {documentCount} dokumenter følger med
                </div>
              </div>

              {documentCount > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Inkluderer servicehistorikk
                  </Badge>
                </div>
              )}

              <p className="text-sm text-gray-600">
                Ved å overta denne bilen får du tilgang til all eksisterende data 
                inkludert servicehistorikk, dokumenter og EU-kontrolldata.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isClaiming}>
            Avbryt
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onClaim}
            disabled={isClaiming}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isClaiming ? "Overtar..." : "Ja, overta bil"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CarClaimDialog;
