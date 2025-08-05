// components/ImageCard.tsx
"use client";
import { motion } from "framer-motion";
import { type JSX } from "react";

export function ImageCard({
    name,
    location,
    imageUrl,
    rating,
    children,
}: {
    name: string;
    location: string;
    imageUrl: string;
    rating: number;
    children: React.ReactNode;
}): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-gray-900 p-4 text-gray-200">
            <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                className="w-[90%] max-w-3xl h-[75vh] bg-gray-700 p-6 rounded-3xl shadow-xl flex flex-col items-center justify-between"
            >
                <h1 className="text-2xl font-bold text-center mb-6 text-white">{name}</h1>

                {/* Zoom effect only on image */}
                <motion.div
                    whileHover={{ scale: 1.3 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="overflow-hidden w-full h-[45vh] rounded-xl mb-4"
                >
                    <motion.img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover rounded-xl"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                </motion.div>

                <p className="text-center text-lg text-white">{location}</p>
                <p className="text-center text-white text-lg">⭐ Rating: {rating}</p>
                <div className="text-center mt-2">{children}</div>
            </motion.div>
        </div>
    );
}
