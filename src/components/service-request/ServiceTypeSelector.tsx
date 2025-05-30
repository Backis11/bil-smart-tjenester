
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface ServiceTypeSelectorProps {
  selectedServiceType: string;
  onServiceTypeChange: (serviceType: string) => void;
}

const ServiceTypeSelector = ({ selectedServiceType, onServiceTypeChange }: ServiceTypeSelectorProps) => {
  const serviceTypes = [
    { id: 'service', name: 'Service', icon: '🔧' },
    { id: 'eu-control', name: 'EU-kontroll', icon: '✅' },
    { id: 'tire-change', name: 'Dekkskift', icon: '🛞' },
    { id: 'paint-repair', name: 'Lakkreparatur', icon: '🎨' },
    { id: 'brake-service', name: 'Bremseservice', icon: '🛑' },
    { id: 'other', name: 'Annet', icon: '❓' },
  ];

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Type tjeneste *
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {serviceTypes.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => onServiceTypeChange(service.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedServiceType === service.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl mb-1">{service.icon}</div>
              <p className="font-medium text-gray-900">{service.name}</p>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceTypeSelector;
