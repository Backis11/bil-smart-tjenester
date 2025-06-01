
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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

export const useCarData = (carId: string | undefined) => {
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [carData, setCarData] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<CarData>>({});

  const fetchCarData = async () => {
    if (!user || !carId) return;

    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', carId)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      
      setCarData(data);
      setFormData(data);
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
      const { error } = await supabase
        .from('cars')
        .update({
          make: formData.make,
          model: formData.model,
          year: formData.year,
          license_plate: formData.license_plate,
          mileage: formData.mileage,
          fuel_type: formData.fuel_type,
          vin: formData.vin
        })
        .eq('id', carData.id)
        .eq('user_id', user.id);

      if (error) throw error;

      setCarData({ ...carData, ...formData });
      setEditMode(false);
      toast({
        title: "Bil oppdatert",
        description: "Informasjonen om bilen din er oppdatert.",
      });
    } catch (error) {
      console.error('Error updating car:', error);
      toast({
        title: "Feil",
        description: "Kunne ikke oppdatere bildata",
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
