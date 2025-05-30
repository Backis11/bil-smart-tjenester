
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import ServiceTypeSelector from './service-request/ServiceTypeSelector';
import CarSelector from './service-request/CarSelector';
import FileUpload from './service-request/FileUpload';
import DateLocationSection from './service-request/DateLocationSection';

interface UserCar {
  id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
}

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  type: 'image' | 'video';
}

const ServiceRequestForm = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cars, setCars] = useState<UserCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [formData, setFormData] = useState({
    serviceType: '',
    car: '',
    description: '',
    preferredDate: '',
    location: '',
  });

  useEffect(() => {
    const fetchUserCars = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('cars')
          .select('id, make, model, year, license_plate')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCars(data || []);
      } catch (error) {
        console.error('Error fetching cars:', error);
        toast({
          title: "Feil",
          description: "Kunne ikke hente dine biler",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserCars();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.serviceType || !formData.car || !formData.description) {
      toast({
        title: "Feil",
        description: "Vennligst fyll ut alle obligatoriske felt",
        variant: "destructive"
      });
      return;
    }

    setSubmitting(true);

    try {
      // Here you would normally upload files and save the service request
      // For now, we'll just simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Service request submitted:', formData);
      console.log('Uploaded files:', uploadedFiles);
      
      // Navigate to thank you page
      navigate('/get-quote/thank-you');
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "Feil",
        description: "Kunne ikke sende forespørsel. Prøv igjen.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center py-8">
          <Loader className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
          <p className="text-gray-500">Laster dine biler...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Be om tilbud</h1>
        <p className="text-gray-600">Fortell oss hva du trenger hjelp med</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Type Selection */}
        <ServiceTypeSelector
          selectedServiceType={formData.serviceType}
          onServiceTypeChange={(serviceType) => setFormData({ ...formData, serviceType })}
        />

        {/* Car Selection */}
        <CarSelector
          cars={cars}
          selectedCar={formData.car}
          onCarChange={(car) => setFormData({ ...formData, car })}
        />

        {/* Description */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Beskrivelse *</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Beskriv problemet eller ønsket tjeneste</Label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="F.eks. Bilen lager rare lyder når jeg bremser..."
                  className="w-full mt-1 p-3 border border-gray-200 rounded-xl min-h-[100px] resize-none"
                  required
                />
              </div>
              
              {/* Photo/Video Upload */}
              <FileUpload
                uploadedFiles={uploadedFiles}
                onFilesChange={setUploadedFiles}
              />
            </div>
          </CardContent>
        </Card>

        {/* Date and Location */}
        <DateLocationSection
          preferredDate={formData.preferredDate}
          location={formData.location}
          onDateChange={(preferredDate) => setFormData({ ...formData, preferredDate })}
          onLocationChange={(location) => setFormData({ ...formData, location })}
        />

        {/* Submit Button */}
        <div className="space-y-3">
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 h-12"
            disabled={cars.length === 0 || submitting}
          >
            {submitting ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Sender forespørsel...
              </>
            ) : cars.length === 0 ? (
              'Legg til bil først'
            ) : (
              'Send forespørsel'
            )}
          </Button>
          <p className="text-sm text-gray-500 text-center">
            Du vil motta tilbud fra verksteder i ditt område innen 24 timer
          </p>
        </div>
      </form>
    </div>
  );
};

export default ServiceRequestForm;
