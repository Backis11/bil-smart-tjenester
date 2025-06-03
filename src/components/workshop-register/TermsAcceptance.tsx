
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface TermsAcceptanceProps {
  acceptedTerms: boolean;
  setAcceptedTerms: (accepted: boolean) => void;
}

export const TermsAcceptance = ({ acceptedTerms, setAcceptedTerms }: TermsAcceptanceProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <Checkbox
          id="terms"
          checked={acceptedTerms}
          onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
          className="mt-1"
        />
        <div className="flex-1">
          <Label htmlFor="terms" className="text-sm font-medium cursor-pointer">
            Jeg godtar{" "}
            <Link to="/terms" className="text-blue-600 hover:underline" target="_blank">
              vilkårene og betingelsene
            </Link>
            {" "}og{" "}
            <Link to="/privacy" className="text-blue-600 hover:underline" target="_blank">
              personvernreglene
            </Link>
            {" "}for Wrench-tjenesten *
          </Label>
          <p className="text-xs text-gray-600 mt-1">
            Ved å registrere ditt verksted godtar du våre vilkår for bruk av plattformen og behandling av kundedata.
          </p>
        </div>
      </div>
    </div>
  );
};
