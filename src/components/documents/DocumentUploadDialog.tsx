
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { useAuth } from "@/contexts/MockAuthContext";
import { useToast } from "@/hooks/use-toast";

const CARS_STORAGE_KEY = 'mock_cars_data';

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
  user_id: string;
}

interface DocumentUploadDialogProps {
  onUpload: (
    file: File,
    carId: string,
    documentData: {
      title: string;
      description?: string;
      document_type: string;
      document_date?: string;
      workshop_name?: string;
    }
  ) => Promise<boolean>;
  uploading: boolean;
}

const DocumentUploadDialog = ({ onUpload, uploading }: DocumentUploadDialogProps) => {
  const [open, setOpen] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [loadingCars, setLoadingCars] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    carId: '',
    title: '',
    description: '',
    document_type: '',
    document_date: '',
    workshop_name: ''
  });
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchUserCars = async () => {
    if (!user) return;

    setLoadingCars(true);
    try {
      console.log('Fetching user cars for user:', user.id);
      
      const data = localStorage.getItem(CARS_STORAGE_KEY);
      if (data) {
        const allCars: Car[] = JSON.parse(data);
        const userCars = allCars.filter(car => car.user_id === user.id);
        console.log('Fetched cars:', userCars);
        setCars(userCars);
        
        if (userCars.length === 0) {
          toast({
            title: "Ingen biler funnet",
            description: "Du må først registrere en bil før du kan laste opp dokumenter",
            variant: "destructive"
          });
        }
      } else {
        setCars([]);
        toast({
          title: "Ingen biler funnet",
          description: "Du må først registrere en bil før du kan laste opp dokumenter",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error fetching cars:', error);
      toast({
        title: "Feil",
        description: "Kunne ikke hente dine biler",
        variant: "destructive"
      });
    } finally {
      setLoadingCars(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      fetchUserCars();
    } else {
      // Reset form when closing
      setFormData({
        carId: '',
        title: '',
        description: '',
        document_type: '',
        document_date: '',
        workshop_name: ''
      });
      setSelectedFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    console.log('File selected:', file);
    
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "Fil for stor",
          description: "Maksimal filstørrelse er 10MB",
          variant: "destructive"
        });
        return;
      }
      
      // Auto-generate title from filename if not set
      if (!formData.title) {
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
        setFormData(prev => ({ ...prev, title: nameWithoutExt }));
      }
    }
    
    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Submitting form with data:', formData);
    console.log('Selected file:', selectedFile);
    
    if (!selectedFile || !formData.carId || !formData.title || !formData.document_type) {
      toast({
        title: "Manglende informasjon",
        description: "Vennligst fyll ut alle obligatoriske felt og velg en fil",
        variant: "destructive"
      });
      return;
    }

    const success = await onUpload(selectedFile, formData.carId, {
      title: formData.title,
      description: formData.description || undefined,
      document_type: formData.document_type,
      document_date: formData.document_date || undefined,
      workshop_name: formData.workshop_name || undefined
    });

    if (success) {
      setOpen(false);
    }
  };

  const documentTypes = [
    { value: 'eu-kontroll', label: 'EU-kontroll' },
    { value: 'service', label: 'Service' },
    { value: 'forsikring', label: 'Forsikring' },
    { value: 'dekkskift', label: 'Dekkskift' },
    { value: 'other', label: 'Annet' }
  ];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex items-center space-x-2">
          <Upload className="h-4 w-4" />
          <span>Last opp dokumentasjon</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Last opp dokument</DialogTitle>
          <DialogDescription>
            Last opp dokumentasjon for en av dine biler. Dokumentene følger bilen ved salg.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="car-select">Velg bil *</Label>
            {loadingCars ? (
              <div className="text-sm text-gray-500">Laster biler...</div>
            ) : (
              <Select value={formData.carId} onValueChange={(value) => setFormData({...formData, carId: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Velg bil" />
                </SelectTrigger>
                <SelectContent>
                  {cars.map((car) => (
                    <SelectItem key={car.id} value={car.id}>
                      {car.license_plate} - {car.make} {car.model} ({car.year})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <div>
            <Label htmlFor="file-upload">Velg fil *</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,image/*"
              onChange={handleFileChange}
              required
            />
            {selectedFile && (
              <div className="mt-2 text-sm text-gray-600">
                Valgt fil: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="title">Tittel *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="F.eks. EU-kontroll 2024"
              required
            />
          </div>

          <div>
            <Label htmlFor="document-type">Type dokument *</Label>
            <Select value={formData.document_type} onValueChange={(value) => setFormData({...formData, document_type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Velg type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="document-date">Dato for service/kontroll (valgfritt)</Label>
            <Input
              id="document-date"
              type="date"
              value={formData.document_date}
              onChange={(e) => setFormData({...formData, document_date: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="workshop-name">Verksted (valgfritt)</Label>
            <Input
              id="workshop-name"
              value={formData.workshop_name}
              onChange={(e) => setFormData({...formData, workshop_name: e.target.value})}
              placeholder="F.eks. Toyota Bergen"
            />
          </div>

          <div>
            <Label htmlFor="description">Beskrivelse (valgfritt)</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Eventuelle notater..."
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="flex-1"
              disabled={uploading}
            >
              Avbryt
            </Button>
            <Button 
              type="submit" 
              disabled={uploading || !selectedFile || !formData.carId || !formData.title || !formData.document_type || cars.length === 0}
              className="flex-1"
            >
              {uploading ? "Laster opp..." : "Last opp"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentUploadDialog;
