"use client";

import React from "react";

export const Loading = () => {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center px-4 py-10 space-y-8">
      {/* Header skeleton */}
      <div className="w-full max-w-6xl flex items-center space-x-4">
        <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
        <div className="flex flex-col space-y-2 w-1/3">
          <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-700 rounded w-2/3 animate-pulse"></div>
        </div>
      </div>

      {/* Video cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-6xl">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <div className="w-full h-48 bg-gray-700 rounded-xl animate-pulse"></div>
            <div className="flex space-x-3">
              <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-700 rounded animate-pulse w-5/6"></div>
                <div className="h-3 bg-gray-700 rounded animate-pulse w-3/5"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
