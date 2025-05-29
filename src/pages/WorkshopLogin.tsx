
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";

const WorkshopLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle workshop login logic here
    console.log("Workshop login:", { email, password });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-md mx-auto pt-16 px-4">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Tilbake til hovedside
        </Link>
        
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Verkstedsinnlogging</CardTitle>
            <p className="text-gray-600">Logg inn for å administrere ditt verksted</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">E-postadresse</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="verksted@example.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password">Passord</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                Logg inn
              </Button>
              
              <div className="text-center space-y-2">
                <Link to="/workshop-forgot-password" className="text-sm text-blue-600 hover:underline">
                  Glemt passord?
                </Link>
                <div className="text-sm text-gray-600">
                  Nytt verksted?{" "}
                  <Link to="/workshop-register" className="text-blue-600 hover:underline">
                    Registrer deg her
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkshopLogin;
