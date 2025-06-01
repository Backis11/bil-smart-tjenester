
import Header from "@/components/Header";

const CarDetailLoading = () => {
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
};

export default CarDetailLoading;
