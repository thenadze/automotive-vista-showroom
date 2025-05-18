
import React, { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";
import { Skeleton } from "./ui/skeleton";

interface LayoutContentProps {
  children: React.ReactNode;
}

const LayoutContent: React.FC<LayoutContentProps> = ({ children }) => {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <ErrorBoundary>
        <Suspense fallback={
          <div className="space-y-10">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        }>
          {children}
        </Suspense>
      </ErrorBoundary>
    </main>
  );
};

export default LayoutContent;
