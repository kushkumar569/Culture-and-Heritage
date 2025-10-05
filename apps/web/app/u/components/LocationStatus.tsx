"use client";
import { AlertCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function LocationStatus({ msg }: { msg: string }) {
  const isLoading = msg === "Loading..." || msg === "Searching places...";

  return (
    <div className="flex flex-col items-center justify-center h-64 w-full max-w-sm mx-auto bg-gray-900 rounded-2xl shadow-2xl p-6">

      {isLoading ? (
        // Loading Mode
        <>
          <div className="flex flex-col items-center justify-center h-full w-full bg-gray-900 text-white rounded-2xl p-6 mx-auto">
            {/* Framer Motion Spinner */}
            <motion.div
              className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full mb-5"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              }}
            />

            {/* Blinking Loading text */}
            <motion.p
              className="text-lg font-medium"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
            >
              {msg}
            </motion.p>
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
