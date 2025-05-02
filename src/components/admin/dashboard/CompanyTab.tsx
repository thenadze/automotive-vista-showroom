
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CompanyInfo } from "@/types";

// Schéma de validation pour le formulaire d'informations de l'entreprise
const companyFormSchema = z.object({
  name: z.string().min(1, "Le nom de l'entreprise est requis"),
  description: z.string().min(1, "La description est requise"),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Email invalide").optional().or(z.literal('')),
  logo_url: z.string().optional(),
});

interface CompanyTabProps {
  companyInfo: CompanyInfo | null;
  loading: boolean;
  onCompanyInfoChange: () => Promise<any>;
}

const CompanyTab: React.FC<CompanyTabProps> = ({ 
  companyInfo, 
  loading: parentLoading, 
  onCompanyInfoChange 
}) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Formulaire pour les informations de l'entreprise
  const companyForm = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "",
      description: "",
      address: "",
      phone: "",
      email: "",
      logo_url: "",
    },
  });

  // Mettre à jour les valeurs du formulaire lorsque companyInfo change
  useEffect(() => {
    if (companyInfo) {
      companyForm.reset({
        name: companyInfo.name,
        description: companyInfo.description,
        address: companyInfo.address || "",
        phone: companyInfo.phone || "",
        email: companyInfo.email || "",
        logo_url: companyInfo.logo_url || "",
      });
    }
  }, [companyInfo]);

  // Soumettre le formulaire d'informations de l'entreprise
  const onSubmitCompanyInfo = async (values: z.infer<typeof companyFormSchema>) => {
    try {
      setLoading(true);
      if (companyInfo) {
        // Mettre à jour les informations existantes
        // @ts-ignore
        const { error } = await supabase
          .from("company_info")
          .update({
            name: values.name,
            description: values.description,
            address: values.address,
            phone: values.phone,
            email: values.email || null,
            logo_url: values.logo_url
          })
          .eq("id", companyInfo.id);
          
        if (error) throw error;
        
        toast({
          title: "Informations mises à jour",
          description: "Les informations de l'entreprise ont été mises à jour avec succès.",
        });
      } else {
        // Insérer de nouvelles informations
        // @ts-ignore
        const { error } = await supabase
          .from("company_info")
          .insert([{
            name: values.name,
            description: values.description,
            address: values.address,
            phone: values.phone,
            email: values.email || null,
            logo_url: values.logo_url
          }]);
          
        if (error) throw error;
        
        toast({
          title: "Informations ajoutées",
          description: "Les informations de l'entreprise ont été ajoutées avec succès.",
        });
      }
      
      onCompanyInfoChange();
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors de la mise à jour des informations.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Informations de l'entreprise</h2>
      
      <Form {...companyForm}>
        <form onSubmit={companyForm.handleSubmit(onSubmitCompanyInfo)} className="space-y-4">
          <FormField
            control={companyForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l'entreprise</FormLabel>
                <FormControl>
                  <Input placeholder="Automotive" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={companyForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description de l'entreprise..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={companyForm.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Rue des Voitures" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={companyForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="+33 123 456 789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={companyForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="contact@automotive.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={companyForm.control}
              name="logo_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL du logo</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/logo.png" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <Button type="submit" disabled={loading || parentLoading}>
            {loading ? "Enregistrement..." : "Enregistrer"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CompanyTab;
