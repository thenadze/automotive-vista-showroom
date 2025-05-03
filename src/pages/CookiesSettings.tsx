
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { Shield, Settings, Cookie } from "lucide-react";

const CookiesSettings = () => {
  // État pour gérer les consentements
  const [cookieConsent, setCookieConsent] = useState({
    necessary: true, // toujours activé
    performance: false,
    functional: false,
    targeting: false
  });

  // Gestionnaire de changement pour les switches
  const handleConsentChange = (cookieType: 'necessary' | 'performance' | 'functional' | 'targeting') => {
    if (cookieType === 'necessary') return; // Les cookies nécessaires ne peuvent pas être désactivés
    
    setCookieConsent(prev => ({
      ...prev,
      [cookieType]: !prev[cookieType]
    }));
  };

  // Gestionnaire pour sauvegarder les préférences
  const savePreferences = () => {
    // Dans un cas réel, nous enregistrerions les préférences dans un cookie
    // et nous appliquerions les consentements aux différents services
    localStorage.setItem('cookieConsent', JSON.stringify(cookieConsent));
    
    toast({
      title: "Préférences enregistrées",
      description: "Vos paramètres de cookies ont été mis à jour.",
    });
  };

  // Accepter tous les cookies
  const acceptAll = () => {
    const allConsent = {
      necessary: true,
      performance: true,
      functional: true,
      targeting: true
    };
    setCookieConsent(allConsent);
    localStorage.setItem('cookieConsent', JSON.stringify(allConsent));
    
    toast({
      title: "Tous les cookies acceptés",
      description: "Vous avez accepté tous les cookies.",
    });
  };

  // Refuser tous les cookies (sauf nécessaires)
  const rejectAll = () => {
    const minimalConsent = {
      necessary: true,
      performance: false,
      functional: false,
      targeting: false
    };
    setCookieConsent(minimalConsent);
    localStorage.setItem('cookieConsent', JSON.stringify(minimalConsent));
    
    toast({
      title: "Cookies non essentiels refusés",
      description: "Seuls les cookies nécessaires au fonctionnement du site sont activés.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Paramètres des Cookies</h1>
      
      <div className="mb-8">
        <p className="text-gray-600 mb-6">
          Notre site utilise des cookies pour vous offrir une expérience optimale. Vous pouvez personnaliser vos préférences en matière de cookies ci-dessous.
        </p>
        
        <div className="flex justify-center space-x-4 mb-8">
          <Button
            onClick={acceptAll}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Accepter tous les cookies
          </Button>
          <Button
            onClick={rejectAll}
            variant="outline"
            className="border-orange-500 text-orange-500 hover:bg-orange-50"
          >
            Refuser les cookies non essentiels
          </Button>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 p-2 rounded-full text-orange-500">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Cookies strictement nécessaires</h3>
                <p className="text-gray-600 text-sm">
                  Ces cookies sont essentiels au fonctionnement de notre site. Sans ces cookies, vous ne pourriez pas utiliser des fonctionnalités de base comme la connexion sécurisée.
                </p>
              </div>
            </div>
            <Switch
              checked={cookieConsent.necessary}
              onCheckedChange={() => {}}
              disabled={true}
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="bg-gray-100 p-2 rounded-full text-gray-500">
                <Settings size={24} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Cookies de performance</h3>
                <p className="text-gray-600 text-sm">
                  Ces cookies nous permettent d'analyser votre utilisation du site afin d'en améliorer les performances et la navigation.
                </p>
              </div>
            </div>
            <Switch
              checked={cookieConsent.performance}
              onCheckedChange={() => handleConsentChange('performance')}
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="bg-gray-100 p-2 rounded-full text-gray-500">
                <Cookie size={24} />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Cookies fonctionnels</h3>
                <p className="text-gray-600 text-sm">
                  Ces cookies permettent d'améliorer les fonctionnalités et la personnalisation de votre expérience sur notre site.
                </p>
              </div>
            </div>
            <Switch
              checked={cookieConsent.functional}
              onCheckedChange={() => handleConsentChange('functional')}
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
        </div>

        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="bg-gray-100 p-2 rounded-full text-gray-500">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Cookies de ciblage et publicitaires</h3>
                <p className="text-gray-600 text-sm">
                  Ces cookies sont utilisés pour vous proposer des publicités et des contenus adaptés à vos centres d'intérêt.
                </p>
              </div>
            </div>
            <Switch
              checked={cookieConsent.targeting}
              onCheckedChange={() => handleConsentChange('targeting')}
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Button
          onClick={savePreferences}
          className="bg-orange-500 hover:bg-orange-600 px-8"
        >
          Enregistrer mes préférences
        </Button>
      </div>

      <div className="mt-12 text-sm text-gray-500 text-center">
        <p>
          Pour plus d'informations sur notre utilisation des cookies, veuillez consulter notre <a href="/cookies" className="text-orange-500 hover:underline">Déclaration sur les cookies</a>.
        </p>
      </div>
    </div>
  );
};

export default CookiesSettings;
