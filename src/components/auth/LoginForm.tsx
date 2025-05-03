
import React, { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn } from "lucide-react";

type LoginFormProps = {
  redirectTo: string;
  onLoginSuccess: (isAdmin: boolean) => void;
};

export const LoginForm = ({ redirectTo, onLoginSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      console.log("LoginForm: Attempting login with email:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        console.log("LoginForm: Login successful", data.user);
        
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
          
          const isAdmin = !!adminData;
          onLoginSuccess(isAdmin);
          
        } catch (err) {
          console.error("Erreur lors de la vérification du statut d'admin:", err);
          onLoginSuccess(false);
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

  return (
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
  );
};
