
export interface VehicleData {
  licensePlate: string;
  make: string;
  model: string;
  year: number | null;
  vin: string;
  fuelType: string;
  engineSize: string;
  registrationDate: string | null;
  technicalApprovalDate: string | null;
  inspectionDueDate: string | null;
  ownWeight: number | null;
  totalWeight: number | null;
  tireDimensions: string;
  rimDimensions: string;
  horsePower: number | null;
  co2Emissions: number | null;
}

export interface VegvesenApiResponse {
  kjoretoydataListe?: any[];
}
