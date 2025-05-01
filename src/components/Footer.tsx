
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-6 mt-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Automotive</h3>
            <p>Votre spécialiste automobile de confiance.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-2">À propos</h4>
              <ul>
                <li className="mb-1"><a href="#" className="hover:text-gray-300">Notre histoire</a></li>
                <li className="mb-1"><a href="#" className="hover:text-gray-300">Notre équipe</a></li>
                <li className="mb-1"><a href="#" className="hover:text-gray-300">Nos services</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Services</h4>
              <ul>
                <li className="mb-1"><a href="#" className="hover:text-gray-300">Vente de véhicules</a></li>
                <li className="mb-1"><a href="#" className="hover:text-gray-300">Entretien</a></li>
                <li className="mb-1"><a href="#" className="hover:text-gray-300">Financement</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Contact</h4>
              <ul>
                <li className="mb-1">Téléphone: (123) 456-7890</li>
                <li className="mb-1">Email: contact@automotive.com</li>
                <li className="mb-1">Adresse: 123 Rue des Voitures, 75001 Paris</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} Automotive. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
