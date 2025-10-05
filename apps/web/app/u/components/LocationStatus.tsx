"use client";
import { AlertCircle, Loader2 } from "lucide-react";

export default function LocationStatus({ msg }: { msg: string }) {
  const isLoading = msg === "Loading...";

  return (
    <div className="flex flex-col items-center justify-center h-64 w-full max-w-sm mx-auto bg-gray-900 rounded-2xl shadow-2xl p-6">
      
      {isLoading ? (
        // Loading Mode
        <>
          <div className="mb-5 animate-spin-slow">
            <Loader2 size={70} className="text-blue-400" />
          </div>
          <div className="bg-gray-800 px-5 py-3 rounded-xl shadow-inner">
            <p className="text-white text-center text-lg font-semibold animate-pulse">
              {msg}
            </p>
          </div>
        </>
      ) : (
        // Error / Other Messages Mode
        <>
          <div className="mb-5">
            <AlertCircle 
              size={70} 
              className="text-red-500 animate-bounce drop-shadow-lg"
            />
          </div>
          <div className="bg-gray-800 px-5 py-3 rounded-xl border border-red-500 shadow-lg animate-pulse">
            <p className="text-white text-center text-lg font-semibold">
              {msg}
            </p>
          </div>
          <div className="mt-5 w-16 h-1 rounded-full bg-red-500 opacity-50 animate-ping"></div>
        </>
      )}
    </div>
  );
}
