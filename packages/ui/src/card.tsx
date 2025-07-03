"use client";
import { type JSX } from "react";

export function Card({
  className,
  title,
  children,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
}): JSX.Element {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 p-4">
        <div className="mb-4 w-full max-w-md bg-gray-600 text-gray-300 p-6 rounded-md shadow-lg space-y-4">
          <h1 className="text-xl font-bold text-center mb-8 text-gray-300">{title}</h1>
          {children}
        </div>
      </div>
    </>
  );
}
