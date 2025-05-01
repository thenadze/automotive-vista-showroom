
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingState: React.FC = () => {
  return (
    <div className="space-y-10">
      <Skeleton className="h-64 w-full rounded-lg" />
      <div className="space-y-6">
        <Skeleton className="h-8 w-1/3 mx-auto rounded" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-100 rounded-lg overflow-hidden">
              <Skeleton className="w-full h-56" />
              <div className="p-4 space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
