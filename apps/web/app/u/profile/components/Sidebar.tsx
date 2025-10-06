"use client";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import { useProfile } from "../contextAPI/ProfileContext";
import Tourist from "./Tourist";
import Vlogger from "./Vlogger";
import Vendor from "./Vendor";
import Guide from "./Guide";

export default function Sidebar() {
  const { profileData } = useProfile();
  const [selected, setSelected] = useState("Tourist");
  const options = ["Tourist", "Vlogger", "Vendor", "Guide"];

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

  return (
    <div className="flex min-h-screen w-full bg-gray-900 text-white border-gray-800">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 p-6 flex flex-col">
        <h2 className="text-3xl font-bold mb-10">Profile</h2>
        {options.map((option) => (
          <Button
            key={option}
            className={`text-left py-2 px-4 mb-2 rounded ${
              selected === option
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
          <p className="text-lg">
            Logged in as{" "}
            <span className="font-semibold">
              {profileData ? profileData.user.name : "Loading..."}
            </span>
          </p>
          <p className="text-md text-gray-400">
            {profileData ? profileData.user.email : ""}
          </p>
        </div>

        {/* Dynamic Component Rendering */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-md">
          {renderProfileSection()}
        </div>
      </div>
    </div>
  );
}
