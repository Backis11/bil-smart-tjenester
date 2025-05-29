import { useState } from "react";
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
    fuelType: "Bensin",
    // Extended data from Vegvesen API
    technicalApprovalDate: "2020-01-15",
    ownWeight: 1320,
    totalWeight: 1800,
    tireDimensions: "205/55R16",
    rimDimensions: "6.5Jx16",
    horsePower: 122,
    co2Emissions: 142
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

  // Calculate days until EU-kontroll
  const daysUntilEUControl = () => {
    const today = new Date();
    const euDate = new Date(carData.euControl);
    const diffTime = euDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = daysUntilEUControl();
  const isEUControlSoon = daysLeft <= 60;

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
                    {daysLeft > 0 ? `${daysLeft} dager igjen` : 'Fristen har gått ut'}
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
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Teknisk godkjenning</Label>
                          <p className="text-sm">{new Date(carData.technicalApprovalDate).toLocaleDateString('no-NO')}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Egenvekt</Label>
                          <p className="text-sm">{carData.ownWeight} kg</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Totalvekt</Label>
                          <p className="text-sm">{carData.totalWeight} kg</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Motoreffekt</Label>
                          <p className="text-sm">{carData.horsePower} hk</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">CO₂-utslipp</Label>
                          <p className="text-sm">{carData.co2Emissions} g/km</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Dekkdimensjon</Label>
                          <p className="text-sm">{carData.tireDimensions}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Felgdimensjon</Label>
                          <p className="text-sm">{carData.rimDimensions}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-600">Neste EU-kontroll</Label>
                          <p className={`text-sm ${isEUControlSoon ? 'text-orange-600 font-medium' : ''}`}>
                            {new Date(carData.euControl).toLocaleDateString('no-NO')}
                          </p>
                        </div>
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
                  <span className={`font-medium ${isEUControlSoon ? 'text-orange-600' : ''}`}>
                    {daysLeft > 0 ? `${daysLeft} dager` : 'Utgått'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Status</span>
                  <Badge variant={carData.status === "Grønn" ? "default" : "secondary"}>
                    {carData.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Motoreffekt</span>
                  <span className="font-medium">{carData.horsePower} hk</span>
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
