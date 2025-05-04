
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.43.2";

// Configuration CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml; charset=utf-8',
};

interface Car {
  id: string;
}

serve(async (req) => {
  // Gestion des requêtes CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Création du client Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") as string;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Récupération des voitures depuis la base de données
    const { data: cars, error } = await supabase
      .from("cars")
      .select("id")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    // URL de base du site (à adapter selon l'environnement)
    const baseUrl = "https://automotive-vista-showroom.lovable.dev";
    const currentDate = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD

    // Construction du sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/cars</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;

    // Ajout des pages de détail des voitures
    if (cars && cars.length > 0) {
      cars.forEach((car: Car) => {
        sitemap += `
  <url>
    <loc>${baseUrl}/cars/${car.id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      });
    }

    // Ajout des pages statiques
    sitemap += `
  <url>
    <loc>${baseUrl}/mentions-legales</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/conditions-utilisation</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/privacy-policy</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${baseUrl}/cookies</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>`;

    // Retour du sitemap généré
    return new Response(sitemap, { headers: corsHeaders });

  } catch (error) {
    console.error("Erreur lors de la génération du sitemap:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://automotive-vista-showroom.lovable.dev/</loc>
    <priority>1.0</priority>
  </url>
</urlset>`,
      { headers: corsHeaders, status: 500 }
    );
  }
});
