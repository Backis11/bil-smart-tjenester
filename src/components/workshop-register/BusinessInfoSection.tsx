
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  businessName: string;
  description: string;
  orgNumber: string;
}

interface BusinessInfoSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const BusinessInfoSection = ({ formData, setFormData }: BusinessInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Bedriftsinformasjon</h3>
      
      <div>
        <Label htmlFor="businessName">Bedriftsnavn *</Label>
        <Input
          id="businessName"
          value={formData.businessName}
          onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="orgNumber">Organisasjonsnummer</Label>
        <Input
          id="orgNumber"
          value={formData.orgNumber}
          onChange={(e) => setFormData(prev => ({ ...prev, orgNumber: e.target.value }))}
          placeholder="123456789"
        />
      </div>

      <div>
        <Label htmlFor="description">Beskrivelse</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Fortell om ditt verksted..."
        />
      </div>
    </div>
  );
};
