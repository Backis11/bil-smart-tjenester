import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/MockAuthContext";

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

const CARS_STORAGE_KEY = 'mock_cars_data';

export const useCarRegistration = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  const saveCar = async (carData: CarData) => {
    if (!user) {
      console.error('No user found when trying to save car');
      toast({
        title: "Feil",
        description: "Du må være logget inn for å registrere en bil",
        variant: "destructive"
      });
      return { success: false, claimInfo: null };
    }

    try {
      const data = localStorage.getItem(CARS_STORAGE_KEY);
      let allCars: any[] = [];
      if (data) {
        try {
          allCars = JSON.parse(data);
        } catch (e) {
          allCars = [];
        }
      }

      // Check if car already exists for this user
      const existingCar = allCars.find(
        car => car.license_plate === carData.licensePlate && 
               car.user_id === user.id && 
               car.status === 'active'
      );

      if (existingCar) {
        toast({
          title: "Bil eksisterer allerede",
          description: "Du har allerede registrert denne bilen som aktiv",
          variant: "destructive"
        });
        return { success: false, claimInfo: null };
      }

      const newCar = {
        id: `car_${Date.now()}`,
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
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      allCars.push(newCar);
      localStorage.setItem(CARS_STORAGE_KEY, JSON.stringify(allCars));

      toast({
        title: "Bil registrert",
        description: "Bilen din er nå registrert i systemet"
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
