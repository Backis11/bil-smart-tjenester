
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import WorkshopRegistrationForm from "@/components/workshop-register/WorkshopRegistrationForm";

const WorkshopRegister = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto pt-8 px-4 pb-16">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Tilbake til hovedside
        </Link>
        
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Registrer verksted</CardTitle>
            <p className="text-gray-600">Bli en del av Wrench-nettverket</p>
          </CardHeader>
          
          <CardContent>
            <WorkshopRegistrationForm />
            
            <div className="text-center text-sm text-gray-600 mt-6">
              Har du allerede en konto?{" "}
              <Link to="/workshop-login" className="text-blue-600 hover:underline">
                Logg inn her
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkshopRegister;
