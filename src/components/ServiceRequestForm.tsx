
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Camera, Calendar, Car, MapPin, FileText, Plus, X, Loader, Video } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Link, useNavigate } from 'react-router-dom';

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
  const [locationLoading, setLocationLoading] = useState(false);
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

  const serviceTypes = [
    { id: 'service', name: 'Service', icon: '🔧' },
    { id: 'eu-control', name: 'EU-kontroll', icon: '✅' },
    { id: 'tire-change', name: 'Dekkskift', icon: '🛞' },
    { id: 'paint-repair', name: 'Lakkreparatur', icon: '🎨' },
    { id: 'brake-service', name: 'Bremseservice', icon: '🛑' },
    { id: 'other', name: 'Annet', icon: '❓' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Fil for stor",
          description: "Maksimal filstørrelse er 10MB",
          variant: "destructive"
        });
        return;
      }

      // Check file type
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (!isImage && !isVideo) {
        toast({
          title: "Ugyldig filtype",
          description: "Kun bilder og videoer er tillatt",
          variant: "destructive"
        });
        return;
      }

      const fileId = Math.random().toString(36).substr(2, 9);
      const preview = URL.createObjectURL(file);
      
      setUploadedFiles(prev => [...prev, {
        id: fileId,
        file,
        preview,
        type: isImage ? 'image' : 'video'
      }]);
    });

    // Reset input
    event.target.value = '';
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter(f => f.id !== fileId);
    });
  };

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
          
          const location = data.city || data.locality || `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`;
          setFormData({ ...formData, location });
          
          toast({
            title: "Posisjon funnet",
            description: `Satt lokasjon til: ${location}`,
          });
        } catch (error) {
          console.error('Geocoding error:', error);
          setFormData({ 
            ...formData, 
            location: `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}` 
          });
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
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Type tjeneste *
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {serviceTypes.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, serviceType: service.id })}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    formData.serviceType === service.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-2xl mb-1">{service.icon}</div>
                  <p className="font-medium text-gray-900">{service.name}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Car Selection */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Car className="h-5 w-5 mr-2" />
              Velg bil *
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cars.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-xl">
                  <p className="text-gray-500 mb-4">Du har ikke registrert noen biler ennå</p>
                  <Link to="/add-car">
                    <Button type="button">
                      <Plus className="h-4 w-4 mr-2" />
                      Legg til bil
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  {cars.map((car) => (
                    <button
                      key={car.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, car: car.id })}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        formData.car === car.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="font-medium text-gray-900">
                        {car.make} {car.model} ({car.license_plate})
                      </p>
                      <p className="text-sm text-gray-600">Årsmodell: {car.year}</p>
                    </button>
                  ))}
                  <Link to="/add-car">
                    <Button variant="outline" type="button" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Legg til ny bil
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </CardContent>
        </Card>

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
              <div>
                <Label>Last opp bilder eller videoer (valgfritt)</Label>
                <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Camera className="h-8 w-8 text-gray-400" />
                    <Video className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-600 font-medium">Legg til bilder eller videoer</p>
                  <p className="text-sm text-gray-500 mb-3">Hjelper verkstedet å forstå problemet bedre</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button type="button" variant="outline" asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      Velg filer
                    </label>
                  </Button>
                </div>

                {/* Display uploaded files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="relative">
                        {file.type === 'image' ? (
                          <img
                            src={file.preview}
                            alt="Preview"
                            className="w-full h-20 object-cover rounded-lg"
                          />
                        ) : (
                          <video
                            src={file.preview}
                            className="w-full h-20 object-cover rounded-lg"
                            controls={false}
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                          {file.type === 'image' ? <Camera className="h-3 w-3" /> : <Video className="h-3 w-3" />}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Date and Location */}
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
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
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
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
