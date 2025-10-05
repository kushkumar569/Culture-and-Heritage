"use client";
import { useState, useEffect } from "react";
import { ImageCard } from "@repo/ui/ImageCard";
import { Button } from "@repo/ui/button";
import { Loading } from "@repo/ui/Loading";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

export default function All() {
    const [places, setPlaces] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);
    const [msg, setMsg] = useState<string>("");
    // Get location once on mount
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude);
                    setLng(position.coords.longitude);
                },
                (error) => {
                    console.error("Error getting location:", error.message);
                }
            );
        } else {
            console.error("Geolocation is not supported by your browser.");
        }
    }, []);

    // Fetch places once location is available
    useEffect(() => {
        const fetchPlaces = async () => {
            if (lat == null || lng == null){
                setMsg("Location not available");
                return;
            }

            try {
                const response = await fetch("http://localhost:3001/api/search/place/near", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ lat, lng }),
                });

                if (response.ok) {
                    const data = await response.json();
                    if (Array.isArray(data)) {
                      await setPlaces(data);
                        // console.log(data);
                        
                    } else {
                        console.error("Expected array from response, got:", data);
                    }
                } else {
                    setMsg("Error fetching places");
                    console.error(`Error fetching:`, response.statusText);
                }
            } catch (error) {
                setMsg("Error fetching places");
                console.error(`Error fetching:`, error);
            }
        };

        fetchPlaces();
    }, [lat, lng]);

    // Auto swipe every 5 seconds
    useEffect(() => {
        if (places.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % places.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [places]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % places.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + places.length) % places.length);
    };

    return places.length > 0 ? (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {places.length > 0 && (
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
                            imageUrl={places[currentIndex].photos}
                            rating={places[currentIndex].rating}
                        >
                            <p>{places[currentIndex].description}</p>
                        </ImageCard>
                    </motion.div>
                </AnimatePresence>
            )}

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
            <p>{msg}</p>
            {/* <Loading /> */}
        </div>
    );
}
