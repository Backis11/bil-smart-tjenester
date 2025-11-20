import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/MockAuthContext";

interface CarData {
  id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
  vin?: string;
  fuel_type?: string;
  engine_size?: string;
  registration_date?: string;
  technical_approval_date?: string;
  inspection_due_date?: string;
  mileage?: number;
  user_id: string;
  created_at: string;
  updated_at: string;
  status?: string;
  sold_at?: string;
  transferred_at?: string;
  transferred_to?: string;
  notes?: string;
}

const CARS_STORAGE_KEY = 'mock_cars_data';

const getCarsFromStorage = (userId: string): CarData[] => {
  const data = localStorage.getItem(CARS_STORAGE_KEY);
  if (!data) return [];
  try {
    const allCars = JSON.parse(data);
    return allCars.filter((car: CarData) => car.user_id === userId);
  } catch (e) {
    return [];
  }
};

const saveCarToStorage = (car: CarData) => {
  const data = localStorage.getItem(CARS_STORAGE_KEY);
  let allCars: CarData[] = [];
  if (data) {
    try {
      allCars = JSON.parse(data);
    } catch (e) {
      allCars = [];
    }
  }
  
  const existingIndex = allCars.findIndex(c => c.id === car.id);
  if (existingIndex >= 0) {
    allCars[existingIndex] = car;
  } else {
    allCars.push(car);
  }
  
  localStorage.setItem(CARS_STORAGE_KEY, JSON.stringify(allCars));
};

export const useCarData = (carId: string | undefined) => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [carData, setCarData] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<CarData>>({});

  const fetchCarData = async () => {
    if (!user || !carId) {
      setLoading(false);
      return;
    }

    try {
      const cars = getCarsFromStorage(user.id);
      const car = cars.find(c => c.id === carId);
      
      if (car) {
        setCarData(car);
        setFormData(car);
      }
    } catch (error) {
      console.error('Error fetching car data:', error);
      toast({
        title: "Feil",
        description: "Kunne ikke hente bildata",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!carData || !user) return;

    try {
      const updatedCar = { ...carData, mileage: formData.mileage, updated_at: new Date().toISOString() };
      saveCarToStorage(updatedCar);
      
      setCarData(updatedCar);
      setEditMode(false);
      toast({
        title: "Bil oppdatert",
        description: "Kilometerstanden er oppdatert.",
      });
    } catch (error) {
      console.error('Error updating car:', error);
      toast({
        title: "Feil",
        description: "Kunne ikke oppdatere kilometerstand",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    setFormData(carData || {});
    setEditMode(false);
  };

  useEffect(() => {
    fetchCarData();
  }, [user, carId]);

  return {
    carData,
    loading,
    editMode,
    formData,
    setEditMode,
    setFormData,
    handleSave,
    handleCancel
  };
};
