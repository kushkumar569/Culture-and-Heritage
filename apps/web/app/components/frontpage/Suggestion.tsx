"use client";
import { useState, useEffect } from "react";
import { ImageCard } from "@repo/ui/ImageCard";
import { Button } from "@repo/ui/button";
import { Loading } from "@repo/ui/Loading";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';


export default function Suggestions() {
    return ( 
        <div className="relative w-full h-screen overflow-hidden bg-gray-900 text-white flex flex-col items-center justify-center p-10">
            <h1 className="text-3xl font-bold mb-4">Pending...</h1>
            <p className="text-lg mb-8">Content we think you’ll love.</p>
        </div>
    );
}
