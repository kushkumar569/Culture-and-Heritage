"use client";
import React, { useState } from "react";
import { useProfile } from "../contextAPI/ProfileContext";
import { Button } from "@repo/ui/button";

export default function Guide({setSelected}: any) {
    const { profileData } = useProfile();
    // console.log("Profile Data in Vlogger Component:", profileData);
    const [isGuide, setIsGuide] = useState(profileData?.user?.isGuide);

    return (
        <>
            {isGuide ? <Main /> : <RegisterGuide profileData={profileData} setIsGuide={setIsGuide} />}
        </>
    );
}

function RegisterGuide({ profileData, setIsGuide }: any) {
    async function handleRegister() {
        const userId = profileData?.user?.id;
        if (!userId) {
            console.error("User ID is not available.");
            return;
        }
        try {
            const response = await fetch("http://localhost:3001/api/registration/guide", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });

            if (response.ok) {
                const data = await response.json();
                setIsGuide(true); // Update the isGuide status after successful registration
                console.log("Guide registration successful:", data);
            } else {
                console.error("Error registering guide:", response.statusText);
            }
        } catch (error) {
            console.error("Error registering guide:", error);
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Register as Guide</h2>
            <p>Please complete your guide profile registration.</p>
            <Button className="mt-4" onClick={handleRegister}>
                Register as Guide
            </Button>
        </div>
    );
}

function Main() {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Incomplete Profile</h2>
            <p>Your profile is incomplete. Please update your information.</p>
            {/* Additional prompts or links to complete the profile can be added here */}
        </div>
    );
}
