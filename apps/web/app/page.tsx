import "./globals.css";
import NavbarWrapper from "./u/components/NavbarWrapper";
import All from "./components/frontpage/All";
import Trending from "./components/frontpage/Trending";
import Near from "./components/frontpage/Near";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <>
      <NavbarWrapper />
      <div id="all" className="min-h-screen">
        <h2 className="text-2xl text-white font-bold mb-4 px-10 pt-20">All Section</h2>
        <All />
      </div>
      <hr className="border-amber-50 w-full"></hr>

      <div id="trending" className="min-h-screen">
        <h2 className="text-2xl text-white font-bold mb-4 px-10 pt-20">Trending</h2>
        <Trending />
      </div>
      <hr className="border-amber-50 w-full"></hr>

      <div id="suggestions" className="min-h-screen">
        <h2 className="text-2xl text-white font-bold mb-4 px-10 pt-20">Suggestions</h2>
        <p>Content we think you’ll love.</p>
      </div>
      <hr className="border-amber-50 w-full"></hr>

      <div id="near" className="min-h-screen">
        <h2 className="text-2xl text-white font-bold mb-4 px-10 pt-20">Near</h2>
        <Near/>
      </div>
      <hr className="border-amber-50 w-full"></hr>
    </>
  );
}
