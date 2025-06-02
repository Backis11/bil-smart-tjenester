
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Award } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { workshopService } from '@/services/workshopService';
import type { Workshop, WorkshopSearchFilters } from '@/types/workshop';

const WorkshopSearch = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [filters, setFilters] = useState<WorkshopSearchFilters>({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const certificationOptions = [
    { value: 'BILVERKSTED', label: 'Bilverksted' },
    { value: 'KONTROLLORGAN', label: 'EU-kontroll' },
    { value: 'DEKK', label: 'Dekk' },
    { value: 'LAKK', label: 'Lakk' },
    { value: 'BREMSE', label: 'Bremse' }
  ];

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const results = await workshopService.searchWorkshops(filters);
      setWorkshops(results);
      setHasSearched(true);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCertificationChange = (value: string) => {
    setFilters(prev => ({ ...prev, certification: value === 'all' ? undefined : value }));
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, location: event.target.value }));
  };

  const formatCertifications = (certifications: string[]) => {
    return certifications.map(cert => {
      const option = certificationOptions.find(opt => cert.includes(opt.value));
      return option ? option.label : cert;
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Find Workshop
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Certification Type</label>
              <Select onValueChange={handleCertificationChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select certification type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  {certificationOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Location</label>
              <Input
                placeholder="Enter city or area"
                value={filters.location || ''}
                onChange={handleLocationChange}
              />
            </div>
          </div>
          
          <Button onClick={handleSearch} disabled={isLoading} className="w-full">
            {isLoading ? 'Searching...' : 'Search Workshops'}
          </Button>
        </CardContent>
      </Card>

      {hasSearched && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {workshops.length} workshop{workshops.length !== 1 ? 's' : ''} found
          </h3>
          
          {workshops.map(workshop => (
            <Card key={workshop.id}>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <h4 className="text-xl font-semibold">{workshop.name}</h4>
                  
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{workshop.address}</span>
                  </div>
                  
                  {workshop.certifications.length > 0 && (
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
                  
                  <div className="flex gap-4 text-sm text-gray-500">
                    {workshop.org_number && (
                      <span>Org: {workshop.org_number}</span>
                    )}
                    {workshop.approval_number && (
                      <span>Approval: {workshop.approval_number}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {workshops.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                No workshops found matching your criteria.
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkshopSearch;
