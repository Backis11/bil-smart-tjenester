
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Star
} from "lucide-react";
import { allWorkshops } from "@/data/workshops";

const FeaturedWorkshopsSection = () => {
  const featuredWorkshops = allWorkshops.filter(w => w.featured).slice(0, 6);

  return (
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
  );
};

export default FeaturedWorkshopsSection;
