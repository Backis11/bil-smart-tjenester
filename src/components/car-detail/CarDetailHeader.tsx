
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";

interface CarDetailHeaderProps {
  carData: {
    make: string;
    model: string;
    license_plate: string;
  };
  isEUControlSoon: boolean;
}

const CarDetailHeader = ({ carData, isEUControlSoon }: CarDetailHeaderProps) => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <Link to="/">
        <Button variant="outline" size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Tilbake
        </Button>
      </Link>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {carData.make} {carData.model}
        </h1>
        <p className="text-gray-600">{carData.license_plate}</p>
      </div>
      <Badge variant={!isEUControlSoon ? "default" : "secondary"} className={!isEUControlSoon ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
        {!isEUControlSoon ? "Grønn" : "Gul"}
      </Badge>
    </div>
  );
};

export default CarDetailHeader;
