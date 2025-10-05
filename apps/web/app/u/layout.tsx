import "../globals.css";
import Navbar from "./components/Navbar";
import BubbleParticles from "@repo/ui/BubbleParticle";

export default function Layout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <div className="bg-gray-800">
                {/* <Navbar /> */}
                {children}
            </div>
        </>
    );
}
