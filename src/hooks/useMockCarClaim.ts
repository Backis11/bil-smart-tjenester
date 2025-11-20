import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/MockAuthContext";

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
    
    // Simulate check delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      // For mock, always allow creating new cars
      setIsChecking(false);
      return {
        action: 'create_new',
        message: 'Bil kan registreres'
      };
    } catch (error) {
      console.error('Car registration check error:', error);
      toast({
        title: "Feil",
        description: "En uventet feil oppstod ved sjekking",
        variant: "destructive"
      });
      setIsChecking(false);
      return null;
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
    
    // Simulate claim delay
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      toast({
        title: "Bil overtatt",
        description: "Du har nå overtatt bilen med eksisterende data"
      });
      setIsClaiming(false);
      return true;
    } catch (error) {
      console.error('Car claim error:', error);
      toast({
        title: "Feil",
        description: "En uventet feil oppstod ved overtakelse",
        variant: "destructive"
      });
      setIsClaiming(false);
      return false;
    }
  };

  return {
    checkCarRegistration,
    claimCar,
    isChecking,
    isClaiming
  };
};
