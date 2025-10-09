"use client";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import BubbleParticles from "@repo/ui/BubbleParticle";
import Footer from "./u/components/Footer";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="bg-gray-800">
        <SessionProvider>
          {children}
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
