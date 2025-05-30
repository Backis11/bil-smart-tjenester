
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Wrench, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { signIn, signUp, resetPassword } = useAuth();
  const { toast } = useToast();
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Login form state
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  
  // Registration form state
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    licensePlate: "",
    kmStand: "",
    password: "",
    confirmPassword: ""
  });
  
  // Reset password state
  const [resetEmail, setResetEmail] = useState("");
  
  const defaultTab = searchParams.get('tab') || 'login';

  // Prevent zoom on iOS when focusing input fields
  useEffect(() => {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    return () => {
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await signIn(loginData.email, loginData.password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Innlogging feilet",
            description: "Ugyldig e-post eller passord",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Innlogging feilet",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }
      
      if (data.user) {
        toast({
          title: "Velkommen!",
          description: "Du er nå logget inn",
        });
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Noe gikk galt",
        description: "Prøv igjen senere",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.password !== registerData.confirmPassword) {
      toast({
        title: "Passordene stemmer ikke overens",
        description: "Kontroller at begge passord er like",
        variant: "destructive",
      });
      return;
    }
    
    if (registerData.password.length < 6) {
      toast({
        title: "Passordet er for kort",
        description: "Passordet må være minst 6 tegn",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const { data, error } = await signUp(registerData.email, registerData.password, {
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        phone: registerData.phone,
        licensePlate: registerData.licensePlate,
        kmStand: registerData.kmStand
      });
      
      if (error) {
        if (error.message.includes('User already registered')) {
          toast({
            title: "Bruker eksisterer allerede",
            description: "En bruker med denne e-posten er allerede registrert",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Registrering feilet",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }
      
      toast({
        title: "Registrering vellykket!",
        description: "Du kan nå logge inn med din nye konto",
      });
      
      // Switch to login tab
      navigate('/auth?tab=login');
      
    } catch (error: any) {
      toast({
        title: "Noe gikk galt",
        description: "Prøv igjen senere",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await resetPassword(resetEmail);
      
      if (error) {
        toast({
          title: "Feil ved tilbakestilling",
          description: error.message,
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "E-post sendt!",
        description: "Sjekk innboksen din for instruksjoner om å tilbakestille passordet",
      });
      
    } catch (error: any) {
      toast({
        title: "Noe gikk galt",
        description: "Prøv igjen senere",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Tilbake til hovedside
        </Link>
        
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Wrench className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Velkommen til Wrench</CardTitle>
            <p className="text-gray-600">Din digitale bilmappe</p>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue={defaultTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="login">Logg inn</TabsTrigger>
                <TabsTrigger value="register">Registrer</TabsTrigger>
                <TabsTrigger value="reset">Glemt passord</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">E-postadresse</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      placeholder="din@epost.no"
                      className="text-base" // Prevent zoom on iOS
                      autoComplete="email"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="login-password">Passord</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                        placeholder="••••••••"
                        className="text-base pr-10" // Prevent zoom on iOS
                        autoComplete="current-password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Logger inn..." : "Logg inn"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Fornavn</Label>
                      <Input
                        id="firstName"
                        value={registerData.firstName}
                        onChange={(e) => setRegisterData({...registerData, firstName: e.target.value})}
                        placeholder="Ola"
                        className="text-base"
                        autoComplete="given-name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Etternavn</Label>
                      <Input
                        id="lastName"
                        value={registerData.lastName}
                        onChange={(e) => setRegisterData({...registerData, lastName: e.target.value})}
                        placeholder="Nordmann"
                        className="text-base"
                        autoComplete="family-name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="register-email">E-postadresse</Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                      placeholder="din@epost.no"
                      className="text-base"
                      autoComplete="email"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Telefonnummer</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={registerData.phone}
                      onChange={(e) => setRegisterData({...registerData, phone: e.target.value})}
                      placeholder="12345678"
                      className="text-base"
                      autoComplete="tel"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="licensePlate">Registreringsnummer</Label>
                    <Input
                      id="licensePlate"
                      value={registerData.licensePlate}
                      onChange={(e) => setRegisterData({...registerData, licensePlate: e.target.value.toUpperCase()})}
                      placeholder="AB12345"
                      className="text-base"
                      maxLength={7}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="kmStand">Kilometerstand (valgfritt)</Label>
                    <Input
                      id="kmStand"
                      type="number"
                      value={registerData.kmStand}
                      onChange={(e) => setRegisterData({...registerData, kmStand: e.target.value})}
                      placeholder="50000"
                      className="text-base"
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="register-password">Passord</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        value={registerData.password}
                        onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                        placeholder="••••••••"
                        className="text-base pr-10"
                        autoComplete="new-password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword">Bekreft passord</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({...registerData, confirmPassword: e.target.value})}
                      placeholder="••••••••"
                      className="text-base"
                      autoComplete="new-password"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Registrerer..." : "Opprett konto"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="reset" className="space-y-4">
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <Label htmlFor="reset-email">E-postadresse</Label>
                    <Input
                      id="reset-email"
                      type="email"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="din@epost.no"
                      className="text-base"
                      autoComplete="email"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Sender..." : "Send tilbakestillingslenke"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
