"use client";
import { useProfile } from "../contextAPI/ProfileContext";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

export default function Profile() {
  const { profileData, loading, error } = useProfile();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    if (profileData) {
      setLoading(false);
    }
  }, [profileData]);

  const router = useRouter();

  return (
    <>
      {
        Loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-800 h-16 w-16"></div>
          </div>
        ) : (
          <div className="flex items-center justify-start min-h-screen bg-gray-900 text-white space-y-4">
            <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-800 text-white">
              <Sidebar />
            </div>
          </div>
        )
      }
    </>
  );
}
