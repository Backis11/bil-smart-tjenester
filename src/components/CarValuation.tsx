
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Car, Calendar, MapPin, RefreshCw, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

interface CarData {
  id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
  mileage?: number;
}

const CarValuation: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const [car, setCar] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoadingValuation, setIsLoadingValuation] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      if (!user || !id) return;

      try {
        const { data, error } = await supabase
          .from('cars')
          .select('id, make, model, year, license_plate, mileage')
          .eq('id', id)
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setCar(data);
      } catch (error) {
        console.error('Error fetching car:', error);
        toast({
          title: "Feil",
          description: "Kunne ikke hente bildata",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [user, id]);

  const handleNewValuation = async () => {
    setIsLoadingValuation(true);
    // Simulate API call - in the future this would connect to a real valuation service
    setTimeout(() => {
      toast({
        title: "Ikke nok data",
        description: "Vi har ikke nok data for å gi en nøyaktig verdivurdering ennå",
        variant: "destructive"
      });
      setIsLoadingValuation(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center py-8">
            <p className="text-gray-500">Laster bildata...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center py-8">
            <p className="text-gray-500">Bil ikke funnet</p>
            <Button onClick={() => navigate('/')} className="mt-4">
              Tilbake til forsiden
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 p-2 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Tilbake
        </Button>

        <div className="space-y-4">
          {/* Main Valuation Card */}
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
                    Ikke nok data
                  </p>
                  <p className="text-sm text-gray-500">
                    Vi trenger mer informasjon for å gi en nøyaktig vurdering
                  </p>
                </div>
                
                <Button 
                  onClick={handleNewValuation}
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

          {/* Car Information */}
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

          {/* Information Notice */}
          <Card className="border-0 shadow-sm bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <div>
                  <p className="font-medium text-yellow-800 mb-1">
                    Verdivurdering ikke tilgjengelig
                  </p>
                  <p className="text-sm text-yellow-700">
                    Vi jobber med å implementere verdivurdering basert på markedsdata. 
                    Denne funksjonen vil være tilgjengelig snart.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarValuation;
