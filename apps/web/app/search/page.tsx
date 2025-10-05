"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Import this hook
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@repo/ui/button";
import { ImageCard } from "@repo/ui/ImageCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LocationStatus from "../u/components/LocationStatus";

export default function SearchPage() {
    const searchParams = useSearchParams(); //  Use the hook
    const place = searchParams.get("query") || ""; // Access query safely

    const [places, setPlaces] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [msg, setMsg] = useState("Searching places...");

    useEffect(() => {
        const fetchPlaceDetails = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/search/place", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ place }),
                });
                console.log(response);
                
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);

                    if (Array.isArray(data.redis) && data.redis.length > 0) {
                        setPlaces(data.redis);
                    } 
                    else if(Array.isArray(data) && data.length > 0){
                        setPlaces(data);
                    }else {
                        setMsg("No places found.");
                    }
                } else {
                    setMsg(`Error: ${response.statusText}`);
                }
            } catch (error) {
                setMsg(`Error fetching places: ${(error as Error).message}`);
            }
        };

        fetchPlaceDetails();
    }, [place]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % places.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + places.length) % places.length);
    };

    return places.length > 0 ? (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.6 }}
                    className="absolute top-0 left-0 w-full h-full"
                >
                    <ImageCard
                        name={places[currentIndex].name}
                        location={places[currentIndex].address}
                        imageUrl={Array.isArray(places[currentIndex].photos)
                            ? places[currentIndex].photos[0]
                            : places[currentIndex].photos}
                        rating={places[currentIndex].rating}
                    >
                        <p>{places[currentIndex].description}</p>
                    </ImageCard>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="absolute inset-y-0 left-0 flex items-center">
                <Button
                    onClick={handlePrev}
                    className="text-white bg-black/50 hover:bg-black/70 p-3 rounded-r-md"
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
                <Button
                    onClick={handleNext}
                    className="text-white bg-black/50 hover:bg-black/70 p-3 rounded-l-md"
                >
                    <ChevronRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
    ) : (
        <div className="flex items-center justify-center h-screen text-white">
            <LocationStatus msg={msg} />
        </div>
    );
}
