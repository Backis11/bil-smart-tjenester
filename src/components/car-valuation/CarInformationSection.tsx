
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CarInformationSectionProps {
  car: {
    make: string;
    model: string;
    year: number;
    license_plate: string;
    mileage?: number;
  };
}

const CarInformationSection: React.FC<CarInformationSectionProps> = ({ car }) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Bilinformasjon</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Merke</span>
            <span className="font-medium">{car.make}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Modell</span>
            <span className="font-medium">{car.model}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Årsmodell</span>
            <span className="font-medium">{car.year}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Registreringsnummer</span>
            <span className="font-medium">{car.license_plate}</span>
          </div>
          {car.mileage && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Kilometerstand</span>
              <span className="font-medium">{car.mileage.toLocaleString()} km</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CarInformationSection;
