"use client";
import { use, useEffect, useState } from "react";
import { useProfile } from "../contextAPI/ProfileContext";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Notification } from "@repo/ui/Notification";

export default function Vendor({setSelected}: any) {
    const { profileData } = useProfile();
    const [isVendor, setIsVendor] = useState(profileData?.user?.isVendor);
    return (
        <>
            {isVendor ? <Main profileData={profileData} /> : <RegisterVendor profileData={profileData} setIsVendor={setIsVendor} />}
        </>
    );
}

// after registration switch to vendor section automaticly by calling setSelected("Vendor")
function RegisterVendor({ profileData, setIsVendor }: any) {
    const [NotificationVisible, setNotificationVisible] = useState(false);
    const [msg, setMsg] = useState("");
    const [shopName, setShopName] = useState("");
    const [shopAddress, setShopAddress] = useState("");
    const [shopDescription, setShopDescription] = useState("");
    const [isOpen, setIsOpen] = useState(true);

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
                body: JSON.stringify({ userId, shopName, shopAddress, shopDescription, isOpen }),
            });

            if (response.ok) {
                const data = await response.json();
                setIsVendor(true); // Update the isVendor status after successful registration
            } else {
                console.error("Error registering vendor:", response.statusText);
                setMsg("Error registering vendor");
                setNotificationVisible(true);
            }
        } catch (error) {
            console.error("Error registering vendor:", error);
            setMsg("Error registering vendor");
            setNotificationVisible(true);
        }
    }
    return (
        <div className="p-4">
            {NotificationVisible && (
                <Notification
                    type="error"
                    message={msg}
                    onClose={() => setNotificationVisible(false)}
                />
            )}

            <h2 className="text-2xl font-bold mb-4">You are Not Registered as a Vendor</h2>
            <p>Please complete your Vendor profile registration.</p>
            <form className="mt-4 space-y-4">
                <Input
                    type="text"
                    placeholder="Shop Name"
                    className="w-full p-2"
                    onChange={setShopName}
                />
                <Input
                    type="text"
                    placeholder="Shop Address"
                    className="w-full p-2"
                    onChange={setShopAddress}
                />
                <Input
                    type="text"
                    placeholder="Shop Description"
                    className="w-full p-2"
                    onChange={setShopDescription}
                />

                {/* Align checkbox + label */}
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id="isOpen"
                        className="w-5 h-5 accent-blue-600 cursor-pointer"
                        onChange={(e) => setIsOpen(e.target.checked)}
                    />
                    <label
                        htmlFor="isOpen"
                        className="text-lg text-white font-medium cursor-pointer"
                    >
                        Is Open
                    </label>
                </div>

                <Button
                    className="mt-4 p-2 hover:bg-blue-500 bg-blue-600 rounded-md font-bold"
                    onClick={handleRegister}
                >
                    Register as Vendor
                </Button>
            </form>

        </div>
    );
}


type Vendor = {
    id: number;
    userId: number;
    shopName: string;
    location: string;
    description: string;
    isOpen: boolean;
};

function Main({ profileData }: any) {
    const [vendorData, setVendorData] = useState<Vendor | null>(null);
    const [NotificationVisible, setNotificationVisible] = useState(false);
    const [msg, setMsg] = useState("");

    async function fetchVendorData() {
        try{
            const response = await fetch(`http://localhost:3001/api/user/details/vendor?userId=${profileData?.user?.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if(response.ok){
                const data = await response.json();
                console.log(data);
                
                setVendorData(data);
            }else{
                console.error("Error fetching vendor data:", response.statusText);
                setMsg("Error fetching vendor data");
                setNotificationVisible(true);
            }
        } catch(err){
            console.error("Error fetching vendor data:", err);
            setMsg("Error fetching vendor data");
            setNotificationVisible(true);
        }
    }

    useEffect(() => {
            fetchVendorData();
            console.log(vendorData);            
    }, []);

    return (
        <div className="p-4">
            {NotificationVisible && (
                <Notification
                    type="error"
                    message={msg}
                    onClose={() => setNotificationVisible(false)}
                />
            )}
            <p className="text-blue-400 text-4xl font-bold">{vendorData?.shopName}</p>
            <p className="text-gray-400 text-lg font-semibold">{vendorData?.location}</p>
            <div>
                
            </div>
        </div>
    );
}