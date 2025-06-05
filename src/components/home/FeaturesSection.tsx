
import { 
  FileText, 
  Shield, 
  TrendingUp, 
  Clock
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: FileText,
      title: "Dokumenter bilens historie",
      description: "Hold orden på alle viktige dokumenter og service på ett sted"
    },
    {
      icon: Shield,
      title: "Trygg og sikker",
      description: "Alle dokumenter lagres sikkert og er alltid tilgjengelige for deg"
    },
    {
      icon: TrendingUp,
      title: "Øk verdien ved salg",
      description: "Komplett dokumentasjon øker bilens verdi når du skal selge"
    },
    {
      icon: Clock,
      title: "Spare tid",
      description: "Finn raskt fram dokumenter når du trenger dem"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Hvorfor velge Bilmappa?
          </h2>
          <p className="text-gray-600 text-lg">
            Vi gjør det enkelt å ta vare på bilen din
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
