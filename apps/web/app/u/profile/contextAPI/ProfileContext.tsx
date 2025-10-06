"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ProfileContextType {
    profileData: any;
    loading: boolean;
    error: string | null;
}

const ProfileContext = createContext<ProfileContextType>({
    profileData: null,
    loading: true,
    error: null,
});

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
    const [profileData, setProfileData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch("http://localhost:3001/api/user/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                } else {
                    setError("Failed to load profile data");
                }
            } catch (err) {
                setError("Error fetching profile data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        console.log("Fetching profile data...");
        
        fetchProfileData();
    }, []);

    return (
        <ProfileContext.Provider value={{ profileData, loading, error }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => useContext(ProfileContext);