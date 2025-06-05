
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
        <div className="relative">
          <Button variant="outline" className="w-full justify-start opacity-50" disabled>
            <Shield className="h-4 w-4 mr-2" />
            Book service
          </Button>
          <Badge variant="secondary" className="absolute -top-2 -right-2 bg-gray-100 text-gray-600 text-xs">
            Kommer snart
          </Badge>
        </div>
        <Link to="/documents">
          <Button variant="outline" className="w-full justify-start">
            <FileText className="h-4 w-4 mr-2" />
            Se dokumenter
          </Button>
        </Link>
        <div className="relative">
          <Button variant="outline" className="w-full justify-start opacity-50" disabled>
            <Gauge className="h-4 w-4 mr-2" />
            Verdivurdering
          </Button>
          <Badge variant="secondary" className="absolute -top-2 -right-2 bg-gray-100 text-gray-600 text-xs">
            Kommer snart
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
