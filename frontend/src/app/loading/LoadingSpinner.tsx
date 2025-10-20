import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
        role="status"
      >
        <span className="sr-only">Loading ...</span>
      </div>
    </div>
  );
};
