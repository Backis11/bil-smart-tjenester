
import { 
  FileText, 
  Shield, 
  TrendingUp, 
  Clock,
  CheckCircle,
  Users
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: FileText,
      title: "Komplett dokumentasjon",
      description: "Hold orden på alle viktige dokumenter og service på ett trygt sted",
      color: "from-blue-500 to-blue-600",
      illustration: (
        <div className="absolute top-2 right-2 bg-blue-100 rounded-lg p-2">
          <div className="w-8 h-6 bg-blue-500 rounded opacity-20"></div>
        </div>
      )
    },
    {
      icon: Shield,
      title: "Sikker og GDPR-godkjent",
      description: "Alle dokumenter lagres sikkert og er alltid tilgjengelige for deg",
      color: "from-green-500 to-green-600",
      illustration: (
        <div className="absolute top-2 right-2 bg-green-100 rounded-full p-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
        </div>
      )
    },
    {
      icon: TrendingUp,
      title: "Øk verdien ved salg",
      description: "Komplett dokumentasjon øker bilens verdi når du skal selge",
      color: "from-orange-500 to-orange-600",
      illustration: (
        <div className="absolute top-2 right-2 bg-orange-100 rounded-lg p-2">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-orange-500 rounded"></div>
            <div className="w-1 h-4 bg-orange-500 rounded"></div>
            <div className="w-1 h-5 bg-orange-500 rounded"></div>
          </div>
        </div>
      )
    },
    {
      icon: Clock,
      title: "Spar tid og krefter",
      description: "Finn raskt fram dokumenter når du trenger dem",
      color: "from-purple-500 to-purple-600",
      illustration: (
        <div className="absolute top-2 right-2 bg-purple-100 rounded-full p-2">
          <div className="w-4 h-4 border-2 border-purple-500 rounded-full relative">
            <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-purple-500 rounded origin-bottom transform -translate-x-1/2"></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with trust indicators */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-blue-50 rounded-full px-4 py-2 border border-blue-100">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="text-blue-700 text-sm font-medium">Brukt av 10,000+ nordmenn</span>
            </div>
            <div className="flex items-center gap-2 bg-green-50 rounded-full px-4 py-2 border border-green-100">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-green-700 text-sm font-medium">Offisiell tjeneste</span>
            </div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Hvorfor velge <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Bilmappa?</span>
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Vi gjør det enkelt å ta vare på bilen din med profesjonell dokumenthåndtering som følger alle norske standarder
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                {feature.illustration}
                
                <div className={`bg-gradient-to-r ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
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

        {/* Bottom trust section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                <div className="text-gray-600">Oppetid</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">10,000+</div>
                <div className="text-gray-600">Fornøyde brukere</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-gray-600">Gratis alltid</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
