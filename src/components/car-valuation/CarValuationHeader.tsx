
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CarValuationHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button 
      variant="ghost" 
      onClick={() => navigate(-1)}
      className="mb-4 p-2 hover:bg-gray-100"
    >
      <ArrowLeft className="h-4 w-4 mr-2" />
      Tilbake
    </Button>
  );
};

export default CarValuationHeader;
