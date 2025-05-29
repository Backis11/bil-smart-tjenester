
import { 
  Search, 
  Shield, 
  Clock, 
  Users
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Finn riktig verksted",
      description: "Søk blant hundrevis av kvalitetssikrede verksteder i hele Norge"
    },
    {
      icon: Shield,
      title: "Trygg og sikker",
      description: "Alle verksteder er verifiserte og kvalitetssikret for din trygghet"
    },
    {
      icon: Clock,
      title: "Spare tid",
      description: "Sammenlign priser og book time direkte fra appen"
    },
    {
      icon: Users,
      title: "Ekte anmeldelser",
      description: "Les anmeldelser fra ekte kunder før du velger verksted"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Hvorfor velge Wrench?
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
