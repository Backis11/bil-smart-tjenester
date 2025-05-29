
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Save, 
  Car, 
  Calendar, 
  Gauge,
  FileText,
  Shield
} from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const CarDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  // Dummy data - in real app this would come from API
  const [carData, setCarData] = useState({
    id: parseInt(id || "1"),
    brand: "Toyota",
    model: "Corolla", 
    year: 2020,
    plate: "AB12345",
    mileage: 45000,
    euControl: "2024-06-15",
    status: "Grønn",
    vin: "JTDKN3DU2L0123456",
    color: "Hvit",
    fuelType: "Bensin"
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(carData);

  const handleSave = () => {
    setCarData(formData);
    setEditMode(false);
    toast({
      title: "Bil oppdatert",
      description: "Informasjonen om bilen din er oppdatert.",
    });
  };

  const handleCancel = () => {
    setFormData(carData);
    setEditMode(false);
  };

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
              {carData.brand} {carData.model}
            </h1>
            <p className="text-gray-600">{carData.plate}</p>
          </div>
          <Badge variant={carData.status === "Grønn" ? "default" : "secondary"}>
            {carData.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Car Information */}
          <div className="lg:col-span-2">
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
                    <Label htmlFor="brand">Merke</Label>
                    <Input
                      id="brand"
                      value={editMode ? formData.brand : carData.brand}
                      onChange={(e) => setFormData({...formData, brand: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="model">Modell</Label>
                    <Input
                      id="model"
                      value={editMode ? formData.model : carData.model}
                      onChange={(e) => setFormData({...formData, model: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="year">Årsmodell</Label>
                    <Input
                      id="year"
                      type="number"
                      value={editMode ? formData.year : carData.year}
                      onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="plate">Registreringsnummer</Label>
                    <Input
                      id="plate"
                      value={editMode ? formData.plate : carData.plate}
                      onChange={(e) => setFormData({...formData, plate: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mileage">Kilometerstand</Label>
                    <Input
                      id="mileage"
                      type="number"
                      value={editMode ? formData.mileage : carData.mileage}
                      onChange={(e) => setFormData({...formData, mileage: parseInt(e.target.value)})}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="color">Farge</Label>
                    <Input
                      id="color"
                      value={editMode ? formData.color : carData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fuelType">Drivstoff</Label>
                    <Input
                      id="fuelType"
                      value={editMode ? formData.fuelType : carData.fuelType}
                      onChange={(e) => setFormData({...formData, fuelType: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                  <div>
                    <Label htmlFor="vin">VIN-nummer</Label>
                    <Input
                      id="vin"
                      value={editMode ? formData.vin : carData.vin}
                      onChange={(e) => setFormData({...formData, vin: e.target.value})}
                      disabled={!editMode}
                    />
                  </div>
                </div>
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
                <Link to="/valuation">
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
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Kilometerstand</span>
                  <span className="font-medium">{carData.mileage.toLocaleString()} km</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Neste EU-kontroll</span>
                  <span className="font-medium">45 dager</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge variant={carData.status === "Grønn" ? "default" : "secondary"}>
                    {carData.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;
