"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function About() {
    const pages = [
        <MainPage key="main" />,
        <TouristPage key="tourist" />,
        <VendorPage key="vendor" />,
        <VloggerPage key="vlogger" />,
        <GuidePage key="guide" />,
    ];

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % pages.length);
        }, 5000); // 5 seconds
        return () => clearInterval(interval);
    }, [pages.length]);

    const variants: Variants = {
        enter: {
            x: "100%",
            opacity: 0,
        },
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut" },
        },
        exit: {
            x: "-100%",
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
        },
    };

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gray-900 text-white">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute w-full h-full flex items-center justify-center"
                >
                    {pages[current]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

function MainPage() {
    return (
        <div className="w-full h-full flex mt-50 justify-center">
            <div className="max-w-3xl text-center px-6 mt-30">
                <h1 className="text-4xl font-bold mb-2 text-blue-400">Welcome to HeritageHub, <br /> Your Gateway to India's Timeless Stories</h1>
                <p className="text-xl fond-semibold mb-10 text-gray-400">Discover, Share, Shop, and Connect with the Heart of Indian Heritage.</p>
                <p className="text-lg font-semibold">At HeritageHub, we are building the world's most vibrant digital village<br />
                    dedicated to celebrating and preserving the rich tapestry of India's culture and history. Whether you're a traveler seeking authentic
                    experiences, a creator sharing your passion, or a local artisan continuing a legacy, this is your home.
                </p>
            </div>
            <div>
                <img src="https://res.cloudinary.com/dpcdpjm8a/image/upload/v1759838393/unnamed-removebg-preview_prgvim.png" alt="HeritageHub" className="mb-4" />
            </div>
        </div>
    );
}

function TouristPage() {
    return (
        <div className="w-full h-full flex mt-50 justify-center">
            <div className="max-w-3xl text-center px-6 mt-15">
                <h1 className="text-4xl font-bold mb-2 text-blue-400">🌍Explore & Experience: For the Tourist</h1>
                <p className="text-xl fond-semibold mb-10 text-gray-400">Stop relying on generic travel blogs. HeritageHub connects you directly with the essence of India.</p>
                <p className="text-lg font-semibold"> Discover authentic India by exploring stunning palaces, historic sites, and hidden gems through rich, user-generated content,
                    while easily booking certified local guides for personalized tours and accessing in-depth, localized insights—from palace architecture to regional cuisine—to plan
                    your journey with confidence.
                </p>
            </div>
            <div className="h-120 w-120 rounded-xl overflow-hidden hover:transform-3d hover:scale-130 transition duration-300">
                <img src="https://res.cloudinary.com/dpcdpjm8a/image/upload/v1759839862/unnamed_2_xj1rmy.jpg" alt="Tourist" className="mb-4" />
            </div>
        </div>
    );
}

function VendorPage() {
    return (
        <div className="w-full h-full flex mt-50 justify-center">
            <div className="max-w-3xl text-center px-6 mt-15">
                <h1 className="text-4xl font-bold mb-2 text-blue-400">🛍️Craft & Commerce: For the Local Vendor</h1>
                <p className="text-xl fond-semibold mb-10 text-gray-400">Bring the beauty of your traditional craft and products to a global audience.</p>
                <p className="text-lg font-semibold">Expand your reach by setting up a digital storefront to sell authentic, handcrafted products—from textiles
                    and pottery to local spices—directly to tourists and heritage enthusiasts worldwide, while preserving tradition by supporting and
                    sustaining local arts through direct connections with conscious buyers, all with simple and secure tools to manage your inventory and sales effortlessly.
                </p>
            </div>
            <div className="h-120 w-120 rounded-xl overflow-hidden hover:transform-3d hover:scale-130 transition duration-300">
                <img src="https://res.cloudinary.com/dpcdpjm8a/image/upload/v1759839862/unnamed_3_vmbi5t.jpg" alt="Vendor" className="mb-4" />
            </div>
        </div>
    );
}
function VloggerPage() {
    return (
        <div className="w-full h-full flex mt-50 justify-center">
            <div className="max-w-3xl text-center px-6 mt-15">
                <h1 className="text-4xl font-bold mb-2 text-blue-400">🎥Create & Inspire: For the Vlogger</h1>
                <p className="text-xl fond-semibold mb-10 text-gray-400">Turn your passion for history and travel into a thriving digital community.</p>
                <p className="text-lg font-semibold"> Showcase your talent by sharing high-quality videos—from palace histories to travel vlogs—reach
                    a global audience passionate about heritage, monetize your expertise to grow your brand, and establish yourself as a leading voice
                    in cultural documentation and preservation.
                </p>
            </div>
            <div className="h-120 w-120 rounded-xl overflow-hidden hover:transform-3d hover:scale-130 transition duration-300">
                <img src="https://res.cloudinary.com/dpcdpjm8a/image/upload/v1759839862/unnamed_1_vq1mnx.jpg" alt="Vlogger" className="mb-4" />
            </div>
        </div>
    );
}

function GuidePage() {
    return (
        <div className="w-full h-full flex mt-50 justify-center">
            <div className="max-w-3xl text-center px-6 mt-15">
                <h1 className="text-4xl font-bold mb-2 text-blue-400">🤝Guide & Earn: For the Certified Guide</h1>
                <p className="text-xl fond-semibold mb-10 text-gray-400">Transform your local knowledge into a sustainable livelihood.</p>
                <p className="text-lg font-semibold">Join a professional platform by registering as a certified guide and creating an attractive
                    profile that highlights your specialization—whether in Mughal architecture, Rajasthani folklore, or South Indian
                    temples—while earning subscription-based revenue through exclusive virtual or in-person tours, and efficiently
                    managing your bookings, availability, and communication from one centralized hub.
                </p>
            </div>
            <div className="h-120 w-120 rounded-xl overflow-hidden hover:transform-3d hover:scale-130 transition duration-300">
                <img src="https://res.cloudinary.com/dpcdpjm8a/image/upload/v1759839862/unnamed_4_ndpnjd.jpg" alt="Guide" className="mb-4" />
            </div>
        </div>  
    );
}
