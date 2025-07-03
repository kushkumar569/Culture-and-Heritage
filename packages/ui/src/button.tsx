"use client";
import { motion } from 'framer-motion';
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 10px #3333ff',
        textShadow: '0 0 10px #3333ff',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 1000, damping: 20 }}
      className={`${className}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};
