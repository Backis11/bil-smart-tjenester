
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, MapPin, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DateLocationSectionProps {
  preferredDate: string;
  location: string;
  onDateChange: (date: string) => void;
  onLocationChange: (location: string) => void;
}

const DateLocationSection = ({ 
  preferredDate, 
  location, 
  onDateChange, 
  onLocationChange 
}: DateLocationSectionProps) => {
  const { toast } = useToast();
  const [locationLoading, setLocationLoading] = useState(false);

  const getCurrentLocation = () => {
    setLocationLoading(true);
    
    if (!navigator.geolocation) {
      toast({
        title: "Posisjon ikke støttet",
        description: "Din nettleser støtter ikke posisjonering",
        variant: "destructive"
      });
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Simple reverse geocoding using a free service
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=no`
          );
          const data = await response.json();
          
          const locationString = data.city || data.locality || `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
          onLocationChange(locationString);
          
          toast({
            title: "Posisjon funnet",
            description: `Satt lokasjon til: ${locationString}`,
          });
        } catch (error) {
          console.error('Geocoding error:', error);
          onLocationChange(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`);
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        toast({
          title: "Kunne ikke hente posisjon",
          description: "Tillat posisjonering i nettleseren din",
          variant: "destructive"
        });
        setLocationLoading(false);
      }
    );
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Ønsket tid og sted</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="date" className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Foretrukket dato
            </Label>
            <Input
              id="date"
              type="date"
              value={preferredDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="location" className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              Ønsket område
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              placeholder="F.eks. Oslo sentrum"
              className="mt-1"
            />
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={getCurrentLocation}
              disabled={locationLoading}
            >
              {locationLoading ? (
                <Loader className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <MapPin className="h-4 w-4 mr-2" />
              )}
              {locationLoading ? 'Henter posisjon...' : 'Bruk min posisjon'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DateLocationSection;
