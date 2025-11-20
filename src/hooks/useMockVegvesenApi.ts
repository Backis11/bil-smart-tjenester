import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/MockAuthContext";

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

// Mock vehicle data
const mockVehicles: Record<string, Omit<VehicleData, 'licensePlate'>> = {
  'AB12345': {
    make: 'Toyota',
    model: 'Corolla',
    year: 2020,
    fuelType: 'Bensin',
    engineSize: '1.8L',
    vin: '1HGBH41JXMN109186',
    registrationDate: '2020-03-15',
    technicalApprovalDate: '2020-03-10',
    inspectionDueDate: '2025-03-15'
  },
  'CD67890': {
    make: 'Volkswagen',
    model: 'Golf',
    year: 2019,
    fuelType: 'Diesel',
    engineSize: '2.0L',
    vin: '2HGBH41JXMN109187',
    registrationDate: '2019-06-20',
    technicalApprovalDate: '2019-06-15',
    inspectionDueDate: '2024-06-20'
  }
};

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
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const upperPlate = licensePlate.toUpperCase();
      const mockData = mockVehicles[upperPlate];

      if (!mockData) {
        // Return generic mock data for any plate
        const genericData: VehicleData = {
          licensePlate: upperPlate,
          make: 'Ukjent merke',
          model: 'Ukjent modell',
          year: 2018,
          fuelType: 'Bensin',
          engineSize: '1.6L',
          vin: 'MOCK' + Date.now(),
          registrationDate: '2018-01-01',
          technicalApprovalDate: '2018-01-01',
          inspectionDueDate: '2024-01-01'
        };

        toast({
          title: "Bildata hentet (mock)",
          description: "Generisk mockdata brukt for dette registreringsnummeret"
        });

        return genericData;
      }

      toast({
        title: "Bildata hentet (mock)",
        description: "Informasjon hentet fra mock-database"
      });

      return {
        licensePlate: upperPlate,
        ...mockData
      };
    } catch (error) {
      console.error('Mock lookup error:', error);
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
