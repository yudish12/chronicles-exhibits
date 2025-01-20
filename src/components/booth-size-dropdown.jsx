"use client";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const sizes = [
  "10x10",
  "10x20",
  "10x30",
  "20x20",
  "20x30",
  "20x40",
  "30x30",
  "30x40",
  "40x40",
  "40x50",
];

const BoothsizeDropdown = ({ className }) => {
  const router = useRouter();

  return (
    <div className={cn("relative group", className)}>
      <button
        onClick={() => router.push("/trade-show-booth-displays-designs")}
        className="text-white flex hover:text-primary"
      >
        Trade Show Display
        <ChevronDown className="ml-1 self-center h-4 w-4" />
      </button>
      {/* Dropdown */}
      <div className="absolute left-0 hidden w-48 bg-white  shadow-md group-hover:block">
        <div className="w-48 h-2 bg-black"></div>

        {sizes.map((size, ind) => (
          <Link key={ind} href={`/${size}-trade-show-booth`}>
            <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
              {size} Trade Show Booth
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BoothsizeDropdown;
