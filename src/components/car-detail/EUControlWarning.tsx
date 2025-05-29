
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface EUControlWarningProps {
  daysLeft: number | null;
}

const EUControlWarning = ({ daysLeft }: EUControlWarningProps) => {
  return (
    <Card className="mb-6 border-orange-200 bg-orange-50">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="h-5 w-5 text-orange-600" />
          <div>
            <p className="font-medium text-orange-800">
              EU-kontroll nærmer seg
            </p>
            <p className="text-sm text-orange-600">
              {daysLeft !== null && daysLeft > 0 ? `${daysLeft} dager igjen` : 'Fristen har gått ut'}
            </p>
          </div>
          <Link to="/services?service=eu-kontroll" className="ml-auto">
            <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
              Book EU-kontroll
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default EUControlWarning;
