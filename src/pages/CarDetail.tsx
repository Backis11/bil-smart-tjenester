
import { useParams } from "react-router-dom";
import { useCarData } from "@/hooks/useMockCarData";
import CarDetailLayout from "@/components/car-detail/CarDetailLayout";
import CarDetailLoading from "@/components/car-detail/CarDetailLoading";
import CarDetailNotFound from "@/components/car-detail/CarDetailNotFound";

const CarDetail = () => {
  const { id } = useParams();
  const {
    carData,
    loading,
    editMode,
    formData,
    setEditMode,
    setFormData,
    handleSave,
    handleCancel
  } = useCarData(id);

  if (loading) {
    return <CarDetailLoading />;
  }

  if (!carData) {
    return <CarDetailNotFound />;
  }

  return (
    <CarDetailLayout
      carData={carData}
      editMode={editMode}
      formData={formData}
      onEdit={() => setEditMode(true)}
      onSave={handleSave}
      onCancel={handleCancel}
      onFormDataChange={setFormData}
    />
  );
};

export default CarDetail;
