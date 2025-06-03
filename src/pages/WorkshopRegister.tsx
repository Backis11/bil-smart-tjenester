import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const WorkshopRegister = () => {
  const [formData, setFormData] = useState({
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
    services: [] as string[],
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const availableServices = [
    "Service", "EU-kontroll", "Dekkskift", "Bremseservice", 
    "Lakkreparatur", "Kollisjon", "Bilglass", "Klimaanlegg",
    "Motor-reparasjon", "Girkasse", "Eksosanlegg"
  ];

  const handleServiceChange = (service: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      services: checked 
        ? [...prev.services, service]
        : prev.services.filter(s => s !== service)
    }));
  };

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
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto pt-8 px-4 pb-16">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Tilbake til hovedside
        </Link>
        
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold">Registrer verksted</CardTitle>
            <p className="text-gray-600">Bli en del av Wrench-nettverket</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Bedriftsinformasjon */}
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

              {/* Adresse */}
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

              {/* Kontaktinformasjon */}
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

              {/* Tjenester */}
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
              
              {/* Vilkår og betingelser */}
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
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || !acceptedTerms}
              >
                {isSubmitting ? "Sender registrering..." : "Send registrering"}
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                Har du allerede en konto?{" "}
                <Link to="/workshop-login" className="text-blue-600 hover:underline">
                  Logg inn her
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WorkshopRegister;
