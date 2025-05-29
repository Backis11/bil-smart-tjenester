
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  ArrowLeft, 
  Save, 
  Car, 
  Calendar, 
  Gauge,
  FileText,
  Shield,
  AlertTriangle,
  Info
} from "lucide-react";
import Header from "@/components/Header";
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
}

const CarDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [carData, setCarData] = useState<CarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<CarData>>({});

  useEffect(() => {
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
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tilbake
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {carData.make} {carData.model}
            </h1>
            <p className="text-gray-600">{carData.license_plate}</p>
          </div>
          <Badge variant={!isEUControlSoon ? "default" : "secondary"} className={!isEUControlSoon ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
            {!isEUControlSoon ? "Grønn" : "Gul"}
          </Badge>
        </div>

        {/* EU-kontroll warning */}
        {isEUControlSoon && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-800">
                    EU-kontroll nærmer seg
                  </p>
                  <p className="text-sm text-orange-600">
                    {daysLeft !== null && daysLeft > 0 ? `${daysLeft} dager igjen` : 'Fristen har gått ut'}
                  </p>
                </div>
                <Link to="/services?service=eu-kontroll" className="ml-auto">
                  <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                    Book EU-kontroll
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Car Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Car className="h-5 w-5" />
                  <span>Bilinformasjon</span>
                </CardTitle>
                {!editMode ? (
                  <Button onClick={() => setEditMode(true)} size="sm">
                    Rediger
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button onClick={handleSave} size="sm">
                      <Save className="h-4 w-4 mr-2" />
                      Lagre
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm">
                      Avbryt
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="make">Merke</Label>
                    <Input
                      id="make"
                      value={editMode ? formData.make || '' : carData.make || ''}
                      onChange={(e) => setFormData({...formData, make: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Modell</Label>
                    <Input
                      id="model"
                      value={editMode ? formData.model || '' : carData.model || ''}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Årsmodell</Label>
                    <Input
                      id="year"
                      type="number"
                      value={editMode ? formData.year || '' : carData.year || ''}
                      onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="license_plate">Registreringsnummer</Label>
                    <Input
                      id="license_plate"
                      value={editMode ? formData.license_plate || '' : carData.license_plate || ''}
                      onChange={(e) => setFormData({...formData, license_plate: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mileage">Kilometerstand</Label>
                    <Input
                      id="mileage"
                      type="number"
                      value={editMode ? formData.mileage || '' : carData.mileage || ''}
                      onChange={(e) => setFormData({...formData, mileage: parseInt(e.target.value)})}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fuel_type">Drivstoff</Label>
                    <Input
                      id="fuel_type"
                      value={editMode ? formData.fuel_type || '' : carData.fuel_type || ''}
                      onChange={(e) => setFormData({...formData, fuel_type: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="vin">VIN-nummer</Label>
                    <Input
                      id="vin"
                      value={editMode ? formData.vin || '' : carData.vin || ''}
                      onChange={(e) => setFormData({...formData, vin: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Extended Technical Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Info className="h-5 w-5" />
                  <span>Tekniske detaljer</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="technical-specs">
                    <AccordionTrigger>Se alle tekniske spesifikasjoner</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                        {carData.technical_approval_date && (
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Teknisk godkjenning</Label>
                            <p className="text-sm">{new Date(carData.technical_approval_date).toLocaleDateString('no-NO')}</p>
                          </div>
                        )}
                        {carData.registration_date && (
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Registreringsdato</Label>
                            <p className="text-sm">{new Date(carData.registration_date).toLocaleDateString('no-NO')}</p>
                          </div>
                        )}
                        {carData.engine_size && (
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Motorstørrelse</Label>
                            <p className="text-sm">{carData.engine_size}</p>
                          </div>
                        )}
                        {carData.inspection_due_date && (
                          <div>
                            <Label className="text-sm font-medium text-gray-600">Neste EU-kontroll</Label>
                            <p className={`text-sm ${isEUControlSoon ? 'text-orange-600 font-medium' : ''}`}>
                              {new Date(carData.inspection_due_date).toLocaleDateString('no-NO')}
                            </p>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Hurtighandlinger</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/services">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Book service
                  </Button>
                </Link>
                <Link to="/documents">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Se dokumenter
                  </Button>
                </Link>
                <Link to={`/valuation/${carData.id}`}>
                  <Button variant="outline" className="w-full justify-start">
                    <Gauge className="h-4 w-4 mr-2" />
                    Verdivurdering
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Key Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Nøkkelinformasjon</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {carData.mileage && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Kilometerstand</span>
                    <span className="font-medium">{carData.mileage.toLocaleString()} km</span>
                  </div>
                )}
                {daysLeft !== null && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Neste EU-kontroll</span>
                    <span className={`font-medium ${isEUControlSoon ? 'text-orange-600' : ''}`}>
                      {daysLeft > 0 ? `${daysLeft} dager` : 'Utgått'}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge variant={!isEUControlSoon ? "default" : "secondary"} className={!isEUControlSoon ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                    {!isEUControlSoon ? "Grønn" : "Gul"}
                  </Badge>
                </div>
                {carData.year && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Årsmodell</span>
                    <span className="font-medium">{carData.year}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
