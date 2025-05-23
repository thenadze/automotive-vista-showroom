
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CarsPage from "./pages/CarsPage";
import CarDetailPage from "./pages/CarDetailPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/AdminPage";
import CarEditPage from "./pages/admin/CarEditPage";
import MentionsLegales from "./pages/MentionsLegales";
import ConditionsUtilisation from "./pages/ConditionsUtilisation";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
import CookiesSettings from "./pages/CookiesSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" closeButton={true} expand={true} duration={4000} />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cars" element={<CarsPage />} />
              <Route path="/cars/:id" element={<CarDetailPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/car/:id" element={<CarEditPage />} />
              <Route path="/mentions-legales" element={<MentionsLegales />} />
              <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/cookies" element={<CookiesPolicy />} />
              <Route path="/parametres-cookies" element={<CookiesSettings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
