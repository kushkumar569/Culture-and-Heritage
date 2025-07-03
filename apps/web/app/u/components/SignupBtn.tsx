// components/Signup.tsx
"use client";

import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
import Signup from "../signup/page";

export default function SignupBtn() {
  const router = useRouter();

  return (
    <Button
      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded-md transition duration-150"
      onClick={() => router.push("/u/signup")}
    >
      Signup
    </Button>
  );
}
