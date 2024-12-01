"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Import Card components from shadcn

const booths = [
  {
    id: 1,
    image: "/what-we-do-1.png",
    code: "TSI02030201",
  },
  {
    id: 2,
    image: "/what-we-do-2.png",
    code: "TSI02030201",
  },
  {
    id: 3,
    image: "/what-we-do-3.png",
    code: "TSI02030201",
  },
  {
    id: 4,
    image: "/what-we-do-1.png",
    code: "TSI02030201",
  },
  {
    id: 5,
    image: "/what-we-do-3.png",
    code: "TSI02030201",
  },
  {
    id: 6,
    image: "/what-we-do-2.png",
    code: "TSI02030201",
  },
  {
    id: 7,
    image: "/what-we-do-3.png",
    code: "TSI02030201",
  },
  {
    id: 8,
    image: "/what-we-do-1.png",
    code: "TSI02030201",
  },
  {
    id: 9,
    image: "/what-we-do-2.png",
    code: "TSI02030201",
  },
];

const BoothGrid = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const handleShowMore = () => {
    setVisibleCount(booths.length);
  };
  return (
    <div className="py-12 bg-gradient-to-b bg-background">
      {/* Title and Subtitle */}
      <h2 className="text-center text-lg md:text-xl font-bold text-[#B0CB1F] py-2">
        Similar Designs
      </h2>
      <p className="text-center text-secondary text-gray-700 py-2 mb-8">
        Choose from our versatile collection of designs, all ready to be
        customized endlessly!
      </p>

      {/* Booth Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[1200px] mx-auto">
        {booths.slice(0, visibleCount).map((booth) => (
          <Card
            key={booth.id}
            className="shadow-one rounded-lg overflow-hidden w-[380px]"
          >
            <CardHeader className="p-0">
              <img
                src={booth.image}
                alt={`Booth ${booth.code}`}
                className="w-full h-[250px] object-cover"
              />
            </CardHeader>
            <CardContent className="p-4 text-center">
              <p className="font-semibold text-lg text-secondary">
                Booth Code: {booth.code}
              </p>
              <Button
                style={{ transitionDuration: "500ms" }}
                className="mt-4 bg-transparent hover:bg-secondary border-2 border-[#B0CB1F] hover:border-secondary text-[#B0CB1F] hover:text-white px-6 py-2 font-bold text-sm"
              >
                Customize Now!
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      {visibleCount < booths.length && (
        <div className="text-center mt-8">
          <Button
            onClick={handleShowMore}
            className="bg-[#B0CB1F] hover:bg-secondary text-white px-6 py-2 font-bold text-sm"
          >
            Show More
          </Button>
        </div>
      )}
    </div>
  );
};

export default BoothGrid;
