"use client";
import { Loader2 } from "lucide-react";

export const Loading = () => {
  const msg = "Loading...";

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-gray-400 rounded-2xl p-6 mx-auto">
      {/* Spinner */}
      <div className="mb-5 animate-spin">
        <Loader2 size={70} className="text-blue-400" />
      </div>

      {/* Loading message */}
      <div className="bg-gray-800 px-5 py-3 rounded-xl  w-full">
        <p className="text-white text-center text-lg font-semibold animate-pulse">
          {msg}
        </p>
      </div>
    </div>
  );
};
  