"use client";
import React, { useState } from "react";
import { useProfile } from "../contextAPI/ProfileContext";
import { Button } from "@repo/ui/button";

export default function Tourist() {
    const { profileData } = useProfile();
    // console.log("Profile Data in Tourist Component:", profileData);
    const [isTourist, setIsTourist] = useState(profileData?.user?.isTourist);

    return (
        <>
            {isTourist ? <Main profileData={profileData}/> : <RegisterTourist profileData={profileData} setIsTourist={setIsTourist} />}
        </>
    );
}

// actually this is useless becouse every user is tourist by default.
function RegisterTourist({ profileData, setIsTourist }: any) {
    async function handleRegister() {
        const userId = profileData?.user?.id;
        if (!userId) {
            console.error("User ID is not available.");
            return;
        }
        try {
            const response = await fetch("http://localhost:3001/api/registration/tourist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });

            if (response.ok) {
                const data = await response.json();
                setIsTourist(true); // Update the isTourist status after successful registration
                console.log("Tourist registration successful:", data);
            } else {
                console.error("Error registering tourist:", response.statusText);
            }
        } catch (error) {
            console.error("Error registering tourist:", error);
        }
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">You are Not Registered as a Tourist</h2>
            <p>Please complete your tourist profile registration.</p>
            <Button className="mt-4 p-2 hover:bg-blue-500 bg-blue-600 rounded-md font-bold" onClick={handleRegister}>
                Register as Tourist
            </Button>
        </div>
    );
}

function Main({ profileData }: any) {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Welcome, {profileData.user.name}</h2>
            <p>Here is your profile information as tourist</p>
        </div>
    );
}
