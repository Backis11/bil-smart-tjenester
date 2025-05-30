
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Car, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserCar {
  id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
}

interface CarSelectorProps {
  cars: UserCar[];
  selectedCar: string;
  onCarChange: (carId: string) => void;
}

const CarSelector = ({ cars, selectedCar, onCarChange }: CarSelectorProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Car className="h-5 w-5 mr-2" />
          Velg bil *
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {cars.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
              <p className="text-gray-500 mb-4">Du har ikke registrert noen biler ennå</p>
              <Link to="/add-car">
                <Button type="button">
                  <Plus className="h-4 w-4 mr-2" />
                  Legg til bil
                </Button>
              </Link>
            </div>
          ) : (
            <>
              {cars.map((car) => (
                <button
                  key={car.id}
                  type="button"
                  onClick={() => onCarChange(car.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedCar === car.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-medium text-gray-900">
                    {car.make} {car.model} ({car.license_plate})
                  </p>
                  <p className="text-sm text-gray-600">Årsmodell: {car.year}</p>
                </button>
              ))}
              <Link to="/add-car">
                <Button variant="outline" type="button" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Legg til ny bil
                </Button>
              </Link>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CarSelector;
