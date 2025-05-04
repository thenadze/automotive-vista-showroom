
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ServicesSection: React.FC = () => {
  useEffect(() => {
    AOS.init({
      once: true, // Animation se déclenche une seule fois
      duration: 800, // Durée de l'animation
      easing: "ease-out", // Type d'easing
      delay: 100, // Délai initial
    });
  }, []);

  return (
    <section className="mb-12">
      <h2 
        className="text-3xl font-bold mb-6 text-center text-stone-800"
        data-aos="fade-down"
        data-aos-delay="50"
      >
        Nos Services
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div 
          className="bg-white p-6 rounded-lg shadow-md text-center service-card group"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="bg-stone-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 service-icon group-hover:animate-service-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-stone-700 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-stone-800">Essai Routier</h3>
          <p className="text-stone-600">Essayez votre voiture préférée avant de l'acheter pour vous assurer qu'elle vous convient parfaitement.</p>
        </div>
        
        <div 
          className="bg-white p-6 rounded-lg shadow-md text-center service-card group"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="bg-stone-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 service-icon group-hover:animate-service-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-stone-700 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-stone-800">Garantie Complète</h3>
          <p className="text-stone-600">Nous offrons une garantie étendue sur tous nos véhicules pour votre tranquillité d'esprit.</p>
        </div>
        
        <div 
          className="bg-white p-6 rounded-lg shadow-md text-center service-card group"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="bg-stone-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 service-icon group-hover:animate-service-icon">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-stone-700 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-stone-800">Financement</h3>
          <p className="text-stone-600">Des options de financement flexibles pour vous aider à acheter la voiture de vos rêves.</p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
