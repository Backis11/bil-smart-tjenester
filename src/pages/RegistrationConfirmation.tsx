
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Mail, ArrowLeft } from "lucide-react";

const RegistrationConfirmation = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/auth" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Tilbake til innlogging
        </Link>
        
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-800">Registrering vellykket!</CardTitle>
          </CardHeader>
          
          <CardContent className="text-center space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-gray-700">
                Vi har sendt en bekreftelseslenke til din e-postadresse.
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Sjekk innboksen din og klikk på lenken for å aktivere kontoen din.
              </p>
              <p className="text-sm text-gray-600">
                Etter at du har bekreftet e-posten din, kan du logge inn og se din registrerte bil under "Mine biler".
              </p>
            </div>
            
            <div className="pt-4">
              <Link to="/auth?tab=login">
                <Button className="w-full">
                  Gå til innlogging
                </Button>
              </Link>
            </div>
            
            <p className="text-xs text-gray-500">
              Ikke fått e-post? Sjekk spam-mappen din eller prøv å registrere deg på nytt.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RegistrationConfirmation;
