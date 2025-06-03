
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FormData {
  services: string[];
}

interface ServicesSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const availableServices = [
  "Service", "EU-kontroll", "Dekkskift", "Bremseservice", 
  "Lakkreparatur", "Kollisjon", "Bilglass", "Klimaanlegg",
  "Motor-reparasjon", "Girkasse", "Eksosanlegg"
];

export const ServicesSection = ({ formData, setFormData }: ServicesSectionProps) => {
  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, service]
        : prev.services.filter(s => s !== service)
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Tjenester</h3>
      <p className="text-sm text-gray-600">Velg hvilke tjenester dere tilbyr</p>
      
      <div className="grid grid-cols-2 gap-3">
        {availableServices.map((service) => (
          <div key={service} className="flex items-center space-x-2">
            <Checkbox
              id={service}
              checked={formData.services.includes(service)}
              onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
            />
            <Label htmlFor={service} className="text-sm">{service}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};
