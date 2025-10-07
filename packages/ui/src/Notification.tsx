"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface NotificationProps {
  message: string;
  type?: "info" | "success" | "error";
  onClose?: () => void;
}

export const Notification = ({ message, type = "info", onClose }: NotificationProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const variants: Variants = {
    hidden: { opacity: 0, y: -30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    exit: {
      opacity: 0,
      y: 30,
      scale: 0.95,
      transition: { duration: 0.3 },
    },
  };

  const colors =
    type === "success"
      ? "bg-green-100 text-green-800 border-green-300"
      : type === "error"
      ? "bg-red-100 text-red-800 border-red-300"
      : "bg-blue-100 text-blue-800 border-blue-300";

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key="notification"
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`fixed top-6 right-6 px-6 py-3 border rounded-2xl shadow-xl ${colors}`}
        >
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="font-semibold tracking-wide"
          >
            {message}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


