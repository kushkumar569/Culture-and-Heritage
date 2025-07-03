"use client"

import react, { use, useState } from "react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Card } from "@repo/ui/card";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4">
            <Card title="Signup" className="space-y-4">
                <Signup />
            </Card>
        </div>
    );
}


function Signup() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    async function signupuser() {
        try {
            // Send data to backend (apps/api)
            const response = await fetch("http://localhost:3001/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                }),
            });

            const data = await response.json(); // Parse the JSON response

            if (!response.ok) {
                alert(data.message)
                console.error("Error:", data.message); // e.g., "Invalid input data"
            } else {
                console.log("Success:", data);
                localStorage.setItem("token", data.token);
                router.push("/auth/checkmail");
            }
        } catch (err) {
            console.error("Error sending user data to backend:", err);
        }
    }
    return (
        <>
            {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4">
                <div className="mb-8 w-full max-w-md bg-gray-600 p-6 rounded-md shadow-lg space-y-4">
                    <h1 className="text-2xl font-bold text-center mb-10  text-gray-300">Signup</h1> */}
            {/* <div  className="mb-8 w-full max-w-md bg-gray-750 p-6 rounded-md shadow-xl space-y-4"> */}
            <Input
                onChange={setName}
                placeholder="Enter your name"
                type="text"
                className="w-full pl-2"
            />
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
                className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded-md transition duration-150 w-full"
                onClick={signupuser}
            >
                Signup
            </Button>
            <div className="text-center font-semibold">Signup with Google</div>
            <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 font-bold rounded"
                onClick={() => signIn("google", { callbackUrl: "/" })}
            >
                Sign up with Google
            </button>
            {/* </div> */}
            {/* </div> 
            </div> */}
        </>
    );
}
