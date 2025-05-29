
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Star, 
  Wrench, 
  Shield, 
  Clock, 
  Users,
  Building2 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { allWorkshops } from "@/data/workshops";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/services?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const featuredWorkshops = allWorkshops.filter(w => w.featured).slice(0, 6);

  const features = [
    {
      icon: Search,
      title: "Finn riktig verksted",
      description: "Søk blant hundrevis av kvalitetssikrede verksteder i hele Norge"
    },
    {
      icon: Shield,
      title: "Trygg og sikker",
      description: "Alle verksteder er verifiserte og kvalitetssikret for din trygghet"
    },
    {
      icon: Clock,
      title: "Spare tid",
      description: "Sammenlign priser og book time direkte fra appen"
    },
    {
      icon: Users,
      title: "Ekte anmeldelser",
      description: "Les anmeldelser fra ekte kunder før du velger verksted"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Wrench className="h-16 w-16 text-blue-500" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Din digitale <span className="text-blue-500">bilmappe</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Hold orden på bilens historie, finn riktig verksted og få tilbud på service og reparasjoner
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Søk etter verksted, by eller tjeneste..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-12 text-base"
                  />
                </div>
                <Button type="submit" size="lg" className="h-12 px-8">
                  Søk
                </Button>
              </form>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline" size="lg" asChild>
                <Link to="/services">
                  <Search className="h-4 w-4 mr-2" />
                  Finn verksted
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/auth">
                  <Users className="h-4 w-4 mr-2" />
                  Min bilmappe
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/workshop-register">
                  <Building2 className="h-4 w-4 mr-2" />
                  Registrer verksted
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hvorfor velge Wrench?
            </h2>
            <p className="text-gray-600 text-lg">
              Vi gjør det enkelt å ta vare på bilen din
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Workshops */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Utvalgte verksteder
            </h2>
            <p className="text-gray-600 text-lg">
              Høyt rangerte verksteder i ditt område
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredWorkshops.map((workshop) => (
              <Link key={workshop.id} to={`/workshop/${workshop.id}`}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{workshop.name}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{workshop.city}</span>
                          {workshop.distance && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{workshop.distance}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">
                        Utvalgt
                      </Badge>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-gray-600 ml-1">{workshop.rating}</span>
                      <span className="text-gray-400 mx-1">•</span>
                      <span className="text-gray-600">{workshop.reviewCount} anmeldelser</span>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{workshop.description}</p>
                    
                    <div className="space-y-2">
                      <p className="font-medium">{workshop.priceRange}</p>
                      <div className="flex flex-wrap gap-1">
                        {workshop.specialties.slice(0, 2).map((specialty, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {workshop.specialties.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{workshop.specialties.length - 2} flere
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/services">
                Se alle verksteder
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Klar til å komme i gang?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Opprett din digitale bilmappe i dag og få kontroll over bilens historie
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/auth">
                Kom i gang gratis
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link to="/services">
                Finn verksted
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
