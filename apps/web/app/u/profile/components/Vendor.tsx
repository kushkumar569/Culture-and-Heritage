"use client";
import { use, useEffect, useState } from "react";
import { useProfile } from "../contextAPI/ProfileContext";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Notification } from "@repo/ui/Notification";

export default function Vendor({ setSelected }: any) {
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

interface Posts {
    id: number;
    userId: number;
    name: string;
    description: string;
    place: string;
    price: number;
    imageUrl: string;
}

function Main({ profileData }: any) {
    const [vendorData, setVendorData] = useState<Vendor | null>(null);
    const [NotificationVisible, setNotificationVisible] = useState(false);
    const [msg, setMsg] = useState("");
    const [upload, setupload] = useState(false);
    const [posts, setPosts] = useState<Posts[]>([]);

    async function fetchVendorData() {
        try {
            const response = await fetch(`http://localhost:3001/api/user/details/vendor?userId=${profileData?.user?.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data);

                setVendorData(data);
            } else {
                console.error("Error fetching vendor data:", response.statusText);
                setMsg("Error fetching vendor data");
                setNotificationVisible(true);
            }
        } catch (err) {
            console.error("Error fetching vendor data:", err);
            setMsg("Error fetching vendor data");
            setNotificationVisible(true);
        }
    }

    async function fetchPosts() {
        try {
            const response = await fetch(`http://localhost:3001/api/vendor/posts?userId=${profileData?.user?.id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.ok) {
                const data = await response.json();
                setPosts(data);
            } else {
                console.error("Error fetching posts:", response.statusText);
                setMsg("Error fetching posts");
                setNotificationVisible(true);
            }
        } catch (err) {
            console.error("Error fetching posts:", err);
            setMsg("Error fetching posts");
            setNotificationVisible(true);
        }
    }

    useEffect(() => {
        fetchVendorData();
        fetchPosts();
        console.log(vendorData);
    }, [upload]);

    function uploadPost() {
        setupload(true);
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
            {vendorData ? (
                <div>
                    <p className="text-blue-400 text-4xl font-bold">{vendorData?.shopName}</p>
                    <p className="text-gray-400 text-lg font-semibold">📍{vendorData?.location}</p>
                    <p className="text-white text-xl font-semibold mt-10">{vendorData?.description}</p>
                    <hr className="my-4 border-gray-600" />
                </div>
            ) : (
                <p>Loading vendor data...</p>
            )}
            <div>
                <div className="flex space-x-218">
                    <p className="text-white text-3xl font-bold">Products</p>
                    <Button className="p-2 bg-blue-400 rounded-lg inline-block hover:bg-blue-500 text-white font-semibold" onClick={uploadPost}>
                        Upload
                    </Button>
                </div>
            </div>
            {upload ? (
                <Upload setupload={setupload} />
            ) : posts.length > 0 ? (
                <div className="flex flex-wrap items-center space-y-6 mt-10 space-x-4">
                    {posts.map((post) => (
                        <Card key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-400 mt-4">No posts available.</p>
            )}
        </div>
    );
}

function Card({ post }: { post: Posts }) {
    const { userId, place, name, description, price, imageUrl } = post;

    return (
        <div className="bg-gray-900 text-gray-100 rounded-xl shadow-md overflow-hidden w-60 flex-shrink-0 border border-gray-700">
            {/* Image */}
            <div className="w-full h-64 overflow-hidden">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"  // remove object-cover for fit image in div
                />
            </div>

            {/* Title */}
            <div className="px-2 pb-1 flex justify-between items-center">
                <h2 className="text-sm font-semibold text-white truncate">{name}</h2>
                <h2 className="text-xs font-semibold text-gray-400 truncate">📍{place}</h2>
            </div>

            <div className="px-2 pb-1">
                <h2 className="text-sm font-semibold text-blue-400 truncate">₹{parseFloat(String(price)).toFixed(2)}</h2>
            </div>

            <div className="px-2 pb-2">
                <p className="text-gray-300 text-sm line-clamp-3">{description}</p>
            </div>
        </div>
    );
}

function Upload({ setupload }: any) {
    const { profileData } = useProfile();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [media, setMedia] = useState<File | null>(null);
    const [price, setPrice] = useState("");
    const [place, setPlace] = useState("");

    async function handleUploadToCloudinary(): Promise<string | null> {
        if (!media) {
            alert("Please select a file first.");
            return null;
        }

        const formData = new FormData();
        formData.append("file", media);
        formData.append("upload_preset", "heritageHub"); //  your preset
        formData.append("cloud_name", "dpcdpjm8a"); //  your cloud name

        try {
            const response = await fetch(
                "https://api.cloudinary.com/v1_1/dpcdpjm8a/image/upload",
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();
            console.log("Cloudinary Upload:", data);
            return data.url;
        } catch (error) {
            console.error(" Upload failed:", error);
            return null;
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!name || !description || !price || !place || !media) {
            alert("Please fill all fields!");
            return;
        }

        const cloudinaryUrl = await handleUploadToCloudinary();
        console.log(cloudinaryUrl);

        if (!cloudinaryUrl) return;

        const payload = {
            name,
            description,
            price,
            place,
            mediaUrl: cloudinaryUrl,
            userId: profileData?.user?.id, // optional if needed
        };

        // console.log(payload);

        try {
            const res = await fetch("http://localhost:3001/api/vendor/upload", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            console.log(res);
            
            if (res.ok) {
                const data = await res.json();
                console.log(" Post Saved:", data);
                alert("Post uploaded successfully!");
                setupload(false);
            } else {
                const errorData = await res.json();
                console.error("Error uploading post:", errorData);
                alert("Failed to upload post.");
            }
        } catch (error) {
            console.error(" Backend error:", error);
            alert("Failed to upload post.");
        }
    }

    return (
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            {/* Title */}
            <Input
                type="text"
                placeholder="Name"
                className="w-full p-2"
                onChange={setName}
            />

            <Input
                type="text"
                placeholder="Price"
                className="w-full p-2"
                onChange={setPrice}
            />

            <Input
                type="text"
                placeholder="Place"
                className="w-full p-2"
                onChange={setPlace}
            />

            {/* Description */}
            <Input
                type="text"
                placeholder="Description of post"
                className="w-full p-2"
                onChange={setDescription}
            />

            {/* Media upload */}
            <label htmlFor="media-upload" className="text-blue-300 font-medium">
                Upload Media (jpg, png, max 100KB):
            </label>
            <input
                id="media-upload"
                type="file"
                accept=".jpg, .png"
                placeholder="Choose an image file"
                className="w-full p-2 text-blue-400 bg-gray-800 rounded-md"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        if (file.size > 100 * 1024) {
                            alert("File size exceeds 100KB. Please upload a smaller file.");
                            e.target.value = "";
                        } else {
                            setMedia(file);
                        }
                    }
                }}
            />       

            {/* Submit button */}
            <Button
                className="mt-4 p-2 hover:bg-blue-500 bg-blue-600 rounded-md font-bold text-white"
            >
                Upload
            </Button>
        </form>
    );
}