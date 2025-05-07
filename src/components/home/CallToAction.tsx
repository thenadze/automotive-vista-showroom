
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CallToAction: React.FC = () => {
  return (
    <section className="text-white py-16 rounded-lg bg-neutral-950 overflow-hidden relative">
      {/* Motifs décoratifs enrichis */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cercles décoratifs animés */}
        <motion.div 
          className="absolute -top-20 -left-20 w-64 h-64 bg-stone-700 rounded-full opacity-20"
          animate={{ 
            y: [0, 10, 0], 
            x: [0, 5, 0], 
            scale: [1, 1.03, 1]
          }}
          transition={{ 
            duration: 6, 
            ease: "easeInOut", 
            repeat: Infinity 
          }}
        />
        <motion.div 
          className="absolute top-40 -right-20 w-80 h-80 bg-stone-600 rounded-full opacity-10"
          animate={{ 
            y: [0, -15, 0], 
            x: [0, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 8, 
            ease: "easeInOut", 
            repeat: Infinity 
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-10 w-72 h-72 bg-stone-800 rounded-full opacity-15"
          animate={{ 
            y: [0, -10, 0], 
            scale: [1, 0.98, 1]
          }}
          transition={{ 
            duration: 7, 
            ease: "easeInOut", 
            repeat: Infinity 
          }}
        />
        
        {/* Motifs géométriques */}
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "25px 25px"
        }}></div>
        
        {/* Motif en grille hexagonale */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }} />
        
        {/* Lignes diagonales décoratives */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10" style={{
          backgroundImage: "repeating-linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 1px, transparent 1px, transparent 10px)"
        }}></div>
        
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 opacity-5" style={{
          backgroundImage: "repeating-linear-gradient(-45deg, rgba(255,255,255,0.05), rgba(255,255,255,0.05) 1px, transparent 1px, transparent 15px)"
        }}></div>
        
        {/* Points lumineux dispersés */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-white rounded-full opacity-30" />
          <div className="absolute top-3/4 left-2/5 w-1.5 h-1.5 bg-white rounded-full opacity-40" />
          <div className="absolute top-1/3 left-4/5 w-1 h-1 bg-white rounded-full opacity-20" />
          <div className="absolute top-2/3 left-1/5 w-1 h-1 bg-white rounded-full opacity-30" />
          <div className="absolute top-1/2 left-3/5 w-2 h-2 bg-white rounded-full opacity-25" />
          <div className="absolute top-1/5 left-1/2 w-1 h-1 bg-white rounded-full opacity-30" />
        </div>
        
        {/* Formes abstraites */}
        <motion.div 
          className="absolute bottom-0 right-20 w-40 h-40 opacity-10"
          animate={{ 
            y: [0, -15, 0], 
            rotate: [0, 3, 0]
          }}
          transition={{ 
            duration: 8, 
            ease: "easeInOut", 
            repeat: Infinity 
          }}
        >
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFFFFF" d="M40.2,-62.6C52,-52.2,61.6,-40.6,65.9,-27.5C70.2,-14.3,69.1,0.4,65,14C60.9,27.5,53.8,39.9,43.5,49.2C33.1,58.5,19.6,64.8,4.7,69C-10.2,73.2,-26.5,75.3,-40.1,69.6C-53.7,63.9,-64.4,50.3,-69.8,35C-75.2,19.8,-75.2,2.8,-71.6,-12.8C-68,-28.5,-60.8,-42.8,-49.9,-53.3C-39,-63.8,-24.4,-70.5,-9.5,-72C5.4,-73.5,13.3,-69.7,24.2,-66.1C35.1,-62.4,48.8,-59,58.2,-50C67.5,-41,72.5,-26.4,74,-11.7C75.6,2.9,73.8,17.6,67.9,30.1C62,42.6,52,52.9,40.2,59C28.4,65.1,14.2,67,0.6,66.1C-13,65.1,-26,61.3,-39.3,56.3C-52.5,51.3,-66,45.1,-71.7,34C-77.4,22.9,-75.3,6.9,-71.2,-7.5C-67.1,-21.9,-60.9,-34.6,-51.6,-45.4C-42.2,-56.2,-29.7,-65,-16,-67.1C-2.3,-69.3,11.5,-64.8,24.1,-61.5C36.8,-58.1,48.2,-55.9,56.5,-48.7C64.9,-41.6,70.3,-29.4,68.7,-18C67.1,-6.6,58.6,4,51.5,14C44.4,24,38.8,33.5,30.3,37.9C21.8,42.3,10.9,41.7,-0.8,42.9C-12.5,44.2,-25,47.3,-37.9,45.4C-50.7,43.5,-64,36.6,-68.1,25.8C-72.3,15,-67.4,0.3,-64.2,-14.6C-60.9,-29.5,-59.2,-44.5,-51.2,-55.4C-43.2,-66.3,-28.8,-73,-14.1,-70.6C0.6,-68.1,15.5,-56.5,24.4,-49.5C33.4,-42.5,36.3,-40,47.3,-32.9C58.2,-25.8,77.2,-14.2,79.7,-0.9C82.1,12.5,68.1,27.7,55.7,39.4C43.4,51.1,32.7,59.3,19.5,63.8C6.3,68.3,-9.5,69.1,-23.6,65.9C-37.8,62.7,-50.4,55.6,-57.6,44.7C-64.8,33.8,-66.6,19.2,-71,3.2C-75.3,-12.8,-82.2,-30.1,-77.2,-42.1C-72.2,-54.1,-55.2,-60.7,-40.3,-66.3C-25.3,-71.9,-12.7,-76.6,0.4,-77.1C13.4,-77.7,26.9,-74.2,40.2,-70.8Z" transform="translate(100 100)" />
          </svg>
        </motion.div>
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
