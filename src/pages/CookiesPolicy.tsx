
import React from "react";
import { Link } from "react-router-dom";

const CookiesPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Déclaration sur les Cookies</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">1. Qu'est-ce qu'un cookie ?</h2>
        <p className="mb-4">
          Un cookie est un petit fichier texte enregistré sur votre terminal (ordinateur, tablette ou mobile) lors de votre visite sur notre site internet. Il nous permet de stocker des informations relatives à votre navigation et de vous reconnaître lors de vos visites ultérieures.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">2. Types de cookies utilisés</h2>
        <p className="mb-4">
          Notre site utilise différents types de cookies :
        </p>
        
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-3 text-gray-700">2.1. Cookies strictement nécessaires</h3>
          <p className="mb-3">
            Ces cookies sont essentiels au fonctionnement de notre site. Ils vous permettent d'utiliser les principales fonctionnalités du site (par exemple, l'accès à votre compte). Sans ces cookies, vous ne pourriez pas utiliser notre site normalement.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-3 text-gray-700">2.2. Cookies de performance</h3>
          <p className="mb-3">
            Ces cookies nous permettent de recueillir des informations sur la façon dont les visiteurs utilisent notre site (par exemple, les pages les plus consultées ou les messages d'erreur). Ils nous aident à améliorer le fonctionnement de notre site.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-3 text-gray-700">2.3. Cookies fonctionnels</h3>
          <p className="mb-3">
            Ces cookies permettent à notre site de se souvenir des choix que vous faites (comme votre nom d'utilisateur, votre langue ou la région où vous vous trouvez) et de fournir des fonctionnalités améliorées et plus personnalisées.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-3 text-gray-700">2.4. Cookies de ciblage ou publicitaires</h3>
          <p className="mb-3">
            Ces cookies sont utilisés pour vous proposer des publicités plus pertinentes pour vous et vos intérêts. Ils sont également utilisés pour limiter le nombre de fois que vous voyez une publicité et pour mesurer l'efficacité d'une campagne publicitaire.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">3. Cookies tiers</h2>
        <p className="mb-4">
          Notre site peut contenir des cookies émis par des tiers (comme Google Analytics) qui nous permettent d'obtenir des statistiques de visite, ou de vous proposer des contenus adaptés à vos centres d'intérêt.
        </p>
        <p className="mb-4">
          L'émission et l'utilisation de cookies par des tiers sont soumises aux politiques de confidentialité de ces tiers. Nous n'avons aucun contrôle sur les cookies déposés par ces sociétés.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">4. Durée de conservation des cookies</h2>
        <p className="mb-4">
          Les cookies peuvent être conservés pour une durée variable selon leur type :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Les cookies de session sont automatiquement supprimés lorsque vous fermez votre navigateur</li>
          <li>Les cookies persistants restent sur votre appareil jusqu'à ce qu'ils soient supprimés ou qu'ils atteignent leur date d'expiration</li>
        </ul>
        <p className="mb-4">
          La durée de conservation des cookies ne dépasse pas 13 mois.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">5. Finalités des cookies</h2>
        <p className="mb-4">
          Nous utilisons des cookies pour les finalités suivantes :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Assurer le bon fonctionnement du site et de ses fonctionnalités (panier, compte utilisateur, etc.)</li>
          <li>Produire des statistiques de fréquentation et d'utilisation du site</li>
          <li>Adapter la présentation de notre site aux préférences d'affichage de votre terminal</li>
          <li>Mémoriser des informations relatives à un formulaire que vous avez rempli sur notre site</li>
          <li>Vous permettre d'accéder à des espaces personnels et sécurisés de notre site</li>
          <li>Mettre en œuvre des mesures de sécurité</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">6. Gestion des cookies</h2>
        <p className="mb-4">
          Vous pouvez gérer les cookies de plusieurs façons :
        </p>
        
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-3 text-gray-700">6.1. Via notre solution de gestion des cookies</h3>
          <p className="mb-3">
            Vous pouvez gérer vos préférences en matière de cookies directement sur notre site via la page <Link to="/parametres-cookies" className="text-orange-500 hover:underline">Paramètres des cookies</Link>.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-3 text-gray-700">6.2. Via les paramètres de votre navigateur</h3>
          <p className="mb-3">
            Vous pouvez configurer votre navigateur pour qu'il accepte ou refuse tous les cookies, vous alerte lorsqu'un cookie est émis, ou supprime périodiquement les cookies qui ont déjà été placés sur votre appareil.
          </p>
          <p className="mb-3">
            Voici comment procéder avec les principaux navigateurs :
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><a href="https://support.google.com/chrome/answer/95647?hl=fr" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/fr/kb/protection-renforcee-contre-pistage-firefox-ordinateur" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Safari</a></li>
            <li><a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">Microsoft Edge</a></li>
          </ul>
          <p className="mb-3">
            Attention : si vous refusez tous les cookies, certaines fonctionnalités de notre site pourraient ne pas être disponibles.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">7. Modification de la déclaration sur les cookies</h2>
        <p className="mb-4">
          AUTO MOTIVE se réserve le droit de modifier la présente déclaration à tout moment. Les modifications entrent en vigueur dès leur publication sur le site. Nous vous encourageons à consulter régulièrement cette page pour prendre connaissance des mises à jour.
        </p>
      </section>

      <div className="mt-12 text-sm text-gray-500 text-center">
        <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
      </div>
    </div>
  );
};

export default CookiesPolicy;
