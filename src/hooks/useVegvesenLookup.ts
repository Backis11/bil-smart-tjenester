
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useCarClaim } from "./useCarClaim";

export const useVegvesenLookup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { checkCarRegistration, claimCar, isChecking, isClaiming } = useCarClaim();

  const lookupVehicle = async (licensePlate: string) => {
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

  const checkAndSaveCar = async (carData: any) => {
    if (!user) {
      toast({
        title: "Feil",
        description: "Du må være logget inn for å registrere en bil",
        variant: "destructive"
      });
      return { success: false, claimInfo: null };
    }

    // First check if the car can be registered or needs to be claimed
    const claimResult = await checkCarRegistration(carData.licensePlate);
    
    if (!claimResult) {
      return { success: false, claimInfo: null };
    }

    if (claimResult.action === 'conflict') {
      toast({
        title: "Bil allerede registrert",
        description: claimResult.message,
        variant: "destructive"
      });
      return { success: false, claimInfo: null };
    }

    if (claimResult.action === 'claim_existing') {
      // Return claim info for the UI to handle
      return { success: false, claimInfo: claimResult };
    }

    // If action is 'create_new', proceed with normal car creation
    return await saveCar(carData);
  };

  const saveCar = async (carData: any) => {
    if (!user) {
      toast({
        title: "Feil",
        description: "Du må være logget inn for å registrere en bil",
        variant: "destructive"
      });
      return { success: false, claimInfo: null };
    }

    try {
      // Check if there's an existing active car with the same license plate
      const { data: existingCar, error: checkError } = await supabase
        .from('cars')
        .select('id, status')
        .eq('license_plate', carData.licensePlate)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .maybeSingle();

      if (checkError) {
        console.error('Error checking existing car:', checkError);
        toast({
          title: "Feil",
          description: "Kunne ikke sjekke eksisterende bildata",
          variant: "destructive"
        });
        return { success: false, claimInfo: null };
      }

      if (existingCar) {
        toast({
          title: "Bil eksisterer allerede",
          description: "Du har allerede registrert denne bilen som aktiv",
          variant: "destructive"
        });
        return { success: false, claimInfo: null };
      }

      // Check if there's a deleted car with the same license plate that we can reactivate
      const { data: deletedCar, error: deletedCheckError } = await supabase
        .from('cars')
        .select('id')
        .eq('license_plate', carData.licensePlate)
        .eq('user_id', user.id)
        .eq('status', 'deleted')
        .maybeSingle();

      if (deletedCheckError) {
        console.error('Error checking deleted car:', deletedCheckError);
      }

      let result;
      
      if (deletedCar) {
        // Reactivate the deleted car with new data
        const { data, error } = await supabase
          .from('cars')
          .update({
            make: carData.make,
            model: carData.model,
            year: carData.year,
            fuel_type: carData.fuelType,
            engine_size: carData.engineSize,
            vin: carData.vin,
            registration_date: carData.registrationDate,
            technical_approval_date: carData.technicalApprovalDate,
            inspection_due_date: carData.inspectionDueDate,
            mileage: carData.mileage,
            status: 'active',
            updated_at: new Date().toISOString()
          })
          .eq('id', deletedCar.id)
          .eq('user_id', user.id)
          .select()
          .single();

        result = { data, error };
      } else {
        // Create a new car
        const { data, error } = await supabase
          .from('cars')
          .insert({
            user_id: user.id,
            license_plate: carData.licensePlate,
            make: carData.make,
            model: carData.model,
            year: carData.year,
            fuel_type: carData.fuelType,
            engine_size: carData.engineSize,
            vin: carData.vin,
            registration_date: carData.registrationDate,
            technical_approval_date: carData.technicalApprovalDate,
            inspection_due_date: carData.inspectionDueDate,
            mileage: carData.mileage,
            status: 'active'
          })
          .select()
          .single();

        result = { data, error };
      }

      if (result.error) {
        console.error('Error saving car:', result.error);
        toast({
          title: "Feil",
          description: "Kunne ikke registrere bilen",
          variant: "destructive"
        });
        return { success: false, claimInfo: null };
      }

      toast({
        title: "Bil registrert",
        description: deletedCar 
          ? "Bilen din er reaktivert og oppdatert med ny informasjon"
          : "Bilen din er nå registrert i systemet"
      });

      navigate('/');
      return { success: true, claimInfo: null };
    } catch (error) {
      console.error('Error saving car:', error);
      toast({
        title: "Feil",
        description: "En uventet feil oppstod ved registrering",
        variant: "destructive"
      });
      return { success: false, claimInfo: null };
    }
  };

  const handleClaimCar = async (carId: string) => {
    const success = await claimCar(carId);
    if (success) {
      navigate('/');
    }
    return success;
  };

  return {
    lookupVehicle,
    checkAndSaveCar,
    saveCar,
    claimCar: handleClaimCar,
    isLoading: isLoading || isChecking,
    isClaiming
  };
};
