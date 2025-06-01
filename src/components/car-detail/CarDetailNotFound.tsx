
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const CarDetailNotFound = () => {
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
};

export default CarDetailNotFound;
