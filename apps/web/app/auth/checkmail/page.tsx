"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckMailPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No token found in localStorage");
      return;
    }

    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:3001/api/signup/check-verification", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to check verification");

        const data = await res.json();

        if (data.verified) {
          clearInterval(interval);
          router.push("/u/login");
        }
      } catch (error) {
        console.error("Verification check failed:", error);
      }
    }, 3000); // every 3 seconds

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="text-gray-300 font-bold text-center mt-10 bg-gray-800">
      <h2>📧 Check your email</h2>
      <p>We sent a verification link to your email address.</p>
      <p>Once you verify, you'll be redirected automatically.</p>
    </div>
  );
}
