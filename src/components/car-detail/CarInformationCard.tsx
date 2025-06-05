
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
              value={carData.make || ''}
              disabled
              className="bg-gray-50"
            />
            {editMode && (
              <p className="text-xs text-gray-500 mt-1">Hentet fra Vegvesenet</p>
            )}
          </div>
          <div>
            <Label htmlFor="model">Modell</Label>
            <Input
              id="model"
              value={carData.model || ''}
              disabled
              className="bg-gray-50"
            />
            {editMode && (
              <p className="text-xs text-gray-500 mt-1">Hentet fra Vegvesenet</p>
            )}
          </div>
          <div>
            <Label htmlFor="year">Årsmodell</Label>
            <Input
              id="year"
              type="number"
              value={carData.year || ''}
              disabled
              className="bg-gray-50"
            />
            {editMode && (
              <p className="text-xs text-gray-500 mt-1">Hentet fra Vegvesenet</p>
            )}
          </div>
          <div>
            <Label htmlFor="license_plate">Registreringsnummer</Label>
            <Input
              id="license_plate"
              value={carData.license_plate || ''}
              disabled
              className="bg-gray-50"
            />
            {editMode && (
              <p className="text-xs text-gray-500 mt-1">Hentet fra Vegvesenet</p>
            )}
          </div>
          <div>
            <Label htmlFor="mileage">Kilometerstand</Label>
            <Input
              id="mileage"
              type="number"
              value={editMode ? formData.mileage || '' : carData.mileage || ''}
              onChange={(e) => onFormDataChange({...formData, mileage: parseInt(e.target.value)})}
              disabled={!editMode}
              className={!editMode ? "bg-gray-50" : ""}
            />
          </div>
          <div>
            <Label htmlFor="fuel_type">Drivstoff</Label>
            <Input
              id="fuel_type"
              value={carData.fuel_type || ''}
              disabled
              className="bg-gray-50"
            />
            {editMode && (
              <p className="text-xs text-gray-500 mt-1">Hentet fra Vegvesenet</p>
            )}
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="vin">VIN-nummer</Label>
            <Input
              id="vin"
              value={carData.vin || ''}
              disabled
              className="bg-gray-50"
            />
            {editMode && (
              <p className="text-xs text-gray-500 mt-1">Hentet fra Vegvesenet</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CarInformationCard;
