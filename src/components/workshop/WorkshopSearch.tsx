
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Award } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useWorkshops } from '@/hooks/useWorkshops';
import WorkshopDetailModal from '@/components/workshop/WorkshopDetailModal';
import type { Workshop } from '@/types/workshop';

const WorkshopSearch = () => {
  const { workshops, totalCount, isLoading } = useWorkshops();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCertification, setSelectedCertification] = useState<string>('');
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const certificationOptions = [
    { value: 'BILVERKSTED', label: 'Bilverksted' },
    { value: 'KONTROLLORGAN', label: 'EU-kontroll' },
    { value: 'DEKK', label: 'Dekk' },
    { value: 'LAKK', label: 'Lakk' },
    { value: 'BREMSE', label: 'Bremse' }
  ];

  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = !searchTerm || 
      workshop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workshop.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (workshop.city && workshop.city.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCertification = !selectedCertification || 
      (workshop.certifications && workshop.certifications.some(cert => 
        cert.includes(selectedCertification)
      ));
    
    return matchesSearch && matchesCertification;
  });

  const formatCertifications = (certifications: string[]) => {
    return certifications.map(cert => {
      const option = certificationOptions.find(opt => cert.includes(opt.value));
      return option ? option.label : cert;
    });
  };

  const handleWorkshopClick = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Søk i {totalCount} verksteder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Sertifiseringstype</label>
              <Select onValueChange={setSelectedCertification}>
                <SelectTrigger>
                  <SelectValue placeholder="Velg sertifiseringstype" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Alle typer</SelectItem>
                  {certificationOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Sted</label>
              <Input
                placeholder="Skriv inn by eller område"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          {filteredWorkshops.length} verksted{filteredWorkshops.length !== 1 ? 'er' : ''} funnet
        </h3>
        
        {isLoading ? (
          <div className="text-center py-8">Laster verksteder...</div>
        ) : (
          <>
            {filteredWorkshops.map(workshop => (
              <Card 
                key={workshop.id}
                className="hover:shadow-lg transition-all duration-200 cursor-pointer hover:scale-[1.01]"
                onClick={() => handleWorkshopClick(workshop)}
              >
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <h4 className="text-xl font-semibold">{workshop.name}</h4>
                    
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{workshop.address}</span>
                    </div>
                    
                    {workshop.org_number && (
                      <div className="text-sm text-gray-500">
                        Org: {workshop.org_number}
                      </div>
                    )}
                    
                    {workshop.certifications && workshop.certifications.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-gray-600" />
                        <div className="flex flex-wrap gap-2">
                          {formatCertifications(workshop.certifications).map((cert, index) => (
                            <Badge key={index} variant="secondary">
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredWorkshops.length === 0 && !isLoading && (
              <Card>
                <CardContent className="p-6 text-center text-gray-500">
                  Ingen verksteder funnet som matcher søkekriteriene.
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>

      <WorkshopDetailModal
        workshop={selectedWorkshop}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default WorkshopSearch;
