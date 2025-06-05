
import { Link } from "react-router-dom";
import { Wrench, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">Bilmappa</h3>
                <p className="text-xs text-gray-400">din digitale bilmappa</p>
              </div>
            </Link>
            <p className="text-sm text-gray-400 mb-2 leading-relaxed">
              Hold orden på bilens viktige dokumenter - enkelt, sikkert og gratis.
            </p>
            <p className="text-sm text-green-400 font-semibold mb-4">
              Helt gratis!
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-blue-500 cursor-pointer transition-colors active:scale-95" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-pink-500 cursor-pointer transition-colors active:scale-95" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors active:scale-95" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors active:scale-95" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Tjenester</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/auth" className="text-sm text-gray-400 hover:text-white transition-colors active:text-blue-400">
                  Start din bilmappa
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-sm text-gray-400 hover:text-white transition-colors active:text-blue-400">
                  Dokumenter historie
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors active:text-blue-400">
                  Verdi ved salg (kommer snart)
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors active:text-blue-400">
                  Kundeservice
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors active:text-blue-400">
                  Ofte stilte spørsmål
                </a>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-400 hover:text-white transition-colors active:text-blue-400">
                  Blogg
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors active:text-blue-400">
                  Kontakt oss
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">hei@bilmappa.no</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <span className="text-sm text-gray-400">+47 22 33 44 55</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
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

        <Separator className="my-6 sm:my-8 bg-gray-700" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4">
            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors active:text-blue-400">
              Personvern
            </a>
            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors active:text-blue-400">
              Vilkår
            </a>
            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors active:text-blue-400">
              Cookies
            </a>
            <a href="#" className="text-xs text-gray-400 hover:text-white transition-colors active:text-blue-400">
              Sikkerhet
            </a>
          </div>
          <p className="text-xs text-gray-500">
            © 2024 Bilmappa AS. Alle rettigheter forbeholdt.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
