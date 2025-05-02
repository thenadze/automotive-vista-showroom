
import React from "react";
import { Button } from "@/components/ui/button";

const ContactSection: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Contactez-nous</h2>
      <p className="mb-4">
        Vous êtes intéressé par ce véhicule ? N'hésitez pas à nous contacter pour plus d'informations ou pour organiser un essai routier.
      </p>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>(123) 456-7890</span>
        </div>
        <div className="flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>contact@automotive.com</span>
        </div>
      </div>
      
      <Button className="mt-6 w-full" variant="default">
        Demander plus d'infos
      </Button>
    </div>
  );
};

export default ContactSection;
