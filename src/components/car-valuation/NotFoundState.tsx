
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const NotFoundState: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="text-center py-8">
          <p className="text-gray-500">Bil ikke funnet</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            Tilbake til forsiden
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundState;
