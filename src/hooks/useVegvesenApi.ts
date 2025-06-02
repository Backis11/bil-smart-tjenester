
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface VehicleData {
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  fuelType: string;
  engineSize: string;
  vin: string;
  registrationDate: string;
  technicalApprovalDate: string;
  inspectionDueDate: string;
}

export const useVegvesenApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const lookupVehicle = async (licensePlate: string): Promise<VehicleData | null> => {
    if (!user) {
      toast({
        title: "Feil",
        description: "Du må være logget inn for å bruke denne tjenesten",
        variant: "destructive"
      });
      return null;
    }

    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('vegvesen-lookup', {
        body: { licensePlate: licensePlate.toUpperCase() }
      });

      if (error) {
        console.error('Vegvesen lookup error:', error);
        toast({
          title: "Feil ved oppslag",
          description: error.message || "Kunne ikke hente bildata fra Vegvesenet",
          variant: "destructive"
        });
        return null;
      }

      if (!data || !data.make) {
        toast({
          title: "Ingen data funnet",
          description: "Fant ingen bildata for dette registreringsnummeret",
          variant: "destructive"
        });
        return null;
      }

      toast({
        title: "Bildata hentet",
        description: "Informasjon hentet fra Vegvesenet"
      });

      return {
        licensePlate: licensePlate.toUpperCase(),
        make: data.make,
        model: data.model,
        year: data.year,
        fuelType: data.fuelType,
        engineSize: data.engineSize,
        vin: data.vin,
        registrationDate: data.registrationDate,
        technicalApprovalDate: data.technicalApprovalDate,
        inspectionDueDate: data.inspectionDueDate
      };
    } catch (error) {
      console.error('Vegvesen lookup error:', error);
      toast({
        title: "Feil",
        description: "En uventet feil oppstod ved oppslag",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    lookupVehicle,
    isLoading
  };
};
