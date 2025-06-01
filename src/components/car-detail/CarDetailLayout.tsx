
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CarDetailHeader from "@/components/car-detail/CarDetailHeader";
import EUControlWarning from "@/components/car-detail/EUControlWarning";
import CarInformationCard from "@/components/car-detail/CarInformationCard";
import TechnicalDetailsCard from "@/components/car-detail/TechnicalDetailsCard";
import QuickActionsCard from "@/components/car-detail/QuickActionsCard";
import KeyStatsCard from "@/components/car-detail/KeyStatsCard";
import CarActionsDialog from "@/components/car-detail/CarActionsDialog";
import { calculateDaysUntilEUControl, isEUControlSoon } from "@/utils/carUtils";

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

interface CarDetailLayoutProps {
  carData: CarData;
  editMode: boolean;
  formData: Partial<CarData>;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onFormDataChange: (data: Partial<CarData>) => void;
}

const CarDetailLayout = ({
  carData,
  editMode,
  formData,
  onEdit,
  onSave,
  onCancel,
  onFormDataChange
}: CarDetailLayoutProps) => {
  const navigate = useNavigate();

  const handleCarUpdated = () => {
    navigate('/');
  };

  const daysLeft = calculateDaysUntilEUControl(carData.inspection_due_date);
  const isEUSoon = isEUControlSoon(daysLeft);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <CarDetailHeader carData={carData} isEUControlSoon={isEUSoon} />

        {isEUSoon && <EUControlWarning daysLeft={daysLeft} />}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <CarInformationCard
              carData={carData}
              editMode={editMode}
              formData={formData}
              onEdit={onEdit}
              onSave={onSave}
              onCancel={onCancel}
              onFormDataChange={onFormDataChange}
            />
            
            <TechnicalDetailsCard carData={carData} isEUControlSoon={isEUSoon} />
          </div>

          <div className="space-y-6">
            <QuickActionsCard carId={carData.id} />
            <KeyStatsCard carData={carData} daysLeft={daysLeft} isEUControlSoon={isEUSoon} />
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

export default CarDetailLayout;
