"use client";
import React, { useState } from "react";
import { useProfile } from "../contextAPI/ProfileContext";
import { Button } from "@repo/ui/button";

export default function Vlogger({setSelected}: any) {
    const { profileData } = useProfile();
    // console.log("Profile Data in Vlogger Component:", profileData);
    const [isVlogger, setIsVlogger] = useState(profileData?.user?.isVlogger);

    return (
        <>
            {isVlogger ? <Main /> : <RegisterVlogger profileData={profileData} setIsVlogger={setIsVlogger} />}
        </>
    );
}

function RegisterVlogger({ profileData, setIsVlogger }: any) {
    async function handleRegister() {
        const userId = profileData?.user?.id;
        if (!userId) {
            console.error("User ID is not available.");
            return;
        }
        try {
            const response = await fetch("http://localhost:3001/api/registration/vlogger", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });

            if (response.ok) {
                const data = await response.json();
                setIsVlogger(true); // Update the isVlogger status after successful registration
                console.log("Vlogger registration successful:", data);
            } else {
                console.error("Error registering vlogger:", response.statusText);
            }
        } catch (error) {
            console.error("Error registering vlogger:", error);
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Register as Vlogger</h2>
            <p>Please complete your vlogger profile registration.</p>
            <Button className="mt-4" onClick={handleRegister}>
                Register as Vlogger
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
