"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function AuthCallbackClient() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode");

    useEffect(() => {
        if (status !== "authenticated" || !session?.user?.email) return;

        const { email, name } = session.user;
        const endpoint =
            mode === "signup"
                ? "http://localhost:3001/api/googleSignup"
                : "http://localhost:3001/api/googleLogin";

        (async () => {
            try {
                const res = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, name }),
                });
                if (!res.ok) throw new Error(await res.text());
                const data = await res.json();
                console.log(data);
                
                if (mode === "signup") {
                    if(data.message === "User already exists") {
                        alert("User already exists. Please log in.");
                        router.push("/u/login");
                        return;
                    }
                    // localStorage.setItem("token", data.token); // optional
                    router.push("/u/login");
                } else if (mode === "login") {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("logged", "true");
                    router.push("/");   
                }
            } catch (err) {
                alert(`Authentication failed. Please try again. ${err}`);
                console.error("Auth failed:", err);
                router.push("/u/login");
            }
        })();
    }, [status, session, mode, router]);

    return (
        <div className="text-gray-300 bg-gray-800 font-bold text-center mt-4">
            <p>Processing authentication...</p>
        </div>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<p className="text-center p-4 text-white">Loading...</p>}>
            <AuthCallbackClient />
        </Suspense>
    );
}
