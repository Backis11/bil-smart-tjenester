
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Star, 
  Filter,
  Map,
  List
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { allWorkshops } from "@/data/workshops";
import Header from "@/components/Header";

const ServiceDiscovery = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || "";
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedFilter, setSelectedFilter] = useState("Alle");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const filters = ["Alle", "Service", "EU-kontroll", "Dekkskift", "Lakkreparatur", "Bremseservice"];

  const filteredWorkshops = allWorkshops.filter(workshop => {
    const matchesSearch = workshop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.services.some(service => 
                           service.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesFilter = selectedFilter === "Alle" || 
                         workshop.services.some(service => 
                           service.toLowerCase().includes(selectedFilter.toLowerCase())
                         );
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Finn verksted</h1>
          
          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Søk etter verksted, by eller tjeneste..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-gray-900 placeholder:text-gray-500 bg-white"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                {filteredWorkshops.length} verksteder funnet
              </p>
              
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                >
                  <Map className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {viewMode === "map" ? (
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center mb-8">
            <p className="text-gray-600">Kartvisning kommer snart</p>
          </div>
        ) : null}

        {/* Workshop List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkshops.map((workshop) => (
            <Link key={workshop.id} to={`/workshop/${workshop.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 line-clamp-1">{workshop.name}</h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span>{workshop.city}</span>
                        {workshop.distance && (
                          <>
                            <span className="mx-1">•</span>
                            <span>{workshop.distance}</span>
                          </>
                        )}
                      </div>
                    </div>
                    {workshop.featured && (
                      <Badge className="bg-yellow-100 text-yellow-800">Utvalgt</Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{workshop.rating}</span>
                    <span className="text-gray-400 mx-1">•</span>
                    <span className="text-sm text-gray-600">{workshop.reviewCount} anmeldelser</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{workshop.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{workshop.priceRange}</p>
                    <div className="flex flex-wrap gap-1">
                      {workshop.specialties.slice(0, 3).map((specialty, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {workshop.specialties.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{workshop.specialties.length - 3} flere
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDiscovery;
