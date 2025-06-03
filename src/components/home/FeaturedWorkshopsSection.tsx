
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useWorkshops } from "@/hooks/useWorkshops";
import WorkshopDetailModal from "@/components/workshop/WorkshopDetailModal";
import type { Workshop } from "@/types/workshop";

const FeaturedWorkshopsSection = () => {
  const { workshops, totalCount, isLoading } = useWorkshops();
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredWorkshops = workshops.slice(0, 6);

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
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Utvalgte verksteder
            </h2>
            <p className="text-gray-600 text-lg">
              Laster verksteder...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (workshops.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Utvalgte verksteder
            </h2>
            <p className="text-gray-600 text-lg">
              Ingen verksteder funnet i databasen
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Utvalgte verksteder
          </h2>
          <p className="text-gray-600 text-lg">
            {totalCount} sertifiserte verksteder i Norge
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredWorkshops.map((workshop) => (
            <Card 
              key={workshop.id} 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.02]"
              onClick={() => handleWorkshopClick(workshop)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{workshop.name}</h3>
                      <div className="flex items-start text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm line-clamp-2">{workshop.address}</span>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      Sertifisert
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    {workshop.org_number && (
                      <p className="text-sm text-gray-500">Org: {workshop.org_number}</p>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {formatCertifications(workshop.certifications || []).slice(0, 2).map((cert, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                      {(workshop.certifications || []).length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{(workshop.certifications || []).length - 2} flere
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/services">
              Se alle {totalCount} verksteder
            </Link>
          </Button>
        </div>
      </div>

      <WorkshopDetailModal
        workshop={selectedWorkshop}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default FeaturedWorkshopsSection;
