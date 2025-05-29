
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ReactNode } from "react";

interface MobileOptimizedCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const MobileOptimizedCard = ({ children, className = "", onClick }: MobileOptimizedCardProps) => {
  return (
    <Card 
      className={`hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-95 ${className}`}
      onClick={onClick}
    >
      {children}
    </Card>
  );
};

export default MobileOptimizedCard;
