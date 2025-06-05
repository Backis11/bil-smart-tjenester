
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-16 bg-blue-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Klar til å komme i gang?
        </h2>
        <p className="text-blue-100 text-lg mb-2">
          Opprett din digitale bilmappa i dag og dokumenter bilens historie
        </p>
        <p className="text-blue-100 font-semibold mb-8">
          Helt gratis!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" asChild>
            <Link to="/auth">
              Start gratis bilmappa
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
            <Link to="/services">
              Finn verksted
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
