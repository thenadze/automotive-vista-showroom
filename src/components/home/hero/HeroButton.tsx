
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroButton: React.FC = () => {
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      variants={buttonVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      <Button 
        asChild 
        className="bg-stone-700 hover:bg-stone-800 text-white px-5 py-4 sm:px-8 sm:py-6 rounded-md text-base sm:text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl" 
        size="lg"
      >
        <Link to="/cars" className="flex items-center gap-2">
          Voir nos véhicules
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
        </Link>
      </Button>
    </motion.div>
  );
};

export default HeroButton;
