
import { useNavigate } from "react-router-dom";
import { useCarClaim } from "./useMockCarClaim";
import { useVegvesenApi } from "./useMockVegvesenApi";
import { useCarRegistration } from "./useMockCarRegistration";

export const useVegvesenLookup = () => {
  const navigate = useNavigate();
  const { checkCarRegistration, claimCar, isChecking, isClaiming } = useCarClaim();
  const { lookupVehicle, isLoading: isLookingUp } = useVegvesenApi();
  const { saveCar } = useCarRegistration();

  const checkAndSaveCar = async (carData: any) => {
    // First check if the car can be registered or needs to be claimed
    const claimResult = await checkCarRegistration(carData.licensePlate);
    
    if (!claimResult) {
      return { success: false, claimInfo: null };
    }

    if (claimResult.action === 'conflict') {
      return { success: false, claimInfo: null };
    }

    if (claimResult.action === 'claim_existing') {
      // Return claim info for the UI to handle
      return { success: false, claimInfo: claimResult };
    }

    // If action is 'create_new', proceed with normal car creation
    return await saveCar(carData);
  };

  const handleClaimCar = async (carId: string) => {
    const success = await claimCar(carId);
    if (success) {
      navigate('/');
    }
    return success;
  };

  return {
    lookupVehicle,
    checkAndSaveCar,
    saveCar,
    claimCar: handleClaimCar,
    isLoading: isLookingUp || isChecking,
    isClaiming
  };
};
