
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Calendar, Car, MapPin, FileText } from 'lucide-react';

const ServiceRequestForm = () => {
  const [formData, setFormData] = useState({
    serviceType: '',
    car: '',
    description: '',
    preferredDate: '',
    location: '',
    images: []
  });

  const serviceTypes = [
    { id: 'service', name: 'Service', icon: '🔧' },
    { id: 'eu-control', name: 'EU-kontroll', icon: '✅' },
    { id: 'tire-change', name: 'Dekkskift', icon: '🛞' },
    { id: 'paint-repair', name: 'Lakkreparatur', icon: '🎨' },
    { id: 'brake-service', name: 'Bremseservice', icon: '🛑' },
    { id: 'other', name: 'Annet', icon: '❓' },
  ];

  const userCars = [
    { id: 1, name: 'Toyota Corolla (AB12345)', year: 2020 },
    { id: 2, name: 'BMW X3 (CD67890)', year: 2018 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Service request submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Be om tilbud</h1>
        <p className="text-gray-600">Fortell oss hva du trenger hjelp med</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Type Selection */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Type tjeneste
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {serviceTypes.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, serviceType: service.id })}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.serviceType === service.id
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

        {/* Car Selection */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Car className="h-5 w-5 mr-2" />
              Velg bil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userCars.map((car) => (
                <button
                  key={car.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, car: car.id.toString() })}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    formData.car === car.id.toString()
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-medium text-gray-900">{car.name}</p>
                  <p className="text-sm text-gray-600">Årsmodell: {car.year}</p>
                </button>
              ))}
              <Button variant="outline" type="button" className="w-full">
                + Legg til ny bil
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Beskrivelse</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Beskriv problemet eller ønsket tjeneste</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="F.eks. Bilen lager rare lyder når jeg bremser..."
                  className="w-full mt-1 p-3 border border-gray-200 rounded-xl min-h-[100px] resize-none"
                />
              </div>
              
              {/* Photo Upload */}
              <div>
                <Label>Last opp bilder (valgfritt)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 font-medium">Legg til bilder</p>
                  <p className="text-sm text-gray-500">Hjelper verkstedet å forstå problemet bedre</p>
                  <Button type="button" variant="outline" className="mt-3">
                    Velg filer
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Date and Location */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Ønsket tid og sted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="date" className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Foretrukket dato
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="location" className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Ønsket område
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="F.eks. Oslo sentrum, eller bruk min posisjon"
                  className="mt-1"
                />
                <Button type="button" variant="outline" size="sm" className="mt-2">
                  Bruk min posisjon
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="space-y-3">
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12">
            Send forespørsel
          </Button>
          <p className="text-sm text-gray-500 text-center">
            Du vil motta tilbud fra verksteder i ditt område innen 24 timer
          </p>
        </div>
      </form>
    </div>
  );
};

export default ServiceRequestForm;
