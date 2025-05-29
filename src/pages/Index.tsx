
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Car, Settings, FileText, PlusCircle, TrendingUp, MapPin } from 'lucide-react';

const Index = () => {
  const actionCards = [
    { icon: Settings, title: 'Service', color: 'bg-blue-500', href: '/services' },
    { icon: Car, title: 'EU-kontroll', color: 'bg-green-500', href: '/eu-control' },
    { icon: Settings, title: 'Vaske bil', color: 'bg-purple-500', href: '/car-wash' },
    { icon: FileText, title: 'Dokumenter', color: 'bg-orange-500', href: '/documents' },
    { icon: PlusCircle, title: 'Få tilbud', color: 'bg-red-500', href: '/get-quote' },
    { icon: TrendingUp, title: 'Selg bil', color: 'bg-indigo-500', href: '/sell-car' },
    { icon: TrendingUp, title: 'Verdivurdering', color: 'bg-emerald-500', href: '/valuation' },
  ];

  const nearbyWorkshops = [
    { name: 'Olsens Bil', rating: 4.8, distance: '0.5 km', price: 'Fra 850 kr' },
    { name: 'Service Express', rating: 4.6, distance: '1.2 km', price: 'Fra 750 kr' },
    { name: 'Auto Nordica', rating: 4.9, distance: '2.1 km', price: 'Fra 920 kr' },
  ];

  const userCars = [
    { plate: 'AB12345', brand: 'Toyota', model: 'Corolla', euControlDays: 45 },
    { plate: 'CD67890', brand: 'BMW', model: 'X3', euControlDays: 120 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">God morgen, Ola</h1>
              <p className="text-gray-600">Hva skal du i dag?</p>
            </div>
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              O
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input 
            placeholder="Søk etter verksted eller tjeneste"
            className="pl-10 h-12 bg-white rounded-xl border-gray-200"
          />
        </div>

        {/* Action Cards Grid */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Tjenester</h2>
          <div className="grid grid-cols-2 gap-3">
            {actionCards.map((card, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center text-center space-y-2">
                  <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
                    <card.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{card.title}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* My Cars Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Mine biler</h2>
            <Button variant="ghost" size="sm" className="text-blue-600">
              Se alle
            </Button>
          </div>
          <div className="space-y-3">
            {userCars.map((car, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Car className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{car.brand} {car.model}</p>
                        <p className="text-sm text-gray-600">{car.plate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        Neste EU-kontroll
                      </p>
                      <p className={`text-sm ${car.euControlDays < 60 ? 'text-red-600' : 'text-green-600'}`}>
                        {car.euControlDays} dager
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Nearby Workshops */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Beste verksteder nær deg</h2>
            <Button variant="ghost" size="sm" className="text-blue-600">
              Se alle
            </Button>
          </div>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {nearbyWorkshops.map((workshop, index) => (
              <Card key={index} className="flex-shrink-0 w-64 border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{workshop.name}</h3>
                      <div className="flex items-center space-x-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-gray-600">{workshop.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{workshop.distance}</span>
                    </div>
                    <p className="text-sm font-medium text-green-600">{workshop.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Add Car Button */}
        <Card className="border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors cursor-pointer">
          <CardContent className="p-6 text-center">
            <PlusCircle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600 font-medium">Legg til bil</p>
            <p className="text-sm text-gray-500">Få tilpassede anbefalinger</p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 py-2">
          {[
            { icon: 'home', label: 'Hjem', active: true },
            { icon: 'search', label: 'Søk', active: false },
            { icon: 'file', label: 'Bookinger', active: false },
            { icon: 'user', label: 'Profil', active: false },
          ].map((item, index) => (
            <button key={index} className="flex flex-col items-center py-2 px-1">
              <div className={`w-6 h-6 mb-1 ${item.active ? 'text-blue-600' : 'text-gray-400'}`}>
                {/* Icon placeholder */}
                <div className="w-full h-full bg-current rounded" style={{ opacity: 0.3 }} />
              </div>
              <span className={`text-xs ${item.active ? 'text-blue-600' : 'text-gray-400'}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
