
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
        
        // Check if user is admin
        const { data: adminData } = await supabase
          .from("admins")
          .select("*")
          .eq("id", data.session.user.id)
          .single();
          
        setIsAdmin(!!adminData);
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsAuthenticated(!!session);
        if (session) {
          const { data: adminData } = await supabase
            .from("admins")
            .select("*")
            .eq("id", session.user.id)
            .single();
            
          setIsAdmin(!!adminData);
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Automotive</Link>
        
        <div className="flex gap-6">
          <Link to="/" className="hover:text-gray-300">Accueil</Link>
          <Link to="/cars" className="hover:text-gray-300">Voitures</Link>
          {isAdmin && (
            <Link to="/admin" className="hover:text-gray-300">Administration</Link>
          )}
          {isAuthenticated ? (
            <button onClick={handleLogout} className="hover:text-gray-300">Déconnexion</button>
          ) : (
            <Link to="/login" className="hover:text-gray-300">Connexion</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
