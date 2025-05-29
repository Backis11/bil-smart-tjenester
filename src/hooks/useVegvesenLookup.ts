
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface VehicleData {
  licensePlate: string;
  make: string;
  model: string;
  year: number | null;
  vin: string;
  fuelType: string;
  engineSize: string;
  registrationDate: string | null;
  technicalApprovalDate: string | null;
  inspectionDueDate: string | null;
}

export const useVegvesenLookup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const lookupVehicle = async (licensePlate: string): Promise<VehicleData | null> => {
    if (!user) {
      toast({
        title: "Feil",
        description: "Du må være innlogget for å bruke denne tjenesten",
        variant: "destructive"
      });
      return null;
    }

    setIsLoading(true);

    try {
      console.log('🔄 Starting vehicle lookup for:', licensePlate);
      console.log('User:', user.email);
      
      const { data, error } = await supabase.functions.invoke('vegvesen-lookup', {
        body: { licensePlate: licensePlate.toUpperCase() }
      });

      console.log('Supabase function response:', { data, error });

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(error.message || 'Failed to lookup vehicle');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      toast({
        title: "Vellykket",
        description: "Bildata hentet fra Vegvesenet"
      });

      return data;
    } catch (error: any) {
      console.error('Vehicle lookup error:', error);
      
      let errorMessage = "Kunne ikke hente bildata";
      
      if (error.message.includes('quota exceeded')) {
        errorMessage = "Du har brukt opp ditt daglige antall oppslag (10). Prøv igjen i morgen.";
      } else if (error.message.includes('No vehicle data found')) {
        errorMessage = "Ingen bildata funnet for dette registreringsnummeret";
      } else if (error.message.includes('Authentication failed') || error.message.includes('Unauthorized')) {
        errorMessage = "Autentiseringsfeil. Prøv å logge ut og inn igjen.";
      } else if (error.message.includes('Failed to fetch vehicle data from Vegvesenet')) {
        errorMessage = "Vegvesenet sin tjeneste er ikke tilgjengelig for øyeblikket. Prøv igjen senere.";
      } else if (error.message.includes('Internal server error')) {
        errorMessage = "Intern serverfeil. Hvis problemet vedvarer, kontakt support.";
      }

      toast({
        title: "Feil",
        description: errorMessage,
        variant: "destructive"
      });

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const saveCar = async (carData: Partial<VehicleData>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('cars')
        .insert({
          user_id: user.id,
          license_plate: carData.licensePlate!,
          make: carData.make,
          model: carData.model,
          year: carData.year,
          vin: carData.vin,
          fuel_type: carData.fuelType,
          engine_size: carData.engineSize,
          registration_date: carData.registrationDate,
          technical_approval_date: carData.technicalApprovalDate,
          inspection_due_date: carData.inspectionDueDate
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Bil registrert",
        description: `${carData.make} ${carData.model} er lagt til i dine biler`
      });

      return data;
    } catch (error: any) {
      console.error('Save car error:', error);
      
      let errorMessage = "Kunne ikke registrere bil";
      if (error.code === '23505') {
        errorMessage = "Denne bilen er allerede registrert";
      }

      toast({
        title: "Feil",
        description: errorMessage,
        variant: "destructive"
      });

      return null;
    }
  };

  return {
    lookupVehicle,
    saveCar,
    isLoading
  };
};
