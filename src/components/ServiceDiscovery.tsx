
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
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileOptimizedCard from "@/components/MobileOptimizedCard";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import { workshopService } from "@/services/workshopService";
import type { Workshop } from "@/types/workshop";

const ServiceDiscovery = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || "";
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedFilter, setSelectedFilter] = useState("Alle");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const filters = ["Alle", "BILVERKSTED", "KONTROLLORGAN", "DEKK", "LAKK", "BREMSE"];
  const filterLabels: Record<string, string> = {
    "Alle": "Alle",
    "BILVERKSTED": "Bilverksted", 
    "KONTROLLORGAN": "EU-kontroll",
    "DEKK": "Dekk",
    "LAKK": "Lakk",
    "BREMSE": "Bremse"
  };

  useEffect(() => {
    loadWorkshops();
  }, []);

  const loadWorkshops = async () => {
    try {
      const data = await workshopService.getAllWorkshops();
      setWorkshops(data);
    } catch (error) {
      console.error('Failed to load workshops:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workshop.certifications.some(cert => 
                           cert.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesFilter = selectedFilter === "Alle" || 
                         workshop.certifications.some(cert => 
                           cert.includes(selectedFilter)
                         );
    return matchesSearch && matchesFilter;
  });

  const formatCertifications = (certifications: string[]) => {
    return certifications.map(cert => {
      if (cert.includes('BILVERKSTED')) return 'Bilverksted';
      if (cert.includes('KONTROLLORGAN')) return 'EU-kontroll';
      if (cert.includes('DEKK')) return 'Dekk';
      if (cert.includes('LAKK')) return 'Lakk';
      if (cert.includes('BREMSE')) return 'Bremse';
      return cert;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="text-center">Loading workshops...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Finn verksted</h1>
          
          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Søk etter verksted, by eller tjeneste..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-gray-900 placeholder:text-gray-500 bg-white text-base"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className="text-xs sm:text-sm"
                >
                  {filterLabels[filter]}
                </Button>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <p className="text-gray-600 text-sm">
                {filteredWorkshops.length} verksteder funnet
              </p>
              
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="flex-1 sm:flex-none"
                >
                  <List className="h-4 w-4" />
                  <span className="ml-2 sm:hidden">Liste</span>
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                  className="flex-1 sm:flex-none"
                >
                  <Map className="h-4 w-4" />
                  <span className="ml-2 sm:hidden">Kart</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {viewMode === "map" ? (
          <div className="bg-gray-200 rounded-lg h-64 sm:h-96 flex items-center justify-center mb-6 sm:mb-8">
            <p className="text-gray-600">Kartvisning kommer snart</p>
          </div>
        ) : null}

        {/* Workshop List */}
        <ResponsiveGrid columns={{ mobile: 1, tablet: 2, desktop: 3 }}>
          {filteredWorkshops.map((workshop) => (
            <MobileOptimizedCard key={workshop.id} className="h-full">
              <CardContent className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base sm:text-lg mb-1 line-clamp-1">{workshop.name}</h3>
                    <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-2">
                      <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{workshop.address}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center mb-3">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                  <span className="text-xs sm:text-sm text-gray-600 ml-1">4.5</span>
                  <span className="text-gray-400 mx-1">•</span>
                  <span className="text-xs sm:text-sm text-gray-600">25 anmeldelser</span>
                </div>
                
                <div className="space-y-2">
                  {workshop.org_number && (
                    <p className="text-xs sm:text-sm text-gray-500">Org: {workshop.org_number}</p>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {formatCertifications(workshop.certifications).slice(0, 3).map((cert, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                    {workshop.certifications.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{workshop.certifications.length - 3} flere
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </MobileOptimizedCard>
          ))}
        </ResponsiveGrid>

        {filteredWorkshops.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Ingen verksteder funnet som matcher søket ditt.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ServiceDiscovery;
