
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
      description: "Hold orden på alle viktige dokumenter og service på ett sted",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Shield,
      title: "Trygg og sikker",
      description: "Alle dokumenter lagres sikkert og er alltid tilgjengelige for deg",
      color: "from-green-500 to-green-600"
    },
    {
      icon: TrendingUp,
      title: "Øk verdien ved salg",
      description: "Komplett dokumentasjon øker bilens verdi når du skal selge",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Clock,
      title: "Spare tid",
      description: "Finn raskt fram dokumenter når du trenger dem",
      color: "from-purple-500 to-purple-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Hvorfor velge <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Bilmappa?</span>
          </h2>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto">
            Vi gjør det enkelt å ta vare på bilen din
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                
                {/* Hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
