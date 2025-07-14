// components/Login.tsx
"use client";

import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import react, { useState } from "react";
import { Card } from "@repo/ui/card";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginProps {
    onLogin: () => void;
}

export default function LoginPage() {
    return (
        <Card title="Login">
            <Login onLogin={() => alert("Login button clicked!")} />
        </Card>
    );
}

function Login({ onLogin }: LoginProps) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function loginuser() {
        try {
            const response = await fetch("http://localhost:3001/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();
            console.log("Login response:", data);

            if (!data.token) {
                setError(data.message);
            } else {
                localStorage.setItem("token", data.token);
                localStorage.setItem("logged", "true");
                router.push("/");
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    }


    async function verifyMail() {
        try {
            const response = await fetch("http://localhost:3001/api/login/verifyEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            console.log("Verification response:", data);

            if (!data.token) {
                setError(`${data.message}`);
                return;
            } else {
                setError("Email not verified yet. Please check your inbox.");
            }

            const interval = setInterval(async () => {
                try {
                    const resp = await fetch("http://localhost:3001/api/signup/check-verification", {
                        headers: {
                            Authorization: `Bearer ${data.token}`,
                        },
                    });

                    if (!resp.ok) throw new Error("Failed to check verification");

                    const dataresp = await resp.json();

                    if (dataresp.verified) {
                        clearInterval(interval);
                        localStorage.setItem("logged", "true");
                        localStorage.setItem("token", data.token);
                        router.push("/");
                    }
                } catch (error: any) {
                    console.error("Verification check failed:", error);
                    setError(`Verification check failed: ${error.message}`);
                }
            }, 3000);
        } catch (error) {
            console.error("Error verifying email:", error);
            setError("Something went wrong during email verification.");
        }
    }



    return (
        <>
            <Input
                onChange={setEmail}
                placeholder="Enter your email"
                type="email"
                className="w-full pl-2"
            />
            <Input
                onChange={setPassword}
                placeholder="Enter your Password"
                type="password"
                className="w-full pl-2"
            />

            <Button
                className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 font-bold rounded-md transition duration-150 w-full"
                onClick={loginuser}
            >
                Login
            </Button>

            <div className="flex flex-col items-center justify-center space-y-4 mt-4">

                {/* Case 1: Email not verified — show error + Verify Email button */}
                {error === "Email not verified" && (
                    <div className="flex items-center justify-center space-x-4">
                        <div className="text-red-500 font-bold">{error}</div>
                        <button
                            className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 font-bold rounded-md transition duration-150"
                            onClick={verifyMail}
                        >
                            Verify Email
                        </button>
                    </div>
                )}

                {/* Case 2: Some other error — show error only */}
                {error && error !== "Email not verified" && (
                    <div className="text-red-500 font-bold text-center">{error}</div>
                    
                )}

                {/* Case 3: No error — show New User + Signup */}
                {!error && (
                    <div className="flex items-center justify-center space-x-4">
                        <div className="text-white font-bold text-center">Create a new account</div>
                        <button
                            className=" text-blue-300 hover:underline"
                            onClick={() => router.push("/u/signup")}
                        >
                            Signup
                        </button>
                    </div>
                )}
            </div>




            <div className="text-center font-semibold">or</div>
            <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 font-bold rounded"
                onClick={() => signIn("google", { callbackUrl: "/auth-callback?mode=login" })}
            >
                Login with Google
            </button>
        </>
    );
}
