
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Car, RefreshCw } from 'lucide-react';

interface ValuationCardProps {
  car: {
    make: string;
    model: string;
    license_plate: string;
    year: number;
  };
  isLoadingValuation: boolean;
  onNewValuation: () => void;
}

const ValuationCard: React.FC<ValuationCardProps> = ({ 
  car, 
  isLoadingValuation, 
  onNewValuation 
}) => {
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-gray-900">
              {car.make} {car.model}
            </CardTitle>
            <p className="text-gray-600">{car.license_plate} • {car.year}</p>
          </div>
          <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
            <Car className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Estimert markedsverdi</p>
            <p className="text-2xl font-bold text-gray-400">
              Vi har ikke nok data enda
            </p>
            <p className="text-sm text-gray-500">
              Vi trenger mer informasjon for å gi en nøyaktig vurdering
            </p>
          </div>
          
          <Button 
            onClick={onNewValuation}
            disabled={isLoadingValuation}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isLoadingValuation ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Forsøker vurdering...
              </>
            ) : (
              <>
                <TrendingUp className="h-4 w-4 mr-2" />
                Forsøk verdivurdering
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValuationCard;
