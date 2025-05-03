
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email.trim() === "") {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse email valide",
        variant: "destructive",
      });
      return;
    }

    // Ici, vous pourriez ajouter la logique pour enregistrer l'email
    toast({
      title: "Merci de votre inscription !",
      description: "Vous recevrez prochainement nos dernières offres",
    });
    
    setEmail("");
  };

  return (
    <section className="py-12 bg-stone-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Inscrivez-vous à notre newsletter</h2>
          <p className="text-stone-300 mb-6">
            Recevez nos dernières offres et promotions directement dans votre boîte mail
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              className="flex-grow px-4 py-2 rounded-md text-stone-900 focus:outline-none"
              required
            />
            <Button type="submit" className="bg-stone-700 hover:bg-stone-800 text-white">
              S'inscrire
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
