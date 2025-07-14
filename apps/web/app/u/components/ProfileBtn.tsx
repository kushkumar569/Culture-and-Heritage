// components/Profile.tsx
"use client";

import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import Profile from "../profile/page"; // Adjust the import path as needed

export default function ProfileBtn() {
  const router = useRouter();

  return (
    <Button
      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded-md transition duration-150"
      onClick={() => router.push("/u/profile")} // Adjust the path as needed
    >
      Profile
    </Button>
  );
}
