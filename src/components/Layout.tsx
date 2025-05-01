
import React, { Suspense } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Skeleton } from "./ui/skeleton";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Suspense fallback={
          <div className="space-y-10">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        }>
          {children}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
