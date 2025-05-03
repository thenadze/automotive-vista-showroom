
import React from "react";
import { Link } from "react-router-dom";

const MentionsLegales = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Mentions Légales</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">1. Informations Légales</h2>
        <p className="mb-4">Conformément aux dispositions des articles 6-III et 19 de la Loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'économie numérique, dite L.C.E.N., nous portons à la connaissance des utilisateurs et visiteurs du site les informations suivantes :</p>
        
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-4">
          <h3 className="text-xl font-medium mb-3">Identité de l'entreprise</h3>
          <ul className="space-y-2">
            <li><strong>Dénomination sociale :</strong> AUTO MOTIVE</li>
            <li><strong>Forme juridique :</strong> Société à responsabilité limitée (sans autre indication)</li>
            <li><strong>Capital social :</strong> 1000 EUR</li>
            <li><strong>SIREN :</strong> 981 091 978</li>
            <li><strong>SIRET :</strong> 981 091 978 00016</li>
            <li><strong>N° TVA Intracommunautaire :</strong> FR96 981 091 978</li>
            <li><strong>Code NAF/APE :</strong> 4511Z - Commerce de voitures et de véhicules automobiles légers</li>
            <li><strong>Code APRM :</strong> 45.20A-B - Réparation automobile de véhicules automobiles légers: mécanique</li>
            <li><strong>Adresse du siège social :</strong> 27 RUE Lucien Sampaix, 95870 BEZONS, FRANCE</li>
            <li><strong>Date de création :</strong> 23/09/2023</li>
            <li><strong>Date d'immatriculation au RNE :</strong> 10/01/2024</li>
            <li><strong>Téléphone :</strong> 06 15 88 51 61</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">2. Direction de la publication</h2>
        <p className="mb-4">La direction de la publication du site est assurée par :</p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li><strong>M. SADA Mohammad, Amer</strong></li>
          <li><strong>Qualité :</strong> Gérant</li>
          <li><strong>Date de naissance :</strong> 01/1992</li>
          <li><strong>Commune de résidence :</strong> Bezons</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">3. Hébergement du site</h2>
        <p className="mb-4">
          Le site est hébergé par Lovable, un service d'hébergement web professionnel.
          Les informations concernant l'hébergeur sont disponibles sur demande.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">4. Activité principale</h2>
        <p className="mb-4">
          <strong>Activité principale :</strong> VENTE ET ACHAT DE VEHICULE LEGERS NEUFS OU D'OCCASIONS - LOCATION DE VEHICULE SANS CHAUFFEUR - REPARATION DE VEHICULES NEUFS OU OCCASIONS - VENTE DE PIECES AUTOMOBILES ET MOTOCYCLES NEUFS OU D'OCCASIONS - MISE EN PEINTURE DE TOUS TYPES DE VEHICULES EN CABINE - DEPANNAGE DE TOUS TYPE DE VEHICULES - LAVAGE DE TOUT TYPE DE VEHICULE
        </p>
        <p>
          Notre entreprise, AUTO MOTIVE, est spécialisée dans la location de véhicules premium en France. Nous nous engageons à fournir un service de qualité et à respecter toutes les réglementations en vigueur dans le cadre de nos activités.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">5. Propriété intellectuelle</h2>
        <p className="mb-4">
          L'ensemble du contenu du site, incluant de façon non limitative, les graphismes, images, textes, vidéos, animations, sons, logos, et icônes ainsi que leur mise en forme sont la propriété exclusive de la société AUTO MOTIVE, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
        </p>
        <p className="mb-4">
          Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit d'AUTO MOTIVE. Cette représentation ou reproduction, par quelque procédé que ce soit, constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">6. Données personnelles</h2>
        <p className="mb-4">
          D'une façon générale, vous pouvez visiter notre site sur Internet sans avoir à décliner votre identité et à fournir des informations personnelles vous concernant. Cependant, nous pouvons parfois vous demander des informations. Par exemple, pour traiter une demande, une réservation ou répondre à une demande de renseignement.
        </p>
        <p className="mb-4">
          Conformément aux dispositions de la loi n° 78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés, et au Règlement Général sur la Protection des Données (RGPD - UE 2016/679), vous disposez d'un droit d'accès, de modification, de rectification et de suppression des données qui vous concernent.
        </p>
        <p className="mb-4">
          Pour exercer ce droit, veuillez nous contacter par téléphone au 06 15 88 51 61 ou par courrier à l'adresse suivante : AUTO MOTIVE, 27 RUE Lucien Sampaix, 95870 BEZONS, FRANCE.
        </p>
        <p>
          Pour plus d'informations sur la façon dont nous traitons vos données, veuillez consulter notre <Link to="/privacy-policy" className="text-orange-500 hover:underline">Politique de Confidentialité</Link>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">7. Cookies</h2>
        <p className="mb-4">
          Notre site peut utiliser des cookies pour améliorer l'expérience utilisateur. Pour plus d'informations sur l'utilisation des cookies, veuillez consulter notre <Link to="/cookies" className="text-orange-500 hover:underline">Politique relative aux cookies</Link>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">8. Loi applicable et juridiction</h2>
        <p className="mb-4">
          Les présentes mentions légales sont régies par la loi française. En cas de litige relatif à l'interprétation ou à l'exécution des présentes, les tribunaux français seront seuls compétents.
        </p>
      </section>

      <div className="mt-12 text-sm text-gray-500 text-center">
        <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
      </div>
    </div>
  );
};

export default MentionsLegales;
