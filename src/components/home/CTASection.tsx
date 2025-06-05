
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Users, FileText, Crown } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-r from-slate-800 via-blue-900 to-slate-900 overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0l50 50-50 50L0 50z' fill='%23ffffff' fill-opacity='0.02'/%3E%3C/svg%3E")`
        }}
      ></div>
      
      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-blue-400/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-slate-300/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-blue-300/10 rounded-full blur-lg animate-pulse delay-500"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left">
            {/* Official badge */}
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
                <Crown className="h-6 w-6 text-yellow-400" />
                <span className="text-white font-medium">Offisiell norsk tjeneste</span>
              </div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Klar til å komme i gang?
            </h2>
            <p className="text-slate-200 text-xl mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
              Opprett din digitale bilmappa i dag og dokumenter bilens historie på trygg og profesjonell måte
            </p>
            
            {/* Trust indicators */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <Shield className="h-6 w-6 text-green-400" />
                <div className="text-left">
                  <div className="text-white font-medium text-sm">GDPR-sikker</div>
                  <div className="text-slate-300 text-xs">Beskyttet lagring</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <div className="text-left">
                  <div className="text-white font-medium text-sm">100% gratis</div>
                  <div className="text-slate-300 text-xs">Alltid kostnadsfritt</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-blue-600 text-white hover:bg-blue-700 font-bold px-10 py-5 text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <Link to="/auth">
                  <FileText className="h-5 w-5 mr-3" />
                  Start gratis bilmappa
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 font-bold px-10 py-5 text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105" 
                asChild
              >
                <Link to="/auth">
                  <Users className="h-5 w-5 mr-3" />
                  Logg inn
                </Link>
              </Button>
            </div>
          </div>

          {/* Right side - Illustration */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Main illustration - Document management interface */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/20">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-white/60 text-sm">bilmappa.no</div>
                </div>

                {/* Document list */}
                <div className="space-y-3">
                  <div className="bg-white/20 rounded-lg p-3 flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-400" />
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">Kjøpskontrakt</div>
                      <div className="text-white/60 text-xs">Opplastet 15. mars 2024</div>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>

                  <div className="bg-white/20 rounded-lg p-3 flex items-center gap-3">
                    <FileText className="h-5 w-5 text-green-400" />
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">Service rapport</div>
                      <div className="text-white/60 text-xs">Opplastet 8. april 2024</div>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>

                  <div className="bg-white/20 rounded-lg p-3 flex items-center gap-3">
                    <FileText className="h-5 w-5 text-purple-400" />
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">EU-kontroll</div>
                      <div className="text-white/60 text-xs">Opplastet 20. mai 2024</div>
                    </div>
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  </div>
                </div>

                {/* Bottom stats */}
                <div className="mt-4 pt-4 border-t border-white/20 flex justify-between text-center">
                  <div>
                    <div className="text-white font-bold text-lg">12</div>
                    <div className="text-white/60 text-xs">Dokumenter</div>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">100%</div>
                    <div className="text-white/60 text-xs">Komplett</div>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">Sikker</div>
                    <div className="text-white/60 text-xs">Lagring</div>
                  </div>
                </div>
              </div>

              {/* Floating security badge */}
              <div className="absolute -top-3 -right-3 bg-green-500 rounded-full p-3 shadow-lg animate-pulse">
                <Shield className="h-6 w-6 text-white" />
              </div>

              {/* Norwegian flag element */}
              <div className="absolute -bottom-3 -left-3 bg-white rounded-lg p-2 shadow-lg">
                <div className="flex">
                  <div className="w-4 h-3 bg-red-600"></div>
                  <div className="w-1 h-3 bg-white"></div>
                  <div className="w-1 h-3 bg-blue-800"></div>
                  <div className="w-1 h-3 bg-white"></div>
                  <div className="w-4 h-3 bg-red-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
