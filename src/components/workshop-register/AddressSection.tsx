
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  address: string;
  postalCode: string;
  city: string;
}

interface AddressSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const AddressSection = ({ formData, setFormData }: AddressSectionProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Adresse</h3>
      
      <div>
        <Label htmlFor="address">Gateadresse *</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="postalCode">Postnummer *</Label>
          <Input
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) => setFormData(prev => ({ ...prev, postalCode: e.target.value }))}
            required
          />
        </div>
        <div>
          <Label htmlFor="city">By *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
            required
          />
        </div>
      </div>
    </div>
  );
};
