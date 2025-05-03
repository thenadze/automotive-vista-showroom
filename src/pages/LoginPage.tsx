
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
  const [authChecking, setAuthChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;
    
    const checkAuth = async () => {
      try {
        console.log("LoginPage: Checking authentication status");
        const { data, error } = await supabase.auth.getSession();
        
        // Vérifier si le composant est toujours monté avant de mettre à jour l'état
        if (!isMounted) return;
        
        if (error) {
          console.error("Erreur lors de la vérification de l'authentification:", error);
          setAuthChecking(false);
          return;
        }
        
        if (data.session) {
          console.log("LoginPage: User is authenticated", data.session.user);
          setIsAuthenticated(true);
          
          try {
            // Vérifier si l'utilisateur est admin
            console.log("LoginPage: Checking if user is admin");
            // @ts-ignore
            const { data: adminData, error: adminError } = await supabase
              .from("admins")
              .select("*")
              .eq("id", data.session.user.id)
              .single();
              
            if (!isMounted) return;
            
            if (adminError && adminError.code !== 'PGRST116') {
              console.error("Erreur lors de la vérification du statut d'admin:", adminError);
            }
            
            // Rediriger vers le dashboard approprié
            if (adminData) {
              console.log("LoginPage: User is admin, redirecting to /admin");
              // Rediriger vers le dashboard d'administration si l'utilisateur est admin
              navigate("/admin", { replace: true });
            } else {
              console.log("LoginPage: User is not admin, redirecting to /");
              // Rediriger vers l'accueil si l'utilisateur n'est pas admin
              navigate("/", { replace: true });
            }
          } catch (err) {
            console.error("Erreur lors de la vérification du statut d'admin:", err);
            if (isMounted) {
              navigate("/", { replace: true });
            }
          }
        } else {
          console.log("LoginPage: User is not authenticated");
        }
        
        setAuthChecking(false);
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification:", error);
        if (isMounted) {
          setAuthChecking(false);
        }
      }
    };
    
    checkAuth();
    
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      console.log("LoginPage: Attempting login with email:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        console.log("LoginPage: Login successful", data.user);
        
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté.",
        });
        
        // Vérifier si l'utilisateur est admin
        try {
          // @ts-ignore
          const { data: adminData, error: adminError } = await supabase
            .from("admins")
            .select("*")
            .eq("id", data.user.id)
            .single();
            
          if (adminError && adminError.code !== 'PGRST116') {
            console.error("Erreur lors de la vérification du statut d'admin:", adminError);
          }
          
          if (adminData) {
            console.log("LoginPage: User is admin, redirecting to /admin");
            // Rediriger vers le dashboard d'administration si l'utilisateur est admin
            navigate("/admin", { replace: true });
          } else {
            console.log("LoginPage: User is not admin, redirecting to /");
            // Rediriger vers l'accueil si l'utilisateur n'est pas admin
            navigate("/", { replace: true });
          }
        } catch (err) {
          console.error("Erreur lors de la vérification du statut d'admin:", err);
          navigate("/", { replace: true });
        }
      }
    } catch (error: any) {
      console.error("Erreur de connexion:", error);
      toast({
        title: "Erreur de connexion",
        description: error.message || "Une erreur s'est produite lors de la connexion.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authChecking) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

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
