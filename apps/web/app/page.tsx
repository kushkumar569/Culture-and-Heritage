import "./globals.css";
import NavbarWrapper from "./u/components/NavbarWrapper";
import About from "./components/frontpage/About";
import Trending from "./components/frontpage/Trending";
import Near from "./components/frontpage/Near";
import Suggestions from "./components/frontpage/Suggestion";

import { motion } from "framer-motion";
export default function Home() {
  return (
    <>
      <NavbarWrapper />
      <div id="about" className="min-h-screen">
        <h2 className="text-2xl text-white font-bold mb-4 px-10 pt-20">About</h2>
        <About />
      </div>
      <hr className="border-amber-50 w-full"></hr>
      <div id="trending" className="min-h-screen">
        <h2 className="text-2xl text-white font-bold mb-4 px-10 pt-20">Trending</h2>
        <Trending />
      </div>
      <hr className="border-amber-50 w-full"></hr>

      <div id="suggestions" className="min-h-screen">
        <h2 className="text-2xl text-white font-bold mb-4 px-10 pt-20">Suggestions</h2>
        <Suggestions />
      </div>
      <hr className="border-amber-50 w-full"></hr>

      <div id="near" className="min-h-screen">
        <h2 className="text-2xl text-white font-bold mb-4 px-10 pt-20">Near</h2>
        <Near />
      </div>
      <hr className="border-amber-50 w-full"></hr>
    </>
  );
}
