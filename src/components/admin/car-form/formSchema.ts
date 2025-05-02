
import * as z from "zod";

// Schema de validation pour le formulaire
export const carFormSchema = z.object({
  year: z.coerce
    .number()
    .min(1900, "L'année doit être supérieure à 1900")
    .max(new Date().getFullYear() + 1, `L'année doit être au maximum ${new Date().getFullYear() + 1}`),
  brand_id: z.coerce.number({
    required_error: "La marque est requise",
  }),
  model: z.string().min(1, "Le modèle est requis"),
  fuel_type_id: z.coerce.number({
    required_error: "Veuillez sélectionner un type de carburant",
  }),
  transmission_id: z.coerce.number({
    required_error: "La boîte de vitesse est requise",
  }),
});

export type CarFormValues = z.infer<typeof carFormSchema>;
