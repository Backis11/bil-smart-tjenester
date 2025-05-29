
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CarData {
  mileage?: number;
  year?: number;
}

interface KeyStatsCardProps {
  carData: CarData;
  daysLeft: number | null;
  isEUControlSoon: boolean;
}

const KeyStatsCard = ({ carData, daysLeft, isEUControlSoon }: KeyStatsCardProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Nøkkelinformasjon</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {carData.mileage && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Kilometerstand</span>
            <span className="font-medium">{carData.mileage.toLocaleString()} km</span>
          </div>
        )}
        {daysLeft !== null && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Neste EU-kontroll</span>
            <span className={`font-medium ${isEUControlSoon ? 'text-orange-600' : ''}`}>
              {daysLeft > 0 ? `${daysLeft} dager` : 'Utgått'}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Status</span>
          <Badge variant={!isEUControlSoon ? "default" : "secondary"} className={!isEUControlSoon ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
            {!isEUControlSoon ? "Grønn" : "Gul"}
          </Badge>
        </div>
        {carData.year && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Årsmodell</span>
            <span className="font-medium">{carData.year}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default KeyStatsCard;
