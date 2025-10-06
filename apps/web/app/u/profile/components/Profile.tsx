"use client";
import { useProfile } from "../contextAPI/ProfileContext";
import { CircleUserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";

export default function Profile() {
  const { profileData, loading, error } = useProfile();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("logged");
    router.push("/");
  };

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
            <p className="text-2xl font-semibold">{profileData ? profileData.user.name : loading}</p>
            <button className="bg-red-300 hover:bg-red-400 text-black text-md font-semibold px-4 py-1.5 rounded-md transition duration-150 hover:cursor-pointer" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div >
    </>
  );
}
