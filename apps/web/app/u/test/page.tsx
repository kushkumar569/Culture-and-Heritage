"use client";
import { motion } from "framer-motion";

export default function Page(){
  const msg = "Loading...";

  return (
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
  );
};
