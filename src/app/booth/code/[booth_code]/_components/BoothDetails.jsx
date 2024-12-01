"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link";

const images = [
  "/what-we-do-1.png", // Replace with actual image URLs
  "/what-we-do-2.png",
  "/what-we-do-3.png",
  "/what-we-do-1.png",
];

const packageDetails = [
  "Booth as per design",
  "Graphics as per client",
  "Lights (as shown)",
  "Counter (as per stock)",
  "Flooring (single colour carpet/vinyl)",
  "Furniture (as per stock)",
  "Audio-Visual (as per design)",
  "Shipping/Installation/Dismantling",
  "Booth Vacuuming",
  "Project Management",
];

export function BoothDetails({boothCode}) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Adjust timing as needed
    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  const handleNext = () => {
    console.log("~handle next")
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-12 bg-gradient-to-b from-[#FFFFFF] to-[#FFF7F1] align-baseline justify-center px-20">
      {/*Thumbnails */}
      <div className="flex flex-col items-center  gap-4">
        <h1 className="text-xl font-semibold py-2 ">{boothCode}</h1>
        <div className="flex flex-col gap-2">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Thumbnail ${index + 1}`}
              className={`w-32 h-20 object-cover rounded cursor-pointer ${
                index === selectedIndex ? "ring-2 ring-secondary" : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative flex-1 py-6">
        <Carousel className="w-full h-full">
          <CarouselContent>
            {images.map((src, index) => (
              <CarouselItem
                key={index}
                className={`${index === selectedIndex ? "block" : "hidden"} h-full`}
              >
                <Card className="w-full h-full">
                  
                    <img
                      src={src}
                      alt={`Carousel ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Buttons Positioned on the Card */}
          < button
          onClick={handlePrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-2 cursor-pointer z-10"
          >
          <ArrowLeft className="h-4 w-4" />
          </button>
          <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white rounded-full p-2 cursor-pointer z-10"
          >
         <ArrowRight className="h-4 w-4" />
        </button>

        </Carousel>
      </div>

      {/* Details */}
      <ul className="flex flex-col gap-2 text-secondary">
        <h2 className="text-xl font-semibold mb-4">Package Includes:</h2>
        {packageDetails.map((detail, index) => (
          <li key={index} className="flex items-center gap-2">
            <span className="text-[#B0CB1F]">◆</span>
            {detail}
          </li>
        ))}
      </ul>
    </div>
  );
}
