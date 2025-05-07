
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CallToAction: React.FC = () => {
  return (
    <section className="text-white py-16 rounded-lg bg-neutral-950 overflow-hidden relative">
      {/* Cercles décoratifs animés */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-stone-700 rounded-full opacity-20 animate-pulse" style={{animationDuration: '6s'}}></div>
        <div className="absolute top-40 -right-20 w-80 h-80 bg-stone-600 rounded-full opacity-10 animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute -bottom-40 -left-10 w-72 h-72 bg-stone-800 rounded-full opacity-15 animate-pulse" style={{animationDuration: '7s'}}></div>
      </div>
      
      <div 
        className="container mx-auto text-center px-4 relative z-10"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
          className="text-3xl font-bold mb-4"
        >
          Prêt à trouver votre prochaine voiture ?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: false }}
          className="text-xl mb-8"
        >
          Parcourez notre catalogue de véhicules dès maintenant.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: false }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/cars" className="bg-stone-600 text-white hover:bg-stone-700 py-4 px-10 rounded-md text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl inline-block">
            Explorer le catalogue
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
