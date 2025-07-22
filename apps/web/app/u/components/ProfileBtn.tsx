// components/Profile.tsx
"use client";

import { UserCog } from 'lucide-react';
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import Profile from "../profile/page"; // Adjust the import path as needed

export default function ProfileBtn() {
  const router = useRouter();

  return (
    <Button
      className=" hover:bg-gray-600 text-white px-4 py-1.5 hover:rounded-full rounded-full transition duration-150"
      onClick={() => router.push("/u/profile")} // Adjust the path as needed
    >
      <UserCog />
    </Button>
  );
}
