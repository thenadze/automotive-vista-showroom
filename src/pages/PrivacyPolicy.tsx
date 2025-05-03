
import React from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Politique de Confidentialité</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">1. Introduction</h2>
        <p className="mb-4">
          La présente politique de confidentialité a pour but d'informer les utilisateurs du site internet AUTO MOTIVE de la manière dont leurs informations personnelles sont collectées et traitées.
        </p>
        <p className="mb-4">
          Au sens du règlement (UE) 2016/679 du Parlement européen et du Conseil du 27 avril 2016 (Règlement Général sur la Protection des Données, ci-après « RGPD »), le responsable du traitement est : AUTO MOTIVE, SARL au capital de 1000 EUR, immatriculée au RCS sous le numéro 981 091 978, dont le siège social est situé 27 RUE Lucien Sampaix, 95870 BEZONS.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">2. Collecte des données personnelles</h2>
        <p className="mb-4">
          Nous collectons les données personnelles suivantes :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Données d'identification : nom, prénom, adresse email, numéro de téléphone, adresse postale</li>
          <li>Données relatives au permis de conduire : numéro, date et lieu de délivrance, date d'obtention</li>
          <li>Données de paiement : informations de carte bancaire (ces données ne sont pas stockées sur nos serveurs mais traitées par nos prestataires de paiement sécurisés)</li>
          <li>Données de connexion : adresses IP, logs de connexion</li>
        </ul>
        <p className="mb-4">
          Ces données sont collectées lorsque vous :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Créez un compte sur notre site</li>
          <li>Effectuez une réservation de véhicule</li>
          <li>Remplissez un formulaire de contact</li>
          <li>Naviguez sur notre site (via les cookies)</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">3. Finalités du traitement</h2>
        <p className="mb-4">
          Nous traitons vos données personnelles pour les finalités suivantes :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Gestion des réservations et de la relation client</li>
          <li>Traitement des paiements</li>
          <li>Vérification de l'identité et des conditions requises pour la location de véhicules</li>
          <li>Communication concernant nos services (confirmations, rappels, modifications)</li>
          <li>Amélioration de nos services et de l'expérience utilisateur</li>
          <li>Respect de nos obligations légales et réglementaires</li>
          <li>Avec votre consentement, envoi d'informations commerciales et promotionnelles</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">4. Base légale du traitement</h2>
        <p className="mb-4">
          Nous traitons vos données personnelles sur les bases légales suivantes :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>L'exécution du contrat de location ou des mesures précontractuelles</li>
          <li>Le respect d'obligations légales auxquelles nous sommes soumis</li>
          <li>Notre intérêt légitime à développer et améliorer nos services</li>
          <li>Votre consentement, notamment pour l'envoi de communications commerciales</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">5. Destinataires des données</h2>
        <p className="mb-4">
          Les données collectées sont destinées à AUTO MOTIVE. Elles peuvent être transmises aux sociétés sous-traitantes auxquelles AUTO MOTIVE fait appel dans le cadre de l'exécution de ses services, notamment :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Notre hébergeur de site internet</li>
          <li>Nos prestataires de services de paiement</li>
          <li>Nos prestataires logiciels (CRM, gestion de flotte)</li>
          <li>Le cas échéant, nos conseils juridiques et comptables</li>
        </ul>
        <p className="mb-4">
          AUTO MOTIVE s'engage à ce que ces sous-traitants présentent des garanties suffisantes quant à la mise en œuvre de mesures techniques et organisationnelles appropriées pour assurer la protection de vos données.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">6. Durée de conservation</h2>
        <p className="mb-4">
          Nous conservons vos données personnelles pour une durée n'excédant pas celle nécessaire au regard des finalités pour lesquelles elles sont traitées.
        </p>
        <p className="mb-4">
          Les données relatives aux clients sont conservées pendant la durée de la relation contractuelle, puis archivées conformément aux délais de prescription légaux (5 ans pour les données à caractère commercial, 10 ans pour les données comptables).
        </p>
        <p className="mb-4">
          Les données relatives aux prospects sont conservées pour une durée de 3 ans à compter du dernier contact.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">7. Vos droits</h2>
        <p className="mb-4">
          Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Droit d'accès (article 15 du RGPD)</li>
          <li>Droit de rectification (article 16 du RGPD)</li>
          <li>Droit à l'effacement (article 17 du RGPD)</li>
          <li>Droit à la limitation du traitement (article 18 du RGPD)</li>
          <li>Droit à la portabilité (article 20 du RGPD)</li>
          <li>Droit d'opposition (article 21 du RGPD)</li>
        </ul>
        <p className="mb-4">
          Pour exercer ces droits, vous pouvez nous contacter par téléphone au 06 15 88 51 61 ou par courrier à l'adresse suivante : AUTO MOTIVE, 27 RUE Lucien Sampaix, 95870 BEZONS.
        </p>
        <p className="mb-4">
          Vous disposez également du droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL).
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">8. Transferts de données hors de l'Union Européenne</h2>
        <p className="mb-4">
          En principe, nous conservons vos données personnelles au sein de l'Union Européenne. Toutefois, certains de nos prestataires techniques peuvent être situés en dehors de l'Union Européenne. Dans ce cas, nous nous assurons qu'ils garantissent un niveau de protection des données suffisant et approprié, notamment par l'adoption de clauses contractuelles types approuvées par la Commission européenne.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">9. Sécurité des données</h2>
        <p className="mb-4">
          AUTO MOTIVE met en œuvre des mesures techniques et organisationnelles appropriées afin de garantir un niveau de sécurité adapté au risque, y compris entre autres :
        </p>
        <ul className="list-disc pl-6 mb-4 space-y-2">
          <li>Le cryptage des données lorsque cela est nécessaire</li>
          <li>Des moyens permettant de garantir la confidentialité, l'intégrité, la disponibilité et la résilience des systèmes et des services de traitement</li>
          <li>Des moyens permettant de rétablir la disponibilité des données en cas d'incident physique ou technique</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">10. Cookies</h2>
        <p className="mb-4">
          Notre site utilise des cookies. Pour plus d'informations sur la façon dont nous utilisons les cookies, veuillez consulter notre <Link to="/cookies" className="text-orange-500 hover:underline">Déclaration sur les cookies</Link>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-orange-500">11. Modifications de la politique de confidentialité</h2>
        <p className="mb-4">
          AUTO MOTIVE se réserve le droit de modifier la présente politique de confidentialité à tout moment. Nous encourageons les utilisateurs à consulter régulièrement cette page pour prendre connaissance des modifications éventuelles. Les modifications entrent en vigueur dès leur publication sur le site.
        </p>
      </section>

      <div className="mt-12 text-sm text-gray-500 text-center">
        <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
