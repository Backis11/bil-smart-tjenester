
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useVegvesenLookup } from "@/hooks/useVegvesenLookup";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CarClaimDialog from "@/components/CarClaimDialog";
import { Car, Search, CheckCircle } from "lucide-react";

const AddCar = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { lookupVehicle, checkAndSaveCar, saveCar, claimCar, isLoading, isClaiming } = useVegvesenLookup();
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicleData, setVehicleData] = useState<any>(null);
  const [claimDialogOpen, setClaimDialogOpen] = useState(false);
  const [claimInfo, setClaimInfo] = useState<any>(null);

  // Manual car data form
  const [manualData, setManualData] = useState({
    make: "",
    model: "",
    year: "",
    mileage: "",
    fuelType: "",
    engineSize: ""
  });

  const handleVegvesenLookup = async () => {
    if (!licensePlate.trim()) {
      toast({
        title: "Feil",
        description: "Vennligst skriv inn registreringsnummer",
        variant: "destructive"
      });
      return;
    }

    const data = await lookupVehicle(licensePlate);
    if (data) {
      setVehicleData(data);
    }
  };

  const handleSaveVegvesenData = async () => {
    if (!vehicleData) return;

    const result = await checkAndSaveCar(vehicleData);
    if (result.success) {
      // Reset form
      setVehicleData(null);
      setLicensePlate("");
    } else if (result.claimInfo) {
      // Show claim dialog
      setClaimInfo(result.claimInfo);
      setClaimDialogOpen(true);
    }
  };

  const handleClaimCar = async () => {
    if (!claimInfo?.car_id) return;
    
    const success = await claimCar(claimInfo.car_id);
    if (success) {
      setClaimDialogOpen(false);
      setClaimInfo(null);
      setVehicleData(null);
      setLicensePlate("");
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate manual data
    if (!manualData.make || !manualData.model || !manualData.year || !licensePlate) {
      toast({
        title: "Feil",
        description: "Vennligst fyll ut alle obligatoriske felt",
        variant: "destructive"
      });
      return;
    }

    const carData = {
      licensePlate: licensePlate.toUpperCase(),
      make: manualData.make,
      model: manualData.model,
      year: parseInt(manualData.year),
      fuelType: manualData.fuelType,
      engineSize: manualData.engineSize,
      mileage: manualData.mileage ? parseInt(manualData.mileage) : undefined
    };

    const result = await checkAndSaveCar(carData);
    if (result.success) {
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
    } else if (result.claimInfo) {
      // Show claim dialog
      setClaimInfo(result.claimInfo);
      setClaimDialogOpen(true);
    }
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
          {/* Automatic registration via Vegvesenet */}
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
              
              {!vehicleData ? (
                <Button 
                  onClick={handleVegvesenLookup}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? "Henter data..." : "Hent bildata"}
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">Bildata hentet</span>
                    </div>
                    <div className="space-y-1 text-sm text-green-700">
                      <p><strong>Merke:</strong> {vehicleData.make}</p>
                      <p><strong>Modell:</strong> {vehicleData.model}</p>
                      <p><strong>Årsmodell:</strong> {vehicleData.year}</p>
                      <p><strong>Drivstoff:</strong> {vehicleData.fuelType}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={handleSaveVegvesenData} className="flex-1" disabled={isLoading}>
                      Registrer bil
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setVehicleData(null)}
                      className="flex-1"
                    >
                      Søk på nytt
                    </Button>
                  </div>
                </div>
              )}
              
              <p className="text-xs text-gray-500">
                *Du kan gjøre maks 10 oppslag per dag
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
                <div className="space-y-2">
                  <Label htmlFor="manualLicensePlate">Registreringsnummer *</Label>
                  <Input
                    id="manualLicensePlate"
                    placeholder="AB12345"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                    maxLength={7}
                    required
                  />
                </div>

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

                <Button type="submit" className="w-full" disabled={isLoading}>
                  Registrer bil
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Car Claim Dialog */}
        {claimInfo && (
          <CarClaimDialog
            isOpen={claimDialogOpen}
            onClose={() => setClaimDialogOpen(false)}
            onClaim={handleClaimCar}
            carInfo={claimInfo.car_info}
            documentCount={claimInfo.document_count || 0}
            isClaiming={isClaiming}
          />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default AddCar;
