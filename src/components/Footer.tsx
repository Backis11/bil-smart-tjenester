
import { Link } from "react-router-dom";
import { Wrench, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Wrench className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="text-xl font-bold text-white">Wrench</h3>
                <p className="text-xs text-gray-400">din digitale bilmappe</p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              Den komplette plattformen for å administrere din bil - fra service til dokumenter og verdivurdering.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Tjenester</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Finn verksted
                </Link>
              </li>
              <li>
                <Link to="/valuation" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Verdivurdering
                </Link>
              </li>
              <li>
                <Link to="/get-quote" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Få tilbud
                </Link>
              </li>
              <li>
                <Link to="/documents" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Dokumenter
                </Link>
              </li>
              <li>
                <Link to="/sell-car" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Selg bil
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Kundeservice
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Ofte stilte spørsmål
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Brukerguide
                </a>
              </li>
              <li>
                <Link to="/workshop-login" className="text-sm text-gray-400 hover:text-white transition-colors">
                  For verksteder
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Kontakt oss
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">hei@wrench.no</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">+47 22 33 44 55</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">Oslo, Norge</span>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">Kundeservice:</p>
              <p className="text-xs text-gray-500">Man-Fre: 08:00-17:00</p>
              <p className="text-xs text-gray-500">Lør-Søn: 10:00-15:00</p>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap gap-4 mb-4 md:mb-0">
            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
              Personvern
            </a>
            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
              Vilkår
            </a>
            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
              Cookies
            </a>
            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors">
              Sikkerhet
            </a>
          </div>
          <p className="text-xs text-gray-500">
            © 2024 Wrench AS. Alle rettigheter forbeholdt.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
