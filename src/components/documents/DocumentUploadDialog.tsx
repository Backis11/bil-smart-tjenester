import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  license_plate: string;
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

  const fetchUserCars = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('cars')
        .select('id, make, model, year, license_plate')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      console.error('Error fetching cars:', error);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !formData.carId || !formData.title || !formData.document_type) {
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
            <Label htmlFor="car-select">Velg bil</Label>
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
          </div>

          <div>
            <Label htmlFor="file-upload">Velg fil</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,image/*"
              capture="environment"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              required
            />
          </div>

          <div>
            <Label htmlFor="title">Tittel</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="F.eks. EU-kontroll 2024"
              required
            />
          </div>

          <div>
            <Label htmlFor="document-type">Type dokument</Label>
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
            >
              Avbryt
            </Button>
            <Button 
              type="submit" 
              disabled={uploading || !selectedFile || !formData.carId || !formData.title || !formData.document_type}
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
