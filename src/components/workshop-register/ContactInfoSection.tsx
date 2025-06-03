
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
}

interface ContactInfoSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const ContactInfoSection = ({ formData, setFormData }: ContactInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Kontaktinformasjon</h3>
      
      <div>
        <Label htmlFor="contactPerson">Kontaktperson</Label>
        <Input
          id="contactPerson"
          value={formData.contactPerson}
          onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
        />
      </div>

      <div>
        <Label htmlFor="contactEmail">E-postadresse *</Label>
        <Input
          id="contactEmail"
          type="email"
          value={formData.contactEmail}
          onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
          required
        />
      </div>

      <div>
        <Label htmlFor="contactPhone">Telefonnummer</Label>
        <Input
          id="contactPhone"
          type="tel"
          value={formData.contactPhone}
          onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
        />
      </div>

      <div>
        <Label htmlFor="website">Nettside</Label>
        <Input
          id="website"
          type="url"
          value={formData.website}
          onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
          placeholder="https://dittverksted.no"
        />
      </div>
    </div>
  );
};
