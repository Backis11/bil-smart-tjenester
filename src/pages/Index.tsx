
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Wrench, 
  FileText, 
  Car, 
  ShoppingCart, 
  DollarSign,
  MapPin,
  Star,
  Clock,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

const Index = () => {
  const services = [
    { title: "Service", icon: Wrench, description: "Få service på bilen din", color: "bg-blue-100 text-blue-600", link: "/services" },
    { title: "EU-kontroll", icon: Shield, description: "Book EU-kontroll", color: "bg-green-100 text-green-600", link: "/services" },
    { title: "Dokumenter", icon: FileText, description: "Se alle bilpapirer", color: "bg-purple-100 text-purple-600", link: "/documents" },
    { title: "Få tilbud", icon: ShoppingCart, description: "Sammenlign priser", color: "bg-orange-100 text-orange-600", link: "/get-quote" },
    { title: "Verdivurdering", icon: DollarSign, description: "Se bilens verdi", color: "bg-yellow-100 text-yellow-600", link: "/valuation" },
    { title: "Selg bil", icon: Car, description: "Selg din bil enkelt", color: "bg-red-100 text-red-600", link: "/sell-car" },
  ];

  const cars = [
    { 
      brand: "Toyota", 
      model: "Corolla", 
      plate: "AB12345", 
      euControl: "45 dager",
      status: "Grønn"
    },
    { 
      brand: "Volkswagen", 
      model: "Golf", 
      plate: "CD67890", 
      euControl: "12 dager",
      status: "Gul"
    }
  ];

  const workshops = [
    {
      id: 1,
      name: "Olsens Bil AS",
      rating: 4.8,
      distance: "0.5 km",
      priceRange: "Fra 850 kr",
      specialties: ["Toyota", "Volkswagen"],
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "Service Express",
      rating: 4.6,
      distance: "1.2 km", 
      priceRange: "Fra 750 kr",
      specialties: ["Lakkreparatur", "Kollisjon"],
      image: "/api/placeholder/80/80"
    },
    {
      id: 3,
      name: "Auto Nordica",
      rating: 4.9,
      distance: "2.1 km",
      priceRange: "Fra 920 kr", 
      specialties: ["BMW", "Mercedes", "Audi"],
      image: "/api/placeholder/80/80"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Velkommen til Wrench</h1>
          <p className="text-xl opacity-90 mb-8">Din digitale bilmappe - alt du trenger for bilens vedlikehold</p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input 
              placeholder="Søk etter verksted eller tjeneste..." 
              className="pl-10 bg-white"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const searchTerm = (e.target as HTMLInputElement).value;
                  if (searchTerm.trim()) {
                    window.location.href = `/services?search=${encodeURIComponent(searchTerm)}`;
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Actions */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Hva skal du i dag?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {services.map((service, index) => (
              <Link key={index} to={service.link}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 ${service.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <service.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{service.title}</h3>
                    <p className="text-xs text-gray-500">{service.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* My Cars */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Mine biler</h2>
            <Link to="/add-car">
              <Button variant="outline" size="sm">Legg til bil</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cars.map((car, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{car.brand} {car.model}</h3>
                      <p className="text-gray-600">{car.plate}</p>
                    </div>
                    <Badge variant={car.status === "Grønn" ? "default" : "secondary"}>
                      {car.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Neste EU-kontroll: {car.euControl}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Best Workshops */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Beste verksteder nær deg</h2>
            <Link to="/services">
              <Button variant="outline" size="sm">Se alle</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workshops.map((workshop) => (
              <Link key={workshop.id} to={`/workshop/${workshop.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={workshop.image} 
                        alt={workshop.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1 truncate">{workshop.name}</h3>
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{workshop.rating}</span>
                          <span className="text-gray-400 mx-1">•</span>
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span className="text-sm text-gray-600 ml-1">{workshop.distance}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{workshop.priceRange}</p>
                        <div className="flex flex-wrap gap-1">
                          {workshop.specialties.slice(0, 2).map((specialty, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
