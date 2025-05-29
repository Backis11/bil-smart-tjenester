
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, MapPin, Phone, Clock, Mail, Award, Users, CheckCircle } from 'lucide-react';
import { allWorkshops } from '@/data/workshops';

const WorkshopDetail = () => {
  const { id } = useParams();
  const workshop = allWorkshops.find(w => w.id === parseInt(id || '0'));
  const [activeTab, setActiveTab] = useState('oversikt');

  if (!workshop) {
    return (
      <div className="p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Verksted ikke funnet</h1>
        <Link to="/services">
          <Button>Tilbake til søk</Button>
        </Link>
      </div>
    );
  }

  const tabs = [
    { id: 'oversikt', label: 'Oversikt' },
    { id: 'tjenester', label: 'Tjenester' },
    { id: 'anmeldelser', label: 'Anmeldelser' },
    { id: 'info', label: 'Kontaktinfo' }
  ];

  const reviews = [
    {
      name: "Lars Hansen",
      rating: 5,
      date: "2024-01-15",
      comment: "Fantastisk service! Fikk bilen tilbake samme dag og prisen var som avtalt."
    },
    {
      name: "Maria Olsen",
      rating: 4,
      date: "2024-01-10",
      comment: "Hyggelig betjening og grundig arbeid. Kommer tilbake!"
    },
    {
      name: "Erik Nordahl",
      rating: 5,
      date: "2024-01-05",
      comment: "Beste verkstedet i området. Ærlige folk og fair priser."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/services">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Tilbake
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{workshop.name}</h1>
              <div className="flex items-center space-x-2 mt-1">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{workshop.rating}</span>
                  <span className="text-sm text-gray-500">({workshop.reviewCount} anmeldelser)</span>
                </div>
                {workshop.featured && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Anbefalt
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200">
          <div className="flex space-x-0 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Oversikt Tab */}
        {activeTab === 'oversikt' && (
          <>
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Link to="/get-quote">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Få tilbud
                </Button>
              </Link>
              <Button variant="outline" onClick={() => window.location.href = `tel:${workshop.phone}`}>
                <Phone className="h-4 w-4 mr-2" />
                Ring
              </Button>
            </div>

            {/* Description */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Om verkstedet</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{workshop.description}</p>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{workshop.address}, {workshop.postalCode} {workshop.city}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{workshop.openingHours}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Specialties */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Spesialiteter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {workshop.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Sertifiseringer
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {workshop.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-gray-600">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Tjenester Tab */}
        {activeTab === 'tjenester' && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Tilgjengelige tjenester</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {workshop.services.map((service, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">{service}</span>
                    <span className="text-sm text-green-600">{workshop.priceRange}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Anmeldelser Tab */}
        {activeTab === 'anmeldelser' && (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {review.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{review.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-2">{new Date(review.date).toLocaleDateString('no-NO')}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Kontaktinfo Tab */}
        {activeTab === 'info' && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Kontaktinformasjon</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium">{workshop.phone}</p>
                    <p className="text-sm text-gray-500">Telefon</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium">{workshop.email}</p>
                    <p className="text-sm text-gray-500">E-post</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">{workshop.address}</p>
                    <p className="font-medium">{workshop.postalCode} {workshop.city}</p>
                    <p className="text-sm text-gray-500">Adresse</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <p className="font-medium">{workshop.openingHours}</p>
                    <p className="text-sm text-gray-500">Åpningstider</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WorkshopDetail;
