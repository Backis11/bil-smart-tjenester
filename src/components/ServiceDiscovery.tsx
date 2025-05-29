
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Star, Clock, Phone, Filter, Search } from 'lucide-react';

const ServiceDiscovery = () => {
  const [selectedService, setSelectedService] = useState('Alle');
  const [searchQuery, setSearchQuery] = useState('');

  const serviceFilters = ['Alle', 'Service', 'EU-kontroll', 'Dekkskift', 'Lakkreparatur'];
  
  const workshops = [
    {
      id: 1,
      name: 'Olsens Bil AS',
      rating: 4.8,
      reviewCount: 124,
      distance: '0.5 km',
      address: 'Storgata 15, Oslo',
      phone: '+47 22 33 44 55',
      services: ['Service', 'EU-kontroll', 'Dekkskift'],
      priceRange: 'Fra 850 kr',
      openingHours: 'Åpent til 17:00',
      image: '/api/placeholder/80/80',
      featured: true
    },
    {
      id: 2,
      name: 'Service Express',
      rating: 4.6,
      reviewCount: 89,
      distance: '1.2 km',
      address: 'Industrigata 23, Oslo',
      phone: '+47 22 44 55 66',
      services: ['Service', 'Lakkreparatur'],
      priceRange: 'Fra 750 kr',
      openingHours: 'Åpent til 18:00',
      image: '/api/placeholder/80/80',
      featured: false
    },
    {
      id: 3,
      name: 'Auto Nordica',
      rating: 4.9,
      reviewCount: 156,
      distance: '2.1 km',
      address: 'Bilveien 7, Oslo',
      phone: '+47 22 55 66 77',
      services: ['EU-kontroll', 'Service', 'Dekkskift'],
      priceRange: 'Fra 920 kr',
      openingHours: 'Åpent til 16:00',
      image: '/api/placeholder/80/80',
      featured: true
    },
  ];

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesService = selectedService === 'Alle' || workshop.services.includes(selectedService);
    const matchesSearch = workshop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workshop.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesService && matchesSearch;
  });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Finn verksted</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Søk etter verksted eller område"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 bg-gray-50 border-gray-200 rounded-xl"
          />
        </div>

        {/* Service Filter Pills */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {serviceFilters.map((service) => (
            <button
              key={service}
              onClick={() => setSelectedService(service)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedService === service
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {service}
            </button>
          ))}
        </div>
      </div>

      {/* Map Placeholder */}
      <Card className="border-0 shadow-sm h-48">
        <CardContent className="p-0 h-full bg-gray-100 rounded-xl flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Kart med verksteder</p>
            <p className="text-sm text-gray-400">Google Maps integrasjon</p>
          </div>
        </CardContent>
      </Card>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {filteredWorkshops.length} verksteder funnet
        </h2>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Workshop List */}
      <div className="space-y-4">
        {filteredWorkshops.map((workshop) => (
          <Card key={workshop.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex space-x-4">
                {/* Workshop Image */}
                <div className="w-20 h-20 bg-gray-200 rounded-xl flex-shrink-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg"></div>
                </div>

                {/* Workshop Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 truncate">
                        {workshop.name}
                        {workshop.featured && (
                          <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                            Anbefalt
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{workshop.rating}</span>
                        <span className="text-sm text-gray-500">({workshop.reviewCount})</span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-green-600">{workshop.priceRange}</p>
                  </div>

                  <div className="space-y-1 mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="truncate">{workshop.address} • {workshop.distance}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{workshop.openingHours}</span>
                    </div>
                  </div>

                  {/* Services */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {workshop.services.map((service) => (
                      <span
                        key={service}
                        className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-md"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      Få tilbud
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center pt-4">
        <Button variant="outline" className="w-full">
          Last inn flere verksteder
        </Button>
      </div>
    </div>
  );
};

export default ServiceDiscovery;
