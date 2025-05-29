
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import CarValuationHeader from '@/components/car-valuation/CarValuationHeader';
import ValuationCard from '@/components/car-valuation/ValuationCard';
import CarInformationSection from '@/components/car-valuation/CarInformationSection';
import InformationNotice from '@/components/car-valuation/InformationNotice';
import LoadingState from '@/components/car-valuation/LoadingState';
import NotFoundState from '@/components/car-valuation/NotFoundState';

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
    return <LoadingState />;
  }

  if (!car) {
    return <NotFoundState />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <CarValuationHeader />

        <div className="space-y-4">
          <ValuationCard 
            car={car}
            isLoadingValuation={isLoadingValuation}
            onNewValuation={handleNewValuation}
          />

          <CarInformationSection car={car} />

          <InformationNotice />
        </div>
      </div>
    </div>
  );
};

export default CarValuation;
