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
  "/booth-1.jpeg", // Replace with actual image URLs
  "/booth-2.jpeg",
  "/booth-3.jpeg",
  "/booth-4.jpeg",
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
    <div className="bg-background gap-12 flex justify-center pr-16 py-7 px-40">
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
              className={cn(
                "w-full grayscale h-20 object-cover rounded cursor-pointer",
                index === selectedIndex ? "grayscale-0" : ""
              )}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>

      {/* Carousel */}
      <div className="relative col-span-2 bborder-[1px] mt-16 bg-[#FCF8F3] border-[1px] px-4 pt-4 pb-0">
        <Carousel className="w-full ">
          <CarouselContent className="h-full">
            {images.map((src, index) => (
              <CarouselItem
                key={index}
                className={cn(
                  index === selectedIndex ? "block" : "hidden",
                  "h-full rounded-none"
                )}
              >
                <Card className="w-full h-full rounded-none">
                  <img
                    src={src}
                    alt={`Carousel ${index + 1}`}
                    className="w-full h-full object-cover rounded-none"
                  />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="flex flex-col items-center justify-center py-6">
          <div className="w-full">
            <div className="flex justify-between mb-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 rounded "
                />
                <span className="text-secondary font-semibold">
                  Rental Quotation
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 border-secondary rounded text-primary "
                />
                <span className="text-secondary font-semibold">
                  Purchase Request
                </span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 rounded text-purple-600 focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-secondary font-semibold">
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
          <Button className="transition-all py-4 px-6 duration-150 bg-secondary hover:text-white hover:bg-secondary font-semibold mt-4 self-end rounded text-white">
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
