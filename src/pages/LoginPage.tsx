
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthLoadingSpinner } from "@/components/auth/AuthLoadingSpinner";
import { useAuthCheck } from "@/hooks/useAuthCheck";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Récupérer l'URL de redirection depuis l'état de location
  const redirectTo = location.state?.redirectTo || "/";
  
  console.log("LoginPage: redirectTo =", redirectTo);

  const { authChecking, isAuthenticated } = useAuthCheck(redirectTo);

  const handleLoginSuccess = (isAdmin: boolean) => {
    if (redirectTo.startsWith('/admin')) {
      if (isAdmin) {
        console.log("LoginPage: User is admin, redirecting to", redirectTo);
        navigate(redirectTo, { replace: true });
      } else {
        console.log("LoginPage: User is not admin, redirecting to /");
        navigate("/", { replace: true });
      }
    } else {
      // Pour les pages non-admin, rediriger vers la destination demandée
      console.log("LoginPage: Redirecting to", redirectTo);
      navigate(redirectTo, { replace: true });
    }
  };

  if (authChecking) {
    return <AuthLoadingSpinner />;
  }

  if (isAuthenticated) {
    return null; // Redirection via useAuthCheck
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
        
        <LoginForm 
          redirectTo={redirectTo}
          onLoginSuccess={handleLoginSuccess}
        />
      </div>
    </div>
  );
};

export default LoginPage;
