
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Car } from 'lucide-react';

const ValuationSelection: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: cars, isLoading } = useQuery({
    queryKey: ['user-cars'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('cars')
        .select('id, make, model, year, license_plate')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center py-8">
            <p className="text-gray-500">Laster dine biler...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!cars || cars.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center py-8">
            <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Verdivurdering</h2>
            <p className="text-gray-500 mb-4">Du må legge til en bil før du kan få verdivurdering</p>
            <Button onClick={() => navigate('/add-car')}>
              Legg til bil
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verdivurdering</h1>
          <p className="text-gray-600">Velg hvilken bil du vil få verdivurdert</p>
        </div>

        <div className="grid gap-4">
          {cars.map((car) => (
            <Card key={car.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {car.make} {car.model}
                    </CardTitle>
                    <p className="text-gray-600">{car.license_plate} • {car.year}</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Car className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => navigate(`/valuation/${car.id}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Se verdivurdering
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValuationSelection;
