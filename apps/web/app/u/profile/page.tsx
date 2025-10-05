"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CircleUserRound } from 'lucide-react';
import Sidebar from "./components/Sidebar";

export default function Profile() {
  const router = useRouter();
  const [profileData, setProfileData] = useState<any>(null);
  const [msg, setMsg] = useState("Loading...");

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
          console.log(data);

          setProfileData(data);
        } else {
          setMsg("Failed to load profile data");
          console.error("Failed to load profile data");
        }
      } catch (error) {
        setMsg("Error fetching profile data");
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [router]);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("logged");
    router.push("/");
  }

  return (
    <>
      <div className="flex items-center justify-start min-h-screen bg-gray-900 text-white space-y-4">
        <div className="flex flex-col items-center justify-center min-h-screen w-3/4 bg-gray-800 text-white">
          <Sidebar />
        </div>
        <div>
          <div className="bg-gray-900 p-6 rounded-md space-y-2 text-center max-w-sm">
            <CircleUserRound size={100} className="mx-auto text-gray-400" />
            {/* <h2 className="text-2xl font-semibold">Welcome</h2> */}
            <p className="text-2xl font-semibold">{profileData ? profileData.user.name : msg}</p>
            <button className="bg-red-300 hover:bg-red-400 text-black text-md font-semibold px-4 py-1.5 rounded-md transition duration-150 hover:cursor-pointer" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div >
    </>

    // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
    //   <h1 className="text-4xl font-bold mb-4">Profile Page</h1>
    //   <p className="text-lg">This is the profile page.</p>
    //   <p className="text-sm mt-2">You can add your profile details here.</p>
    //   <p className="text-sm mt-2">{msg}</p>
    //   {/* <p>{msg}</p> */}
    //   <button className="bg-red-500 hover:bg-red-400 text-white px-4 py-1.5 rounded-md transition duration-150 hover:cursor-pointer" onClick={logout}>
    //     Logout
    //   </button>
    // </div>
  );
}