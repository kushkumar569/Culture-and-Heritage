// components/Login.tsx
"use client";

import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import react, { useState } from "react";
import { Card } from "@repo/ui/card";
import { signIn } from "next-auth/react";

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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                onClick={() => alert(`Signup button clicked! Email: ${email}`)}
            >
                Login
            </Button>
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
