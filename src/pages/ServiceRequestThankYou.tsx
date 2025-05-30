
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Phone, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';

const ServiceRequestThankYou = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Takk for din forespørsel!</h1>
          <p className="text-gray-600">Vi har mottatt din forespørsel og sender den videre til verksteder i ditt område.</p>
        </div>

        <div className="space-y-6">
          {/* Status Card */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                Hva skjer nå?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Forespørsel sendt</p>
                    <p className="text-sm text-gray-600">Din forespørsel er nå sendt til relevante verksteder</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-900">Verksteder vurderer</p>
                    <p className="text-sm text-gray-600">Verkstedene ser på din forespørsel og lager tilbud</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-gray-500">Du mottar tilbud</p>
                    <p className="text-sm text-gray-500">Innen 24 timer får du tilbud på e-post</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="border-0 shadow-sm bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900 mb-1">Trenger du hjelp?</p>
                  <p className="text-sm text-blue-800">
                    Hvis du har spørsmål om din forespørsel, kan du kontakte oss på <strong>22 12 34 56</strong> eller 
                    <strong> post@bilservice.no</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link to="/">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Tilbake til forsiden
              </Button>
            </Link>
            
            <Link to="/get-quote">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Send ny forespørsel
              </Button>
            </Link>
          </div>

          {/* Tips */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Tips mens du venter</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Sammenlign tilbudene du mottar nøye</li>
                <li>• Se på verkstedenes anmeldelser og vurderinger</li>
                <li>• Spør om garantier og service etter arbeidet</li>
                <li>• Bekreft pris og leveringstid før du godtar</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestThankYou;
