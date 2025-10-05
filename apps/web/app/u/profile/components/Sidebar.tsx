import { useState } from "react";
import { Button } from "@repo/ui/button";

export default function Sidebar() {
    const [selected, setSelected] = useState("Tourist");
    const options = ["Tourist", "Vlogger", "Vendor", "Guide"];
    return (
        <>
            <div className="flex min-h-screen w-full bg-gray-900 text-white border-gray-800">
                {/* Sidebar */}
                <div className="w-1/4 bg-gray-800 p-6 flex flex-col">
                    <h2 className="text-3xl font-bold mb-10">Profile</h2>
                    {options.map((option) => (
                        <Button
                            key={option}
                            className={`text-left py-2 px-4 mb-2 rounded ${selected === option ? "bg-blue-600 font-semibold hover:bg-blue-600" : "hover:bg-gray-700"} `}
                            onClick={() => setSelected(option)}
                        >
                            {option}
                        </Button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 p-8">
                    <h1 className="text-4xl font-bold mb-4">{selected}</h1>
                    <p className="text-lg">
                        This is the content for <span className="font-semibold">{selected}</span>.
                    </p>
                </div>
            </div>
        </>
    );
}