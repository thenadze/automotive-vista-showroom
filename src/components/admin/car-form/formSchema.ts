
import * as z from "zod";

export const carFormSchema = z.object({
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  brand_id: z.string().min(1, "La marque est requise"),
  model: z.string().min(1, "Le modèle est requis"),
  fuel_type_id: z.string().min(1, "Le type de carburant est requis"),
  transmission_id: z.string().min(1, "Le type de transmission est requis"),
  daily_price: z.number().min(0, "Le prix ne peut pas être négatif"),
  mileage: z.number().min(0, "Le kilométrage ne peut pas être négatif").default(0),
  description: z.string().optional(),
});

export type CarFormValues = z.infer<typeof carFormSchema>;
