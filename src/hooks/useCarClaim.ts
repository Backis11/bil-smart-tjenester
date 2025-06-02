
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface CarClaimResult {
  action: 'create_new' | 'claim_existing' | 'conflict';
  message: string;
  car_id?: string;
  car_info?: {
    make: string;
    model: string;
    year: number;
    idle_since: string;
  };
  document_count?: number;
}

export const useCarClaim = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const checkCarRegistration = async (licensePlate: string): Promise<CarClaimResult | null> => {
    if (!user) {
      toast({
        title: "Feil",
        description: "Du må være logget inn for å bruke denne tjenesten",
        variant: "destructive"
      });
      return null;
    }

    setIsChecking(true);
    
    try {
      const { data, error } = await supabase.rpc('can_register_car', {
        registration_number: licensePlate.toUpperCase(),
        requesting_user_id: user.id
      });

      if (error) {
        console.error('Error checking car registration:', error);
        toast({
          title: "Feil ved sjekking",
          description: error.message || "Kunne ikke sjekke bilstatus",
          variant: "destructive"
        });
        return null;
      }

      return data as CarClaimResult;
    } catch (error) {
      console.error('Car registration check error:', error);
      toast({
        title: "Feil",
        description: "En uventet feil oppstod ved sjekking",
        variant: "destructive"
      });
      return null;
    } finally {
      setIsChecking(false);
    }
  };

  const claimCar = async (carId: string): Promise<boolean> => {
    if (!user) {
      toast({
        title: "Feil",
        description: "Du må være logget inn for å gjøre krav på en bil",
        variant: "destructive"
      });
      return false;
    }

    setIsClaiming(true);
    
    try {
      const { data, error } = await supabase.rpc('claim_idle_car', {
        target_car_id: carId,
        claiming_user_id: user.id
      });

      if (error) {
        console.error('Error claiming car:', error);
        toast({
          title: "Feil ved overtakelse",
          description: error.message || "Kunne ikke overta bilen",
          variant: "destructive"
        });
        return false;
      }

      if (!data.success) {
        toast({
          title: "Kunne ikke overta bil",
          description: data.error || "Ukjent feil",
          variant: "destructive"
        });
        return false;
      }

      toast({
        title: "Bil overtatt",
        description: "Du har nå overtatt bilen med eksisterende data"
      });
      return true;
    } catch (error) {
      console.error('Car claim error:', error);
      toast({
        title: "Feil",
        description: "En uventet feil oppstod ved overtakelse",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsClaiming(false);
    }
  };

  return {
    checkCarRegistration,
    claimCar,
    isChecking,
    isClaiming
  };
};
