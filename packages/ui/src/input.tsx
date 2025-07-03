"use client";
import { motion } from 'framer-motion';
import { ReactNode } from "react";

interface InputProps {
  onChange: any;
  type?: string;
  placeholder?: string;
  className?: string;
}

export const Input = ({ onChange, placeholder, type, className }: InputProps) => {
  return (
    <motion.input
      type={type || "text"}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`bg-gray-800 text-gray-200 border border-gray-600 rounded-md pr-24 pl-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    />
  );
}
