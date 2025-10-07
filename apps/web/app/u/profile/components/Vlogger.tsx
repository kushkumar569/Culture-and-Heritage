"use client";
import React, { useState } from "react";
import { useProfile } from "../contextAPI/ProfileContext";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Notification } from "@repo/ui/Notification";

export default function Vlogger() {
    const { profileData } = useProfile();
    const [isVlogger, setIsVlogger] = useState(profileData?.user?.isVlogger);
    return (
        <>
            {isVlogger ? <Main /> : <RegisterVlogger profileData={profileData} setIsVlogger={setIsVlogger} />}
        </>
    );
}

function RegisterVlogger({ profileData, setIsVlogger }: any) {
    const [notification, setNotification] = useState(false);
    const [msg, setMsg] = useState("");
    const [bio, setBio] = useState("");
    const [channelUrl, setChannelUrl] = useState("");
    const [isActive, setIsActive] = useState(false);

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
                body: JSON.stringify({ userId, bio, channelUrl, isActive }),
            });

            if (response.ok) {
                const data = await response.json();
                setIsVlogger(true); // Update the isVlogger status after successful registration
            } else {
                console.error("Error registering vlogger:", response.statusText);
                setMsg("Error registering vlogger");
                setNotification(true);
            }
        } catch (error) {
            console.error("Error registering vlogger:", error);
            setMsg("Error registering vlogger");
            setNotification(true);
        }
    }

    return (
        <div className="p-4">
            {notification && (
                <Notification
                    type="error"
                    message={msg}
                    onClose={() => setNotification(false)}
                />
            )}

            <h2 className="text-2xl font-bold mb-4">You are Not Registered as a Vlogger</h2>
            <p>Please complete your Vlogger profile registration.</p>
            <form className="mt-4 space-y-4">
                <Input
                    type="text"
                    placeholder="Channel Name"
                    className="w-full p-2"
                    onChange={setChannelUrl}
                />
                <Input
                    type="text"
                    placeholder="Bio"
                    className="w-full p-2"
                    onChange={setBio}
                />
                {/* Align checkbox + label */}
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="Active?"
                        className="w-5 h-5 accent-blue-600 cursor-pointer"
                        onChange={(e) => setIsActive(e.target.checked)}
                    />
                    <label
                        htmlFor="Active?"
                        className="text-lg text-white font-medium cursor-pointer"
                    >
                        Is Active
                    </label>
                </div>

                <Button
                    className="mt-4 p-2 hover:bg-blue-500 bg-blue-600 rounded-md font-bold"
                    onClick={handleRegister}
                >
                    Register as Vlogger
                </Button>
            </form>
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
