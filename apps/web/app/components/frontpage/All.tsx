"use client";
import { useState, useEffect } from "react";
import { ImageCard } from "@repo/ui/ImageCard";
import { Button } from "@repo/ui/button";
import { Loading } from "@repo/ui/Loading";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';


export default function All() {
    const [places, setPlaces] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const famousPlaces = [
        "Taj Mahal", "Red Fort", "Qutub Minar", "India Gate", "Gateway of India",
        "Charminar", "Mysore Palace", "Hawa Mahal", "City Palace", "Fatehpur Sikri",
        "Jantar Mantar", "Gol Gumbaz", "Victoria Memorial", "Amber Fort", "Mehrangarh Fort",
        "Kashi Vishwanath Temple", "Golden Temple", "Vaishno Devi Temple", "Somnath Temple", "Badrinath Temple",
        "Kedarnath Temple", "Meenakshi Temple", "Jagannath Temple", "Sun Temple", "Tirupati Balaji",
        "Akshardham Temple", "Lotus Temple", "Ramanathaswamy Temple", "Dal Lake", "Gulmarg",
        "Leh-Ladakh", "Manali", "Shimla", "Nainital", "Darjeeling",
        "Munnar", "Ooty", "Coorg", "Sundarbans", "Andaman & Nicobar Islands",
        "Valley of Flowers", "Chilika Lake", "Jog Falls", "Dudhsagar Falls", "Goa Beaches",
        "Marina Beach", "Radhanagar Beach", "Pondicherry", "Kovalam Beach", "Ranthambore National Park"
    ];

    function getRandomIndexes(arrayLength: number, count: number): number[] {
        const indexes = new Set<number>();
        while (indexes.size < count) {
            const randomIndex = Math.floor(Math.random() * arrayLength);
            indexes.add(randomIndex);
        }
        return Array.from(indexes);
    }

    useEffect(() => {
        const fetchPlaces = async () => {
            const randomIndexes = getRandomIndexes(famousPlaces.length, 10);
            const topPlaces = randomIndexes.map(i => famousPlaces[i]);

            const fetchedData: any[] = [];

            for (const place of topPlaces) {
                try {
                    const response = await fetch("http://localhost:3001/api/search/place/details", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ place })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        fetchedData.push(data);
                    } else {
                        console.error(`Error fetching ${place}:`, response.statusText);
                    }
                } catch (error) {
                    console.error(`Error fetching ${place}:`, error);
                }
            }

            await setPlaces(fetchedData);
            // console.log(places);          
        };

        fetchPlaces();
    }, []);

    // Auto swipe every 5 seconds
    useEffect(() => {
        if (places.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % places.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [places]);

    const handleNext = () => {
        setCurrentIndex(prev => (prev + 1) % places.length);
    };

    const handlePrev = () => {
        setCurrentIndex(prev => (prev - 1 + places.length) % places.length);
    };

    return ( places.length > 0 ? (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {places.length > 0 && (
                <AnimatePresence mode="wait">
                    {/* <div>{places?.[currentIndex]?.photos?.[0]}</div> */}
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
                            imageUrl={places?.[currentIndex]?.photos?.[0] || "https://img.freepik.com/premium-psd/flying-macaw-parrot-isolated-transparent-background-png-psd_888962-1748.jpg?semt=ais_hybrid&w=740&q=80"}
                            rating={places[currentIndex].rating}
                        >
                            <p>{places[currentIndex].description}</p>
                        </ImageCard>
                    </motion.div>
                </AnimatePresence>
            )
            }

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
        </div>) : (
        <div className="flex items-center justify-center h-screen text-white">
            <Loading />
        </div>
    ) );
}
