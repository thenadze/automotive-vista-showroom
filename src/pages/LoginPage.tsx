
import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
        
        // Vérifier si l'utilisateur est admin
        // @ts-ignore
        const { data: adminData } = await supabase
          .from("admins")
          .select("*")
          .eq("id", data.session.user.id)
          .single();
          
        if (adminData) {
          // Rediriger vers le dashboard d'administration si l'utilisateur est admin
          navigate("/admin");
        } else {
          // Rediriger vers l'accueil si l'utilisateur n'est pas admin
          navigate("/");
        }
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté.",
        });
        
        // Vérifier si l'utilisateur est admin
        // @ts-ignore
        const { data: adminData } = await supabase
          .from("admins")
          .select("*")
          .eq("id", data.user.id)
          .single();
          
        if (adminData) {
          // Rediriger vers le dashboard d'administration si l'utilisateur est admin
          navigate("/admin");
        } else {
          // Rediriger vers l'accueil si l'utilisateur n'est pas admin
          navigate("/");
        }
      }
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Une erreur s'est produite lors de la connexion.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return null; // Redirection via useEffect
  }

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Connexion à l'administration</h1>
          <p className="mt-2 text-gray-600">
            Connectez-vous pour accéder au tableau de bord d'administration
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Adresse e-mail
            </label>
            <Input
              id="email"
              type="email"
              required
              className="mt-1"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <Input
              id="password"
              type="password"
              required
              className="mt-1"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full"
            >
              <LogIn className="mr-2 h-4 w-4" />
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
