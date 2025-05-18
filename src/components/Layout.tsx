
import React, { useState, useEffect } from "react";
import Navbar from "./navbar/Navbar";
import Footer from "./Footer";
import { Skeleton } from "./ui/skeleton";
import PageLoader from "./Loader";

// Simple error boundary component as a class
class ErrorBoundaryComponent extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Layout error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 text-center">
          <h2 className="text-xl text-red-600 mb-4">Something went wrong</h2>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Masquer le loader après un court délai pour assurer que tout est chargé
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Augmenté à 2 secondes pour mieux voir le logo

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {loading && <PageLoader />}
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ErrorBoundaryComponent>
          <React.Suspense fallback={
            <div className="space-y-10">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          }>
            {children}
          </React.Suspense>
        </ErrorBoundaryComponent>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
