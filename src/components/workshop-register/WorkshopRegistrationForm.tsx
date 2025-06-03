
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { BusinessInfoSection } from "./BusinessInfoSection";
import { AddressSection } from "./AddressSection";
import { ContactInfoSection } from "./ContactInfoSection";
import { ServicesSection } from "./ServicesSection";
import { TermsAcceptance } from "./TermsAcceptance";

interface FormData {
  businessName: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  contactPhone: string;
  contactEmail: string;
  orgNumber: string;
  contactPerson: string;
  website: string;
  services: string[];
}

const WorkshopRegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    description: "",
    address: "",
    city: "",
    postalCode: "",
    contactPhone: "",
    contactEmail: "",
    orgNumber: "",
    contactPerson: "",
    website: "",
    services: [],
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      toast({
        title: "Betingelser må godtas",
        description: "Du må godta vilkårene og betingelsene for å fortsette.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('workshop_registrations')
        .insert({
          business_name: formData.businessName,
          description: formData.description,
          address: formData.address,
          city: formData.city,
          postal_code: formData.postalCode,
          contact_phone: formData.contactPhone,
          contact_email: formData.contactEmail,
          org_number: formData.orgNumber || null,
          contact_person: formData.contactPerson,
          website: formData.website || null,
          services: formData.services,
        });

      if (error) throw error;

      toast({
        title: "Registrering sendt!",
        description: "Vi vil gjennomgå din søknad og ta kontakt med deg snart.",
      });

      navigate("/workshop-login");
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Feil ved registrering",
        description: error.message || "Noe gikk galt. Prøv igjen.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BusinessInfoSection formData={formData} setFormData={setFormData} />
      <AddressSection formData={formData} setFormData={setFormData} />
      <ContactInfoSection formData={formData} setFormData={setFormData} />
      <ServicesSection formData={formData} setFormData={setFormData} />
      <TermsAcceptance acceptedTerms={acceptedTerms} setAcceptedTerms={setAcceptedTerms} />
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isSubmitting || !acceptedTerms}
      >
        {isSubmitting ? "Sender registrering..." : "Send registrering"}
      </Button>
    </form>
  );
};

export default WorkshopRegistrationForm;
