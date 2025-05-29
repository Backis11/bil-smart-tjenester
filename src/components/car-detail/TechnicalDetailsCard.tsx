
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Info } from "lucide-react";

interface CarData {
  technical_approval_date?: string;
  registration_date?: string;
  engine_size?: string;
  inspection_due_date?: string;
}

interface TechnicalDetailsCardProps {
  carData: CarData;
  isEUControlSoon: boolean;
}

const TechnicalDetailsCard = ({ carData, isEUControlSoon }: TechnicalDetailsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Info className="h-5 w-5" />
          <span>Tekniske detaljer</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="technical-specs">
            <AccordionTrigger>Se alle tekniske spesifikasjoner</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {carData.technical_approval_date && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Teknisk godkjenning</Label>
                    <p className="text-sm">{new Date(carData.technical_approval_date).toLocaleDateString('no-NO')}</p>
                  </div>
                )}
                {carData.registration_date && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Registreringsdato</Label>
                    <p className="text-sm">{new Date(carData.registration_date).toLocaleDateString('no-NO')}</p>
                  </div>
                )}
                {carData.engine_size && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Motorstørrelse</Label>
                    <p className="text-sm">{carData.engine_size}</p>
                  </div>
                )}
                {carData.inspection_due_date && (
                  <div>
                    <Label className="text-sm font-medium text-gray-600">Neste EU-kontroll</Label>
                    <p className={`text-sm ${isEUControlSoon ? 'text-orange-600 font-medium' : ''}`}>
                      {new Date(carData.inspection_due_date).toLocaleDateString('no-NO')}
                    </p>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default TechnicalDetailsCard;
