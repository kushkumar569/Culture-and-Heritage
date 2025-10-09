"use client";
import { useEffect, useState } from "react";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import { useProfile } from "../contextAPI/ProfileContext";
import Tourist from "./Tourist";
import Vlogger from "./Vlogger";
import Vendor from "./Vendor";
import Guide from "./Guide";
import { CircleUserRound } from "lucide-react"

export default function Sidebar() {
  const router = useRouter();
  const { profileData } = useProfile();
  const [selected, setSelected] = useState("Tourist");
  const options = ["Tourist", "Vlogger", "Vendor", "Guide"];

  // Render the appropriate component based on the selected option and pass setSelected as prop to change after registration
  const renderProfileSection = () => {
    switch (selected) {
      case "Tourist":
        return <Tourist />;
      case "Vlogger":
        return <Vlogger />;
      case "Vendor":
        return <Vendor />;
      case "Guide":
        return <Guide />;
      default:
        return null;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("logged");
    router.push("/");
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-900 text-white border-gray-800">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 p-6 flex flex-col">
        <CircleUserRound size={100} className="mx-auto text-gray-400" />
        <p className="text-2xl font-semibold text-center">{profileData ? profileData.user.name : "Loading..."}</p>
        <button className="bg-red-300 ml-18 mt-2 mb-5 hover:bg-red-400 text-black text-md font-semibold px-4 py-1.5 rounded-md transition duration-150 hover:cursor-pointer w-25 text-center " onClick={logout}>
          Logout
        </button>
        <hr className="border-gray-500 my-2"></hr>
        {options.map((option) => (
          <Button
            key={option}
            className={`text-left py-2 px-4 mb-2 rounded ${selected === option
              ? "bg-blue-600 font-semibold hover:bg-blue-600"
              : "hover:bg-gray-700"
              }`}
            onClick={() => setSelected(option)}
          >
            {option}
          </Button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">{selected}</h1>
          {/* <p className="text-lg">
            Logged in as{" "}
            <span className="font-semibold">
              {profileData ? profileData.user.name : "Loading..."}
            </span>
          </p> */}
          {/* <p className="text-md text-gray-400">
            {profileData ? profileData.user.email : ""}
          </p> */}
        </div>

        {/* Dynamic Component Rendering */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-md">
          {renderProfileSection()}
        </div>
      </div>
    </div>
  );
}
