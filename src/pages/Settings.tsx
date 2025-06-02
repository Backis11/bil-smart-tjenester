
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Settings as SettingsIcon, Bell, Shield, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      toast({
        title: "Logget ut",
        description: "Du er nå logget ut av systemet",
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        title: "Feil ved utlogging",
        description: error.message || "Noe gikk galt, prøv igjen",
        variant: "destructive",
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) {
      toast({
        title: "Feil",
        description: "Ingen bruker å slette",
        variant: "destructive",
      });
      return;
    }
    
    setIsDeleting(true);
    try {
      console.log('Starting account deletion for user:', user.id);
      
      // Get the current session token
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session?.access_token) {
        console.error('Session error:', sessionError);
        throw new Error('Kunne ikke hente brukerøkt');
      }

      // Call our edge function to delete the user
      const { data, error } = await supabase.functions.invoke('delete-user', {
        headers: {
          Authorization: `Bearer ${sessionData.session.access_token}`,
        },
      });
      
      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Feil ved sletting av konto');
      }

      console.log('Delete function response:', data);

      toast({
        title: "Konto slettet",
        description: "Din konto og alle tilhørende data er permanent slettet",
      });
      
      // Navigate to home page after successful deletion
      navigate("/");
    } catch (error: any) {
      console.error('Delete account error:', error);
      
      let errorMessage = "Noe gikk galt, prøv igjen";
      
      // Handle specific error types
      if (error.message.includes('Unauthorized')) {
        errorMessage = "Du er ikke autorisert til å utføre denne handlingen";
      } else if (error.message.includes('Network')) {
        errorMessage = "Nettverksfeil, sjekk internetttilkoblingen din";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Feil ved sletting av konto",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <SettingsIcon className="h-8 w-8 mr-3" />
            Innstillinger
          </h1>
          <p className="text-gray-600 mt-2">Administrer dine kontoinnstillinger og preferanser</p>
        </div>

        <div className="space-y-6">
          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Varslinger
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">E-postvarslinger</Label>
                  <p className="text-sm text-gray-600">Motta varslinger på e-post</p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS-varslinger</Label>
                  <p className="text-sm text-gray-600">Motta varslinger på SMS</p>
                </div>
                <Switch id="sms-notifications" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketing-emails">Markedsføring</Label>
                  <p className="text-sm text-gray-600">Motta tilbud og nyheter</p>
                </div>
                <Switch id="marketing-emails" />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Personvern og sikkerhet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="profile-visibility">Offentlig profil</Label>
                  <p className="text-sm text-gray-600">Gjør profilen din synlig for andre brukere</p>
                </div>
                <Switch id="profile-visibility" />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-sharing">Datadeling</Label>
                  <p className="text-sm text-gray-600">Del anonymiserte data for å forbedre tjenesten</p>
                </div>
                <Switch id="data-sharing" defaultChecked />
              </div>

              <Separator />
              
              <div>
                <Button variant="outline" className="w-full sm:w-auto">
                  Endre passord
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <Trash2 className="h-5 w-5 mr-2" />
                Farlige handlinger
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-medium text-red-900 mb-2">Slett konto</h3>
                <p className="text-sm text-red-700 mb-4">
                  Dette vil permanent slette kontoen din og alle tilhørende data inkludert biler, dokumenter og tjenesterequester. Denne handlingen kan ikke angres.
                </p>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" disabled={isDeleting}>
                      {isDeleting ? "Sletter..." : "Slett konto"}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Er du sikker?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Dette vil permanent slette kontoen din og alle tilhørende data inkludert biler, dokumenter og tjenesterequester. 
                        Denne handlingen kan ikke angres.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel disabled={isDeleting}>Avbryt</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        disabled={isDeleting}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {isDeleting ? "Sletter..." : "Ja, slett kontoen min"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              
              <Separator />
              
              <div>
                <Button 
                  variant="outline" 
                  onClick={handleSignOut} 
                  disabled={isSigningOut}
                  className="w-full sm:w-auto"
                >
                  {isSigningOut ? "Logger ut..." : "Logg ut"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
