
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calculator, 
  FileCheck, 
  Wrench, 
  Car,
  FileText,
  DollarSign
} from "lucide-react";

const ServiceCards = () => {
  const services = [
    {
      title: "Verdivurdering",
      description: "Få en nøyaktig vurdering av bilens verdi",
      icon: Calculator,
      link: "/valuation",
      color: "bg-green-50 text-green-600",
      hoverColor: "hover:bg-green-100"
    },
    {
      title: "EU-kontroll",
      description: "Book time for EU-kontroll hos godkjente verksteder",
      icon: FileCheck,
      link: "/services?service=eu-kontroll",
      color: "bg-orange-50 text-orange-600",
      hoverColor: "hover:bg-orange-100"
    },
    {
      title: "Service og reparasjon",
      description: "Finn verksted og få tilbud på service",
      icon: Wrench,
      link: "/get-quote",
      color: "bg-purple-50 text-purple-600",
      hoverColor: "hover:bg-purple-100"
    },
    {
      title: "Registrer ny bil",
      description: "Legg til en ny bil i din digitale bilmappe",
      icon: Car,
      link: "/add-car",
      color: "bg-indigo-50 text-indigo-600",
      hoverColor: "hover:bg-indigo-100"
    },
    {
      title: "Mine dokumenter",
      description: "Se alle dokumenter og historikk for dine biler",
      icon: FileText,
      link: "/documents",
      color: "bg-teal-50 text-teal-600",
      hoverColor: "hover:bg-teal-100"
    },
    {
      title: "Selg bil",
      description: "Få hjelp til å selge bilen din trygt og enkelt",
      icon: DollarSign,
      link: "/sell-car",
      color: "bg-emerald-50 text-emerald-600",
      hoverColor: "hover:bg-emerald-100"
    }
  ];

  return (
    <div>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Hva skal du i dag?
        </h2>
        <p className="text-gray-600">
          Velg en tjeneste for å komme i gang
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {services.map((service, index) => (
          <Link key={index} to={service.link}>
            <Card className={`hover:shadow-lg transition-all duration-200 cursor-pointer ${service.hoverColor} h-full`}>
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${service.color}`}>
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" size="lg" asChild>
          <Link to="/services">
            Finn verksted
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ServiceCards;
