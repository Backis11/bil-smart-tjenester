
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Car, Save } from "lucide-react";

interface CarData {
  id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
  vin?: string;
  fuel_type?: string;
  mileage?: number;
}

interface CarInformationCardProps {
  carData: CarData;
  editMode: boolean;
  formData: Partial<CarData>;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onFormDataChange: (data: Partial<CarData>) => void;
}

const CarInformationCard = ({
  carData,
  editMode,
  formData,
  onEdit,
  onSave,
  onCancel,
  onFormDataChange
}: CarInformationCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Car className="h-5 w-5" />
          <span>Bilinformasjon</span>
        </CardTitle>
        {!editMode ? (
          <Button onClick={onEdit} size="sm">
            Rediger
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button onClick={onSave} size="sm">
              <Save className="h-4 w-4 mr-2" />
              Lagre
            </Button>
            <Button onClick={onCancel} variant="outline" size="sm">
              Avbryt
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="make">Merke</Label>
            <Input
              id="make"
              value={editMode ? formData.make || '' : carData.make || ''}
              onChange={(e) => onFormDataChange({...formData, make: e.target.value})}
              disabled={!editMode}
            />
          </div>
          <div>
            <Label htmlFor="model">Modell</Label>
            <Input
              id="model"
              value={editMode ? formData.model || '' : carData.model || ''}
              onChange={(e) => onFormDataChange({...formData, model: e.target.value})}
              disabled={!editMode}
            />
          </div>
          <div>
            <Label htmlFor="year">Årsmodell</Label>
            <Input
              id="year"
              type="number"
              value={editMode ? formData.year || '' : carData.year || ''}
              onChange={(e) => onFormDataChange({...formData, year: parseInt(e.target.value)})}
              disabled={!editMode}
            />
          </div>
          <div>
            <Label htmlFor="license_plate">Registreringsnummer</Label>
            <Input
              id="license_plate"
              value={editMode ? formData.license_plate || '' : carData.license_plate || ''}
              onChange={(e) => onFormDataChange({...formData, license_plate: e.target.value})}
              disabled={!editMode}
            />
          </div>
          <div>
            <Label htmlFor="mileage">Kilometerstand</Label>
            <Input
              id="mileage"
              type="number"
              value={editMode ? formData.mileage || '' : carData.mileage || ''}
              onChange={(e) => onFormDataChange({...formData, mileage: parseInt(e.target.value)})}
              disabled={!editMode}
            />
          </div>
          <div>
            <Label htmlFor="fuel_type">Drivstoff</Label>
            <Input
              id="fuel_type"
              value={editMode ? formData.fuel_type || '' : carData.fuel_type || ''}
              onChange={(e) => onFormDataChange({...formData, fuel_type: e.target.value})}
              disabled={!editMode}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="vin">VIN-nummer</Label>
            <Input
              id="vin"
              value={editMode ? formData.vin || '' : carData.vin || ''}
              onChange={(e) => onFormDataChange({...formData, vin: e.target.value})}
              disabled={!editMode}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarInformationCard;
