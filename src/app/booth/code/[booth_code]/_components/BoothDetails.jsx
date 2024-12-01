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
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

export function BoothDetails({ boothCode }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Adjust timing as needed
    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setSelectedIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  const handleNext = () => {
    console.log("~handle next");
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="bg-background gap-12 flex py-7 px-40">
      {/*Thumbnails */}
      <div className="flex flex-col items-start gap-8">
        <h3 className="text-[1.4rem] text-secondary font-semibold ">
          {boothCode}
        </h3>
        <div className="flex w-full flex-col gap-6">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Thumbnail ${index + 1}`}
              className={`w-full h-20 object-cover rounded cursor-pointer ${
                index === selectedIndex ? "ring-2 ring-secondary" : ""
              }`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative pt-16 min-w-[700px] col-span-2 py-6">
        <Carousel className="w-full h-[53%] ">
          <CarouselContent className="h-full">
            {images.map((src, index) => (
              <CarouselItem
                key={index}
                className={cn(
                  index === selectedIndex ? "block" : "hidden",
                  "h-full"
                )}
              >
                <Card className="w-full h-full">
                  <img
                    src={src}
                    alt={`Carousel ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex flex-col items-center justify-center border-[1px] border-secondary bg-[#ffffff] py-10 px-10">
          <div className="w-full">
            <div className="flex justify-between mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 rounded "
                />
                <span className="text-primary font-semibold">
                  Rental Quotation
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 border-secondary rounded text-primary "
                />
                <span className="text-primary font-semibold">
                  Purchase Request
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 rounded text-purple-600 focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-primary font-semibold">
                  Customization Request
                </span>
              </label>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Contact Person"
                className="w-full border border-secondary  rounded-lg px-3 py-2 "
              />
              <input
                type="text"
                placeholder="Phone/Mobile Number"
                className="w-full border border-secondary  rounded-lg px-3 py-2 "
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full border border-secondary  rounded-lg px-3 py-2 "
              />
              <input
                type="text"
                placeholder="Country"
                className="w-full border border-secondary  rounded-lg px-3 py-2 "
              />
              <input
                type="text"
                placeholder="Event Name"
                className="w-full border border-secondary  rounded-lg px-3 py-2 "
              />
              <input
                type="text"
                placeholder="Event City"
                className="w-full border border-secondary  rounded-lg px-3 py-2 "
              />
            </div>

            <textarea
              placeholder="Description/Message/Customizations"
              className="w-full border border-secondary  rounded-lg px-3 py-2 "
              rows="4"
            ></textarea>
          </div>
          <Button className=" bg-transparent border-2 border-primary text-primary hover:text-white font-semibold mt-8 rounded hover:bg-secondary ">
            Get Quote
          </Button>
        </div>
      </div>

      {/* Details */}
      <ul className="flex flex-col gap-2 text-secondary">
        <div className="flex gap-3 mb-8 text-primary underline font-semibold text-sm">
          <span>Home/</span>
          <span>Booth By Size/</span>
          <span>10x10/</span>
        </div>
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
