import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import CarDetailHeader from "@/components/car-detail/CarDetailHeader";
import EUControlWarning from "@/components/car-detail/EUControlWarning";
import CarInformationCard from "@/components/car-detail/CarInformationCard";
import TechnicalDetailsCard from "@/components/car-detail/TechnicalDetailsCard";
import QuickActionsCard from "@/components/car-detail/QuickActionsCard";
import KeyStatsCard from "@/components/car-detail/KeyStatsCard";
import CarActionsDialog from "@/components/car-detail/CarActionsDialog";

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

const CarDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [carData, setCarData] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<CarData>>({});

  const fetchCarData = async () => {
    if (!user || !id) return;

    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
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

  useEffect(() => {
    fetchCarData();
  }, [user, id]);

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

  const handleCarUpdated = async () => {
    // Always redirect to home page after any car action (delete, sell, transfer)
    navigate('/');
  };

  // Calculate days until EU-kontroll
  const daysUntilEUControl = () => {
    if (!carData?.inspection_due_date) return null;
    const today = new Date();
    const euDate = new Date(carData.inspection_due_date);
    const diffTime = euDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-500">Laster bildata...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!carData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-500">Bil ikke funnet</p>
            <Link to="/">
              <Button className="mt-4">Tilbake til forsiden</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const daysLeft = daysUntilEUControl();
  const isEUControlSoon = daysLeft !== null && daysLeft <= 60;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CarDetailHeader carData={carData} isEUControlSoon={isEUControlSoon} />

        {isEUControlSoon && <EUControlWarning daysLeft={daysLeft} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CarInformationCard
              carData={carData}
              editMode={editMode}
              formData={formData}
              onEdit={() => setEditMode(true)}
              onSave={handleSave}
              onCancel={handleCancel}
              onFormDataChange={setFormData}
            />
            
            <TechnicalDetailsCard carData={carData} isEUControlSoon={isEUControlSoon} />
          </div>

          <div className="space-y-6">
            <QuickActionsCard carId={carData.id} />
            <KeyStatsCard carData={carData} daysLeft={daysLeft} isEUControlSoon={isEUControlSoon} />
            <CarActionsDialog
              carId={carData.id}
              carMake={carData.make || ''}
              carModel={carData.model || ''}
              onCarUpdated={handleCarUpdated}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
