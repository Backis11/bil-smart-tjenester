
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Car, Search } from "lucide-react";

const AddCar = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [licensePlate, setLicensePlate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [carData, setCarData] = useState<any>(null);

  // Manual car data form
  const [manualData, setManualData] = useState({
    make: "",
    model: "",
    year: "",
    mileage: "",
    fuelType: "",
    engineSize: ""
  });

  const handleLicensePlateSearch = async () => {
    if (!licensePlate.trim()) {
      toast({
        title: "Feil",
        description: "Vennligst skriv inn registreringsnummer",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    // TODO: Implement API call to Vegvesenet when API key is available
    // For now, show placeholder message
    setTimeout(() => {
      toast({
        title: "Kommer snart",
        description: "Integrasjon med Vegvesenet kommer snart. Fyll ut informasjonen manuelt for nå.",
      });
      setIsLoading(false);
    }, 1000);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate manual data
    if (!manualData.make || !manualData.model || !manualData.year) {
      toast({
        title: "Feil",
        description: "Vennligst fyll ut alle obligatoriske felt",
        variant: "destructive"
      });
      return;
    }

    // TODO: Save car data to database
    toast({
      title: "Bil registrert",
      description: `${manualData.make} ${manualData.model} (${manualData.year}) er lagt til`,
    });
    
    // Reset form
    setManualData({
      make: "",
      model: "",
      year: "",
      mileage: "",
      fuelType: "",
      engineSize: ""
    });
    setLicensePlate("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Legg til bil</h1>
          <p className="text-gray-600">Registrer din bil for å få tilgang til alle tjenester</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Automatic registration via license plate */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Automatisk registrering
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Skriv inn registreringsnummer for å hente bildata automatisk fra Vegvesenet
              </p>
              
              <div className="space-y-2">
                <Label htmlFor="licensePlate">Registreringsnummer</Label>
                <Input
                  id="licensePlate"
                  placeholder="AB12345"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                  maxLength={7}
                />
              </div>
              
              <Button 
                onClick={handleLicensePlateSearch}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Søker..." : "Hent bildata"}
              </Button>
              
              <p className="text-xs text-gray-500">
                *Integrasjon med Vegvesenet kommer snart
              </p>
            </CardContent>
          </Card>

          {/* Manual registration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5" />
                Manuell registrering
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleManualSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="make">Merke *</Label>
                    <Input
                      id="make"
                      placeholder="Toyota"
                      value={manualData.make}
                      onChange={(e) => setManualData({...manualData, make: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="model">Modell *</Label>
                    <Input
                      id="model"
                      placeholder="Corolla"
                      value={manualData.model}
                      onChange={(e) => setManualData({...manualData, model: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Årsmodell *</Label>
                    <Input
                      id="year"
                      type="number"
                      placeholder="2020"
                      min="1950"
                      max={new Date().getFullYear() + 1}
                      value={manualData.year}
                      onChange={(e) => setManualData({...manualData, year: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="mileage">Kilometerstand</Label>
                    <Input
                      id="mileage"
                      type="number"
                      placeholder="50000"
                      value={manualData.mileage}
                      onChange={(e) => setManualData({...manualData, mileage: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fuelType">Drivstoff</Label>
                    <Input
                      id="fuelType"
                      placeholder="Bensin"
                      value={manualData.fuelType}
                      onChange={(e) => setManualData({...manualData, fuelType: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="engineSize">Motorstørrelse</Label>
                    <Input
                      id="engineSize"
                      placeholder="1.6L"
                      value={manualData.engineSize}
                      onChange={(e) => setManualData({...manualData, engineSize: e.target.value})}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Registrer bil
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AddCar;
