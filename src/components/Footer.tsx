import React from "react";
import { Link } from "react-router-dom";
import { Instagram, FileText, MapPin, Phone, Mail, Clock } from "lucide-react";
import { Separator } from "./ui/separator";
const Footer = () => {
  return <footer className="text-white pt-12 pb-6 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div>
            <Link to="/" className="text-xl font-bold flex items-center mb-4">
              <span className="text-orange-500">Auto</span>
              <span>motive</span>
            </Link>
            <p className="text-gray-400 mb-4">Votre partenaire de confiance pour la vente de véhicules légers en France.</p>
            
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-orange-500 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.tiktok.com/@automotive321" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-orange-500 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                {/* TikTok custom SVG icon since it's not available in lucide-react */}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor">
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" fill="currentColor" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Pages Importantes</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-orange-500 transition-colors">Accueil</Link></li>
              <li><Link to="/cars" className="text-gray-400 hover:text-orange-500 transition-colors">Nos Véhicules</Link></li>
            </ul>
          </div>
          
          <div id="contact">
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start group">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-2 text-orange-500 group-hover:-translate-y-1 transition-transform duration-300">
                  <MapPin className="w-5 h-5" />
                </span>
                <span>27 Rue Lucien Sampaix, 95870 Bezons</span>
              </li>
              <li className="flex items-start group">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-2 text-orange-500 group-hover:-translate-y-1 transition-transform duration-300">
                  <Phone className="w-5 h-5" />
                </span>
                <span>06 15 88 51 61</span>
              </li>
              <li className="flex items-start group">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-2 text-orange-500 group-hover:-translate-y-1 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
                </span>
                <span>À définir</span>
              </li>
              <li className="flex items-start group">
                <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-2 text-orange-500 group-hover:-translate-y-1 transition-transform duration-300">
                  <Clock className="w-5 h-5" />
                </span>
                <span>Lun-Dim 10h-19H | Semaine RDV et WE sans RDV</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 mt-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500">&copy; {new Date().getFullYear()} Automotive. Tous droits réservés.</p>
            
            <div className="mt-4 md:mt-0">
              <Link to="/privacy-policy" className="flex items-center text-sm text-gray-400 hover:text-orange-500 transition-colors">
                <FileText className="w-4 h-4 mr-1" />
                Politique de Confidentialité
              </Link>
            </div>
          </div>
        </div>

        {/* Liens légaux discrets */}
        <div className="mt-4 pt-2 text-center">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-500">
            <Link to="/mentions-legales" className="hover:text-gray-400">Mentions légales</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/conditions-utilisation" className="hover:text-gray-400">Conditions d'utilisation</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/privacy-policy" className="hover:text-gray-400">Déclaration de confidentialité</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/cookies" className="hover:text-gray-400">Déclaration sur les Cookies</Link>
            <span className="hidden sm:inline">|</span>
            <Link to="/parametres-cookies" className="hover:text-gray-400">Paramètres des cookies</Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;