
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const ServicesSection: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 800,
      easing: "ease-out-cubic",
      delay: 100,
      offset: 100,
    });
  }, []);

  const services = [
    {
      icon: "clock",
      title: "Essai Routier",
      description: "Essayez votre voiture préférée avant de l'acheter pour vous assurer qu'elle vous convient parfaitement."
    },
    {
      icon: "check",
      title: "Garantie Complète",
      description: "Nous offrons une garantie étendue sur tous nos véhicules pour votre tranquillité d'esprit."
    },
    {
      icon: "shield",
      title: "Fiabilité",
      description: "Des véhicules soigneusement sélectionnés et inspectés pour vous assurer une tranquillité d'esprit totale."
    }
  ];

  return (
    <section className="py-16 mb-12 relative overflow-hidden">
      {/* Background avec effet subtil */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-white z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 
          className="text-3xl font-bold mb-10 text-center text-stone-800"
          data-aos="fade-down"
          data-aos-delay="50"
        >
          Nos Services
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`
                bg-white p-8 rounded-xl shadow-md text-center 
                transform transition-all duration-500 ease-out 
                hover:shadow-xl hover:translate-y-[-8px] relative z-10
                ${hoveredIndex === index ? 'scale-105' : 'scale-100'}
              `}
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`
                bg-stone-100 w-20 h-20 mx-auto rounded-full 
                flex items-center justify-center mb-6
                transition-all duration-500 ease-out
                ${hoveredIndex === index ? 'bg-stone-200 scale-110 rotate-6' : ''}
              `}>
                <svg xmlns="http://www.w3.org/2000/svg" 
                  className={`
                    h-10 w-10 text-stone-700 
                    transition-all duration-500
                    ${hoveredIndex === index ? 'text-stone-800 scale-110' : ''}
                  `} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  {service.icon === "clock" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                  {service.icon === "check" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                  {service.icon === "shield" && (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  )}
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-stone-800">{service.title}</h3>
              <p className="text-stone-600 leading-relaxed">{service.description}</p>
              
              {/* Effet décoratif - modified to not overlap content */}
              <div className={`
                absolute -bottom-2 -right-2 w-24 h-24 bg-stone-100 rounded-full opacity-30 -z-10
                transition-all duration-500 ease-out
                ${hoveredIndex === index ? 'scale-150 opacity-10' : 'scale-100'}
              `}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
