
import React, { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import PageLoader from "./Loader";
import LayoutContent from "./LayoutContent";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Masquer le loader après un court délai pour assurer que tout est chargé
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Augmenté à 2 secondes pour mieux voir le logo

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {loading && <PageLoader />}
      <Navbar />
      <LayoutContent>{children}</LayoutContent>
      <Footer />
    </div>
  );
};

export default Layout;
