"use client";

import { Search, } from 'lucide-react';
import "../../globals.css";
import React, { useState, useEffect } from "react";
import { Button } from "@repo/ui/button";
import Login from "./LoginBtn";
import Signup from "./SignupBtn";
import Profile from "./ProfileBtn";
import { useRouter } from "next/navigation";
import { Input } from "@repo/ui/input"; // Import your custom animated Input component

const sections = ["All", "Trending", "Suggestions", "Near"];

export default function Navbar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // initialize as false
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("All");
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        // Safe localStorage access inside client-only useEffect
        if (typeof window !== "undefined") {
            const logged = localStorage.getItem("logged") === "true";
            setIsLoggedIn(logged);
        }
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId.toLowerCase());
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setActiveSection(sectionId);
        }
    };

    const handleSearch = () => {
        alert(`Searching for: ${searchText}`);
    };

    return (
        <div className="w-full bg-gray-900 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-4 md:px-6">

                {/* Logo Section */}
                <div className="flex items-center space-x-3 hover:cursor-pointer" onClick={() => router.push("/")}>
                    <img
                        className="h-10"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png"
                        alt="Google Logo"
                    />
                    <h1 className="text-xl font-semibold text-gray-300 whitespace-nowrap">
                        Culture and Heritage
                    </h1>
                </div>

                {/* Sections */}
                <div className="hidden md:flex flex-1 justify-center space-x-3 ml-8">
                    {sections.map((section) => (
                        <Button
                            key={section}
                            onClick={() => scrollToSection(section)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${activeSection === section
                                ? "bg-blue-600 text-white"
                                : "hover:bg-gray-600"
                                }`}
                            aria-label={`Go to ${section} section`}
                        >
                            {section}
                        </Button>
                    ))}
                </div>

                {/* Search + Auth */}
                <div className="hidden md:flex items-center space-x-4">
                    <div className="relative w-64">
                        <Input
                            onChange={setSearchText}
                            placeholder="Search..."
                            className="w-full pr-20 pl-4"
                        />
                        <Button
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm transition duration-150"
                            onClick={handleSearch}
                        >
                            <Search />
                        </Button>
                    </div>

                    {isLoggedIn ? (
                        <Profile />
                    ) : (
                        <>
                            <Signup />
                            <Login />
                        </>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        <svg
                            className="h-6 w-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden px-4 pb-4 space-y-4">
                    <div className="flex flex-col space-y-2">
                        {sections.map((section) => (
                            <button
                                key={section}
                                onClick={() => {
                                    scrollToSection(section);
                                    setIsMenuOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 rounded-md text-sm font-medium transition ${activeSection === section
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                            >
                                {section}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full">
                        <Input
                            onChange={setSearchText}
                            placeholder="Search..."
                            className="w-full pr-20"
                        />
                        <Button
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm transition duration-150"
                            onClick={handleSearch}
                        >
                            🔎
                        </Button>
                    </div>

                    <div className="flex flex-col space-y-2">
                        {isLoggedIn ? (
                            <Profile />
                        ) : (
                            <>
                                <Signup />
                                <Login />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
