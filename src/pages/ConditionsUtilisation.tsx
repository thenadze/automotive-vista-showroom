import React from "react";
import { Link } from "react-router-dom";

const ConditionsUtilisation = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Conditions Générales d'Utilisation</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">1. Objet</h2>
        <p className="mb-4">
          Les présentes conditions générales d'utilisation (ci-après dénommées « CGU ») ont pour objet de définir les modalités et conditions d'utilisation des services proposés sur le site internet d'AUTO MOTIVE (ci-après dénommé « le Site »), ainsi que de définir les droits et obligations des parties dans ce cadre.
        </p>
        <p className="mb-4">
          Elles sont accessibles et imprimables à tout moment par un lien direct en bas de page du Site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">2. Exploitant du site</h2>
        <p className="mb-4">
          Le Site est exploité par la société AUTO MOTIVE, SARL au capital social de 1000 EUR, immatriculée au RCS sous le numéro 981 091 978, dont le siège social est situé 27 RUE Lucien Sampaix, 95870 BEZONS (ci-après dénommée « AUTO MOTIVE »).
        </p>
        <p className="mb-4">
          AUTO MOTIVE peut être contactée aux coordonnées suivantes :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-1">
          <li>Adresse : 27 RUE Lucien Sampaix, 95870 BEZONS</li>
          <li>Téléphone : 06 15 88 51 61</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">3. Accès au site</h2>
        <p className="mb-4">
          Le Site est accessible gratuitement à tout utilisateur disposant d'un accès à internet. Tous les coûts afférents à l'accès au Site, que ce soient les frais matériels, logiciels ou d'accès à internet sont exclusivement à la charge de l'utilisateur.
        </p>
        <p className="mb-4">
          L'utilisateur est seul responsable du bon fonctionnement de son équipement informatique ainsi que de son accès à internet.
        </p>
        <p className="mb-4">
          AUTO MOTIVE se réserve le droit de refuser l'accès au Site, unilatéralement et sans notification préalable, à tout utilisateur ne respectant pas les présentes CGU.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">4. Services proposés</h2>
        <p className="mb-4">
          Le Site a pour objet de proposer aux utilisateurs la vente de véhicules légers et la vente de prestations associées.
        </p>
        <p className="mb-4">
          Les caractéristiques et modalités essentielles des services proposés sont présentées et détaillées sur le Site. L'utilisateur est tenu d'en prendre connaissance avant toute commande.
        </p>
        <p className="mb-4">
          Les offres de services sont valables tant qu'elles sont visibles sur le Site et dans la limite des stocks disponibles.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">5. Processus d'achat</h2>
        <p className="mb-4">
          Pour acheter un véhicule, l'utilisateur doit suivre les étapes suivantes :
        </p>
        <ol className="list-decimal pl-6 mb-4 space-y-2">
          <li>Sélection du véhicule</li>
          <li>Vérification des disponibilités</li>
          <li>Le cas échéant, sélection d'options supplémentaires</li>
          <li>Saisie des coordonnées personnelles</li>
          <li>Vérification et validation du récapitulatif de la commande</li>
          <li>Acceptation des CGU et des conditions de vente</li>
          <li>Paiement d'un acompte ou de la totalité du prix selon les conditions applicables</li>
        </ol>
        <p className="mb-4">
          La commande n'est définitivement confirmée et n'engage AUTO MOTIVE qu'après l'envoi à l'utilisateur d'un e-mail de confirmation.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">6. Conditions financières</h2>
        <p className="mb-4">
          Les prix des véhicules et services sont indiqués sur le Site en euros toutes taxes comprises (TTC). Ils peuvent être modifiés à tout moment par AUTO MOTIVE. Les prix facturés sont ceux en vigueur au moment de la validation de la commande.
        </p>
        <p className="mb-4">
          Le paiement peut être effectué par carte bancaire, virement ou tout autre moyen proposé sur le Site. AUTO MOTIVE utilise des systèmes de paiement sécurisés qui garantissent la sécurité et la confidentialité des données transmises.
        </p>
        <p className="mb-4">
          En cas d'annulation, les conditions de remboursement sont détaillées dans les conditions particulières de vente.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">7. Obligations de l'utilisateur</h2>
        <p className="mb-4">
          L'utilisateur s'engage à utiliser le Site de manière conforme à sa destination et à ne pas porter atteinte à l'ordre public, aux bonnes mœurs ou aux droits de tiers, à ne pas enfreindre les lois et règlements en vigueur.
        </p>
        <p className="mb-4">
          L'utilisateur s'engage à fournir des informations exactes et complètes lors de la création de son compte et lors de toute commande.
        </p>
        <p className="mb-4">
          L'utilisateur s'engage à respecter les conditions particulières de vente, notamment les conditions d'âge, d'ancienneté du permis de conduire et de présentation des documents originaux lors de la prise en charge du véhicule.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">8. Garantie et responsabilité</h2>
        <p className="mb-4">
          AUTO MOTIVE ne garantit pas que le Site sera exempt d'anomalies, d'erreurs ou de bugs, ni que ceux-ci pourront être corrigés, ni que le Site fonctionnera sans interruption ou panne, ni encore qu'il est compatible avec un matériel ou une configuration particulière.
        </p>
        <p className="mb-4">
          En aucun cas AUTO MOTIVE ne sera responsable des dommages directs ou indirects tels que, notamment, perte de données, perte de profit, perte de clientèle ou tout autre préjudice qui résulterait de l'utilisation ou de l'impossibilité d'utilisation du Site.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">9. Propriété intellectuelle</h2>
        <p className="mb-4">
          Tous les éléments du Site, qu'ils soient visuels ou sonores, y compris la technologie sous-jacente, sont protégés par le droit d'auteur, des marques ou des brevets.
        </p>
        <p className="mb-4">
          Ils sont la propriété exclusive d'AUTO MOTIVE. L'utilisateur qui dispose d'un site Internet à titre personnel et qui désire placer, pour un usage personnel, sur son site un lien simple renvoyant directement à la page d'accueil du Site, doit obligatoirement en demander l'autorisation à AUTO MOTIVE.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">10. Données personnelles</h2>
        <p className="mb-4">
          AUTO MOTIVE pratique une politique de protection des données personnelles dont les caractéristiques sont explicitées dans la rubrique intitulée « <Link to="/privacy-policy" className="text-orange-500 hover:underline">Politique de confidentialité</Link> », dont l'utilisateur est expressément invité à prendre connaissance.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">11. Durée et modifications</h2>
        <p className="mb-4">
          Les présentes conditions d'utilisation sont conclues pour une durée indéterminée.
        </p>
        <p className="mb-4">
          AUTO MOTIVE se réserve le droit de modifier, à tout moment, tout ou partie des présentes CGU. Les modifications entrent en vigueur à la date de leur mise en ligne sur le Site et sont opposables à la date de la première utilisation par l'utilisateur.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">12. Loi applicable et juridiction compétente</h2>
        <p className="mb-4">
          Les présentes CGU sont régies par la loi française.
        </p>
        <p className="mb-4">
          En cas de différend concernant la validité, l'interprétation ou l'exécution des présentes CGU, les parties chercheront, en priorité, à le résoudre amiablement.
        </p>
        <p className="mb-4">
          À défaut d'accord amiable, le litige sera soumis aux tribunaux français compétents, sous réserve des dispositions légales applicables.
        </p>
      </section>

      <div className="mt-12 text-sm text-gray-500 text-center">
        <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
      </div>
    </div>
  );
};

export default ConditionsUtilisation;
