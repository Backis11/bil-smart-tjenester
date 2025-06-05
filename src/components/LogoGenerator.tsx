
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const LogoGenerator = () => {
  const [generatedLogo, setGeneratedLogo] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateLogo = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/functions/v1/generate-logo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Failed to generate logo');
      }

      const data = await response.json();
      setGeneratedLogo(data.image);
      
      toast({
        title: "Logo generert!",
        description: "Den nye logoen er klar til bruk",
      });
    } catch (error) {
      console.error('Error generating logo:', error);
      toast({
        title: "Feil",
        description: "Kunne ikke generere logo. Sjekk at Hugging Face API-nøkkel er satt opp.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Bilmappa Logo Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <Button 
            onClick={generateLogo} 
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Genererer logo...
              </>
            ) : (
              'Generer Bilmappa Logo'
            )}
          </Button>
        </div>

        {generatedLogo && (
          <div className="text-center space-y-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <img 
                src={generatedLogo} 
                alt="Generated Bilmappa Logo"
                className="mx-auto max-w-full h-auto rounded-lg shadow-lg"
                style={{ maxHeight: '400px' }}
              />
            </div>
            <p className="text-sm text-gray-600">
              Høyreklikk og velg "Lagre bilde som..." for å laste ned logoen
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LogoGenerator;
