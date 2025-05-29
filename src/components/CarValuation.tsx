import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Car, Calendar, MapPin, RefreshCw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

interface CarValuationProps {
  car: {
    id: number;
    brand: string;
    model: string;
    year: number;
    mileage: number;
    licensePlate: string;
    lastValuation?: {
      amount: number;
      date: string;
    };
  };
}

const CarValuation: React.FC<CarValuationProps> = ({ car }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [valuation, setValuation] = useState(car.lastValuation || {
    amount: 285000,
    date: '2024-01-15'
  });

  const handleNewValuation = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setValuation({
        amount: Math.floor(Math.random() * 100000) + 200000,
        date: new Date().toISOString().split('T')[0]
      });
      setIsLoading(false);
    }, 2000);
  };

  const valuationFactors = [
    { factor: 'Kilometerstand', impact: 'Lav', color: 'text-green-600' },
    { factor: 'Alder', impact: 'Middels', color: 'text-yellow-600' },
    { factor: 'Stand', impact: 'God', color: 'text-green-600' },
    { factor: 'Markedstrend', impact: 'Positiv', color: 'text-green-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-4 p-2 hover:bg-gray-100"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Tilbake
        </Button>

        <div className="space-y-4">
          {/* Main Valuation Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-gray-900">
                    {car.brand} {car.model}
                  </CardTitle>
                  <p className="text-gray-600">{car.licensePlate} • {car.year}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Car className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Estimert markedsverdi</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {valuation.amount.toLocaleString('no-NO')} kr
                  </p>
                  <p className="text-sm text-gray-500">
                    Sist oppdatert: {new Date(valuation.date).toLocaleDateString('no-NO')}
                  </p>
                </div>
                
                <Button 
                  onClick={handleNewValuation}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Oppdaterer...
                    </>
                  ) : (
                    <>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Få ny vurdering
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Valuation Factors */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Verdifaktorer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {valuationFactors.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-gray-700">{item.factor}</span>
                    <span className={`font-medium ${item.color}`}>{item.impact}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Market Comparison */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Markedssammenligning</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Gjennomsnittspris (Finn.no)</span>
                  <span className="font-medium">275 000 kr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Din bil</span>
                  <span className="font-medium text-green-600">
                    +{(valuation.amount - 275000).toLocaleString('no-NO')} kr
                  </span>
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    💡 <strong>Tips:</strong> Regelmessig service og dokumentasjon kan øke verdien med opptil 15%.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Valuation History */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Verdihistorikk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium">{valuation.amount.toLocaleString('no-NO')} kr</p>
                    <p className="text-sm text-gray-500">{new Date(valuation.date).toLocaleDateString('no-NO')}</p>
                  </div>
                  <span className="text-green-600 text-sm">Nåværende</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <p className="font-medium">290 000 kr</p>
                    <p className="text-sm text-gray-500">15. des 2023</p>
                  </div>
                  <span className="text-red-600 text-sm">-5 000 kr</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div>
                    <p className="font-medium">295 000 kr</p>
                    <p className="text-sm text-gray-500">1. sep 2023</p>
                  </div>
                  <span className="text-gray-500 text-sm">Historisk</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarValuation;
