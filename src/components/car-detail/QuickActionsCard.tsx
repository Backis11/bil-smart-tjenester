
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, Gauge } from "lucide-react";

interface QuickActionsCardProps {
  carId: string;
}

const QuickActionsCard = ({ carId }: QuickActionsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hurtighandlinger</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Link to="/services">
          <Button variant="outline" className="w-full justify-start">
            <Shield className="h-4 w-4 mr-2" />
            Book service
          </Button>
        </Link>
        <Link to="/documents">
          <Button variant="outline" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            Se dokumenter
          </Button>
        </Link>
        <Link to={`/valuation/${carId}`}>
          <Button variant="outline" className="w-full justify-start">
            <Gauge className="h-4 w-4 mr-2" />
            Verdivurdering
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
