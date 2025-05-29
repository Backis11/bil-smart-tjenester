
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const InformationNotice: React.FC = () => {
  return (
    <Card className="border-0 shadow-sm bg-yellow-50 border-yellow-200">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-sm font-bold">!</span>
          </div>
          <div>
            <p className="font-medium text-yellow-800 mb-1">
              Verdivurdering ikke tilgjengelig
            </p>
            <p className="text-sm text-yellow-700">
              Vi jobber med å implementere verdivurdering basert på markedsdata. 
              Denne funksjonen vil være tilgjengelig snart.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InformationNotice;
