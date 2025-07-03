"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verify = async () => {
      if (!token) return;
      try {
        await fetch(`http://localhost:3001/api/verifyEmail?token=${token}`, {
          method: "GET",
        });
        setTimeout(() => {
          window.close(); // closes the tab if allowed
        }, 1500);
      } catch (err) {
        console.error("Verification failed", err);
      }
    };

    verify();
  }, [token]);

  return (
    <div className="text-gray-300 bg-gray-800 font-bold text-center mt-10">
      <h2>🔐 Verifying your email...</h2>
      <p>If this page doesn’t close automatically, you can close it manually.</p>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailPage />
    </Suspense>
  );
}
