"use client";
import { useState } from "react";
import { useProfile } from "../contextAPI/ProfileContext";
import { Button } from "@repo/ui/button";

export default function Vendor() {
    const { profileData } = useProfile();
    console.log("Profile Data in Vendor Component:", profileData);
    const [isVendor, setIsVendor] = useState(profileData?.user?.isVendor);
    return (
        <>
            {isVendor ? <Main /> : <RegisterVendor profileData={profileData} setIsVendor={setIsVendor} />}
        </>
    );
}

function RegisterVendor({ profileData, setIsVendor }: any) {
    async function handleRegister() {
        const userId = profileData?.user?.id;
        if (!userId) {
            console.error("User ID is not available.");
            return;
        }
        try {
            const response = await fetch("http://localhost:3001/api/registration/vendor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Vendor registration successful:", data);
                setIsVendor(true); // Update the isVendor status after successful registration
            } else {
                console.error("Error registering vendor:", response.statusText);
            }
        } catch (error) {
            console.error("Error registering vendor:", error);
        }
    }
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Register as Vendor</h2>
            <p>Please complete your vendor profile registration.</p>
            <Button className="mt-4" onClick={handleRegister}>
                Register as Vendor
            </Button>
        </div>
    );
}

function Main() {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Vendor Profile</h2>
            <p>This is the Vendor profile section.</p>
        </div>
    );
}