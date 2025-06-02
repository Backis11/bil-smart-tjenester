import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
  inspection_due_date?: string;
  status?: string;
}

const UserCarsSection = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCars = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('cars')
          .select('id, make, model, year, license_plate, inspection_due_date, status')
          .eq('user_id', user.id)
          .eq('status', 'active') // Only show active cars
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCars(data || []);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [user]);

  const calculateDaysUntilInspection = (inspectionDate?: string) => {
    if (!inspectionDate) return null;
    
    const today = new Date();
    const inspection = new Date(inspectionDate);
    const diffTime = inspection.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Mine biler</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">Laster biler...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Mine biler</h2>
        <Link to="/add-car">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Legg til bil
          </Button>
        </Link>
      </div>

      {cars.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-gray-500 mb-4">Du har ikke registrert noen aktive biler ennå</p>
            <Link to="/add-car">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Registrer din første bil
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cars.map((car) => {
            const daysUntilInspection = calculateDaysUntilInspection(car.inspection_due_date);
            const isInspectionSoon = daysUntilInspection !== null && daysUntilInspection <= 60;
            
            return (
              <Link key={car.id} to={`/car/${car.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {car.make} {car.model}
                        </h3>
                        <p className="text-sm text-gray-600">{car.license_plate}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!isInspectionSoon ? (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Grønn
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                            Gul
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {daysUntilInspection !== null && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>
                          Neste EU-kontroll: {daysUntilInspection > 0 ? `${daysUntilInspection} dager` : 'Utgått'}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserCarsSection;
