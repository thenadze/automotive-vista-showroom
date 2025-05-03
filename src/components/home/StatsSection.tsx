import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
const StatsSection = () => {
  const isMobile = useIsMobile();
  const stats = [{
    number: "10+",
    label: "Années d'Expérience"
  }, {
    number: "1000+",
    label: "Clients Heureux"
  }, {
    number: "200+",
    label: "Véhicules"
  }, {
    number: "10+",
    label: "Emplacements"
  }];
  return;
};
export default StatsSection;