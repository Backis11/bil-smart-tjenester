
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  MapPin, 
  Map,
  List
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileOptimizedCard from "@/components/MobileOptimizedCard";
import ResponsiveGrid from "@/components/ResponsiveGrid";
import WorkshopDetailModal from "@/components/workshop/WorkshopDetailModal";
import { useWorkshops } from "@/hooks/useWorkshops";
import type { Workshop } from "@/types/workshop";

const ServiceDiscovery = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || "";
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedFilter, setSelectedFilter] = useState("Alle");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { workshops, totalCount, isLoading } = useWorkshops();

  const filters = ["Alle", "BILVERKSTED", "KONTROLLORGAN", "DEKK", "LAKK", "BREMSE"];
  const filterLabels: Record<string, string> = {
    "Alle": "Alle",
    "BILVERKSTED": "Bilverksted", 
    "KONTROLLORGAN": "EU-kontroll",
    "DEKK": "Dekk",
    "LAKK": "Lakk",
    "BREMSE": "Bremse"
  };

  const filteredWorkshops = useMemo(() => {
    return workshops.filter(workshop => {
      const matchesSearch = !searchTerm || 
        workshop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        workshop.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (workshop.city && workshop.city.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesFilter = selectedFilter === "Alle" || 
        (workshop.certifications && workshop.certifications.some(cert => 
          cert.includes(selectedFilter)
        ));
      
      return matchesSearch && matchesFilter;
    });
  }, [workshops, searchTerm, selectedFilter]);

  const formatCertifications = (certifications: string[]) => {
    if (!certifications) return [];
    return certifications.map(cert => {
      if (cert.includes('BILVERKSTED')) return 'Bilverksted';
      if (cert.includes('KONTROLLORGAN')) return 'EU-kontroll';
      if (cert.includes('DEKK')) return 'Dekk';
      if (cert.includes('LAKK')) return 'Lakk';
      if (cert.includes('BREMSE')) return 'Bremse';
      return cert;
    });
  };

  const handleWorkshopClick = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
          <div className="text-center">Laster verksteder fra database...</div>
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
                {filteredWorkshops.length} verksteder funnet (av totalt {totalCount})
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

        <ResponsiveGrid columns={{ mobile: 1, tablet: 2, desktop: 3 }}>
          {filteredWorkshops.map((workshop) => (
            <MobileOptimizedCard 
              key={workshop.id} 
              className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02]"
              onClick={() => handleWorkshopClick(workshop)}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3">
                  <h3 className="font-bold text-base sm:text-lg line-clamp-2">{workshop.name}</h3>
                  
                  <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{workshop.address}</span>
                  </div>
                  
                  {workshop.org_number && (
                    <p className="text-xs sm:text-sm text-gray-500">
                      Org: {workshop.org_number}
                    </p>
                  )}

                  {workshop.certifications && workshop.certifications.length > 0 && (
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
                  )}
                </div>
              </CardContent>
            </MobileOptimizedCard>
          ))}
        </ResponsiveGrid>

        {filteredWorkshops.length === 0 && workshops.length > 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Ingen verksteder funnet som matcher søket ditt.</p>
          </div>
        )}

        {workshops.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-500">Ingen verksteder funnet i databasen.</p>
          </div>
        )}
      </div>

      <WorkshopDetailModal
        workshop={selectedWorkshop}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default ServiceDiscovery;
