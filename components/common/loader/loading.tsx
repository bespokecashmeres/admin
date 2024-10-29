"use client";

import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-[9999] flex justify-center items-center">
      <div className="w-12 h-12 border-8 border-gray-300 border-t-8 border-t-[#6366F1] rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
