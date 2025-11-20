
import { useAuth } from "@/contexts/MockAuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Calendar } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();

  const getDisplayName = () => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name} ${user.user_metadata.last_name}`;
    }
    return user?.email || "Bruker";
  };

  const getInitials = () => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name[0]}${user.user_metadata.last_name[0]}`.toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || "U";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Min profil</h1>
          <p className="text-gray-600 mt-2">Administrer dine personlige opplysninger</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <div className="mx-auto w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-semibold mb-4">
                {getInitials()}
              </div>
              <CardTitle className="text-xl">{getDisplayName()}</CardTitle>
              <p className="text-gray-600 text-sm">{user?.email}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  Aktiv bruker
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  E-post bekreftet
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personlige opplysninger
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Fornavn</Label>
                    <Input 
                      id="firstName" 
                      defaultValue={user?.user_metadata?.first_name || ''} 
                      placeholder="Skriv inn fornavn"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Etternavn</Label>
                    <Input 
                      id="lastName" 
                      defaultValue={user?.user_metadata?.last_name || ''} 
                      placeholder="Skriv inn etternavn"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">E-postadresse</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={user?.email || ''} 
                    placeholder="din@epost.no"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefonnummer</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="+47 123 45 678"
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button variant="outline">Avbryt</Button>
                  <Button>Lagre endringer</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
