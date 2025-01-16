"use client";
import React from "react";
import { getSinglePage } from "@/server/actions/pages";
import { ArrowDown } from "lucide-react";

const DownArrow = () => {
  // Smooth scroll to the next section
  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div
        className="absolute bottom-6 flex justify-center items-center cursor-pointer"
        onClick={handleScrollDown}
      >
        <ArrowDown
          stroke="#B0CB1F"
          className="animate-bounce w-8 h-8 text-white"
        />
      </div>
    </>
  );
};

export default DownArrow;
