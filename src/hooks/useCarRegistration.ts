
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface CarData {
  licensePlate: string;
  make: string;
  model: string;
  year: number;
  fuelType?: string;
  engineSize?: string;
  vin?: string;
  registrationDate?: string;
  technicalApprovalDate?: string;
  inspectionDueDate?: string;
  mileage?: number;
}

export const useCarRegistration = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  const saveCar = async (carData: CarData) => {
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

  return {
    saveCar
  };
};
