
import { VehicleData } from './types.ts';

export function extractVehicleData(responseData: any, licensePlate: string): VehicleData {
  const vehicleData = responseData.kjoretoydataListe?.[0];
  if (!vehicleData) {
    throw new Error('No vehicle data found for this license plate');
  }

  console.log('🔍 Extracting vehicle data...');
  
  const tekniskData = vehicleData.godkjenning?.tekniskGodkjenning?.tekniskeData?.generelt;
  const registrering = vehicleData.forstegangsregistrering || vehicleData.registrering;
  const motorData = vehicleData.godkjenning?.tekniskGodkjenning?.tekniskeData?.motorOgDrivverk?.[0];
  const kjoretoyId = vehicleData.kjoretoyId;
  const periodiskKontroll = vehicleData.periodiskKjoretoyKontroll;
  const karosseriOgLasteplan = vehicleData.godkjenning?.tekniskGodkjenning?.tekniskeData?.karosseriOgLasteplan;
  const dekkOgFelg = vehicleData.godkjenning?.tekniskGodkjenning?.tekniskeData?.dekkOgFelg;
  const miljodata = vehicleData.godkjenning?.tekniskGodkjenning?.tekniskeData?.miljodata;
  
  const make = extractMake(tekniskData, vehicleData);
  const model = extractModel(tekniskData);
  const year = extractYear(registrering);
  const vin = extractVin(kjoretoyId);
  const fuelType = extractFuelType(motorData, vehicleData, make, model);
  const engineSize = extractEngineSize(motorData);
  const inspectionDueDate = extractInspectionDueDate(periodiskKontroll);
  const { ownWeight, totalWeight } = extractWeightInfo(karosseriOgLasteplan);
  const { tireDimensions, rimDimensions } = extractTireInfo(dekkOgFelg);
  const horsePower = extractHorsePower(motorData);
  const co2Emissions = extractCo2Emissions(miljodata);
  const technicalApprovalDate = extractTechnicalApprovalDate(vehicleData);

  const formattedData: VehicleData = {
    licensePlate: licensePlate,
    make: make,
    model: model,
    year: year,
    vin: vin,
    fuelType: fuelType,
    engineSize: engineSize,
    registrationDate: registrering?.registrertForstegangNorgeDato || registrering?.forstegangRegistrertDato || null,
    technicalApprovalDate: technicalApprovalDate,
    inspectionDueDate: inspectionDueDate,
    ownWeight: ownWeight,
    totalWeight: totalWeight,
    tireDimensions: tireDimensions,
    rimDimensions: rimDimensions,
    horsePower: horsePower,
    co2Emissions: co2Emissions
  };

  logExtractedData(formattedData);
  return formattedData;
}

function extractMake(tekniskData: any, vehicleData: any): string {
  if (tekniskData?.merke?.[0]?.merke) {
    return tekniskData.merke[0].merke;
  } else if (tekniskData?.fabrikant?.[0]?.fabrikantNavn) {
    return tekniskData.fabrikant[0].fabrikantNavn;
  } else if (vehicleData.godkjenning?.tekniskGodkjenning?.kjoretoyklassifisering?.beskrivelse) {
    return vehicleData.godkjenning.tekniskGodkjenning.kjoretoyklassifisering.beskrivelse;
  }
  return '';
}

function extractModel(tekniskData: any): string {
  if (tekniskData?.handelsbetegnelse?.[0]) {
    return tekniskData.handelsbetegnelse[0];
  } else if (tekniskData?.typebetegnelse) {
    return tekniskData.typebetegnelse;
  }
  return '';
}

function extractYear(registrering: any): number | null {
  if (registrering?.registrertForstegangNorgeDato) {
    return new Date(registrering.registrertForstegangNorgeDato).getFullYear();
  } else if (registrering?.forstegangRegistrertDato) {
    return new Date(registrering.forstegangRegistrertDato).getFullYear();
  }
  return null;
}

function extractVin(kjoretoyId: any): string {
  return kjoretoyId?.understellsnummer || '';
}

function extractFuelType(motorData: any, vehicleData: any, make: string, model: string): string {
  let fuelType = '';
  
  if (motorData?.drivstoff?.[0]?.drivstoffKode?.beskrivelse) {
    fuelType = motorData.drivstoff[0].drivstoffKode.beskrivelse;
  } else if (motorData?.drivstoff?.[0]?.drivstoffKode?.kodeNavn) {
    fuelType = motorData.drivstoff[0].drivstoffKode.kodeNavn;
  } else if (motorData?.motor?.drivstoffKode?.beskrivelse) {
    fuelType = motorData.motor.drivstoffKode.beskrivelse;
  } else if (motorData?.motor?.drivstoffKode?.kodeNavn) {
    fuelType = motorData.motor.drivstoffKode.kodeNavn;
  } else if (vehicleData.godkjenning?.tekniskGodkjenning?.tekniskeData?.motorOgDrivverk) {
    const allMotorData = vehicleData.godkjenning.tekniskGodkjenning.tekniskeData.motorOgDrivverk;
    console.log('🔍 Motor data type:', typeof allMotorData, 'Is array:', Array.isArray(allMotorData));
    
    if (Array.isArray(allMotorData)) {
      for (const motor of allMotorData) {
        if (motor.drivstoff?.[0]?.drivstoffKode?.beskrivelse) {
          fuelType = motor.drivstoff[0].drivstoffKode.beskrivelse;
          break;
        }
      }
    } else if (allMotorData && typeof allMotorData === 'object') {
      if (allMotorData.drivstoff?.[0]?.drivstoffKode?.beskrivelse) {
        fuelType = allMotorData.drivstoff[0].drivstoffKode.beskrivelse;
      }
    }
  }
  
  // Special handling for known electric vehicles
  if (!fuelType && (make === 'TESLA' || model?.toLowerCase().includes('electric') || model?.toLowerCase().includes('ev'))) {
    fuelType = 'Elektrisk';
  }
  
  return fuelType;
}

function extractEngineSize(motorData: any): string {
  if (motorData?.motor?.slagvolum) {
    return `${motorData.motor.slagvolum}L`;
  } else if (motorData?.effekt) {
    return `${motorData.effekt}kW`;
  } else if (motorData?.motor?.maksEffekt) {
    return `${motorData.motor.maksEffekt}kW`;
  }
  return '';
}

function extractInspectionDueDate(periodiskKontroll: any): string | null {
  return periodiskKontroll?.kontrollfrist || null;
}

function extractWeightInfo(karosseriOgLasteplan: any): { ownWeight: number | null, totalWeight: number | null } {
  return {
    ownWeight: karosseriOgLasteplan?.egenvekt || null,
    totalWeight: karosseriOgLasteplan?.tekniskTillattTotalvekt || null
  };
}

function extractTireInfo(dekkOgFelg: any): { tireDimensions: string, rimDimensions: string } {
  let tireDimensions = '';
  let rimDimensions = '';
  
  if (dekkOgFelg?.length > 0) {
    const primary = dekkOgFelg[0];
    if (primary.dekkdimensjon) {
      tireDimensions = primary.dekkdimensjon;
    }
    if (primary.felgdimensjon) {
      rimDimensions = primary.felgdimensjon;
    }
  }
  
  return { tireDimensions, rimDimensions };
}

function extractHorsePower(motorData: any): number | null {
  if (motorData?.motor?.maksEffekt) {
    return Math.round(motorData.motor.maksEffekt * 1.36);
  }
  return null;
}

function extractCo2Emissions(miljodata: any): number | null {
  return miljodata?.co2Utslipp || null;
}

function extractTechnicalApprovalDate(vehicleData: any): string | null {
  if (vehicleData.godkjenning?.tekniskGodkjenning?.gyldigFraDato) {
    return vehicleData.godkjenning.tekniskGodkjenning.gyldigFraDato;
  } else if (vehicleData.godkjenning?.godkjenningsDato) {
    return vehicleData.godkjenning.godkjenningsDato;
  }
  return null;
}

function logExtractedData(data: VehicleData): void {
  console.log('📋 Extracted data summary:');
  console.log('- Make:', data.make);
  console.log('- Model:', data.model); 
  console.log('- Year:', data.year);
  console.log('- Fuel type:', data.fuelType);
  console.log('- Engine size:', data.engineSize);
  console.log('- VIN:', data.vin);
  console.log('- EU-kontroll due:', data.inspectionDueDate);
  console.log('- Own weight:', data.ownWeight);
  console.log('- Total weight:', data.totalWeight);
  console.log('- Tire dimensions:', data.tireDimensions);
  console.log('- Rim dimensions:', data.rimDimensions);
  console.log('- Horsepower:', data.horsePower);
  console.log('- CO2 emissions:', data.co2Emissions);
}
