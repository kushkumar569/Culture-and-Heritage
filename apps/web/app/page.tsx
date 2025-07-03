"use client";
import "./globals.css";
import Navbar from "./u/components/Navbar";
import { use } from "react";

export default function Home() {
  return (
    <>
      <Navbar/>
      <div id="all" className="min-h-screen p-10">
        <h2 className="text-2xl font-bold mb-4">All Section</h2>
        <p>Content for all items...</p>
      </div>

      
      <div id="trending" className="min-h-screen p-10">
        <h2 className="text-2xl font-bold mb-4">Trending</h2>
        <p>Hot topics and current buzz.</p>
      </div>

      <div id="suggestions" className="min-h-screen p-10 ">
        <h2 className="text-2xl font-bold mb-4">Suggestions</h2>
        <p>Content we think you’ll love.</p>
      </div>

      <div id="near" className="min-h-screen p-10">
        <h2 className="text-2xl font-bold mb-4">Near</h2>
        <p>Nearby heritage spots and events.</p>
      </div>
    </>
  );
}
