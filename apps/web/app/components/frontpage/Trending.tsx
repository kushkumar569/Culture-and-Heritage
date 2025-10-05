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

    const trendingPlaces = [
        // Trending Places
        "Kedarnath", "Leh-Ladakh", "Rishikesh", "Kasol", "Spiti Valley",
        "Auli", "Bir Billing", "Coorg", "Ziro Valley", "Chopta",

        // Overrated or Highly Popular
        "Manali", "Shimla", "Ooty", "Goa (Baga Beach)", "Lonavala",
        "Nainital", "Mussoorie", "Pondicherry", "Jaipur (City Palace)", "Amritsar (Wagah Border)",

        // Crowded Places
        "Delhi (Connaught Place)", "Mumbai (Marine Drive)", "Hawa Mahal", "Varanasi Ghats", "Har Ki Pauri (Haridwar)",
        "Mathura-Vrindavan", "Tirupati Balaji Temple", "Charminar", "Bangalore (MG Road)", "Vaishno Devi Temple",

        // Most Visited Tourist Places
        "Taj Mahal", "Red Fort", "Golden Temple", "Qutub Minar", "India Gate",
        "Mysore Palace", "Gateway of India", "Meenakshi Temple", "Sun Temple (Konark)", "Akshardham Temple",
        "Hampi", "Sanchi Stupa", "Ranthambore National Park", "Kaziranga National Park", "Jim Corbett National Park",
        "Kerala Backwaters", "Rameswaram", "Darjeeling", "Sundarbans", "Andaman & Nicobar Islands"
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
            const randomIndexes = getRandomIndexes(trendingPlaces.length, 10);
            const topPlaces = randomIndexes.map(i => trendingPlaces[i]);

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

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {places.length > 0 ? (
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
                            imageUrl={places[currentIndex].photos[0]}
                            rating={places[currentIndex].rating}
                        >
                            <p>{places[currentIndex].description}</p>
                        </ImageCard>
                    </motion.div>
                </AnimatePresence>
            ) : <Loading />}

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
    );
}
