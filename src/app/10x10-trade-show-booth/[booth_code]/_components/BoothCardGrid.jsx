"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Import Card components from shadcn
import Link from "next/link";

const booths = [
  {
    id: 1,
    image: "/booth-code-1.jpeg",
    code: "CEL101001",
  },
  {
    id: 3,
    image: "/booth-code-3.jpeg",
    code: "CEL101002",
  },
  {
    id: 6,
    image: "/booth-code-5.jpeg",
    code: "CEL101003",
  },
  {
    id: 4,
    image: "/booth-code-9.webp",
    code: "CEL101004",
  },
  {
    id: 5,
    image: "/booth-code-13.webp",
    code: "CEL101005",
  },
  {
    id: 7,
    image: "/booth-code-17.webp",
    code: "CEL101006",
  },
];

const BoothGrid = ({ boothCode }) => {
  const [visibleCount, setVisibleCount] = useState(9);
  const boothToRender = booths.filter((booth) => booth.code !== boothCode);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center place-content-center max-w-[1200px] mx-auto">
        {boothToRender.slice(0, visibleCount).map((booth) => (
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
              <Link href={`/10x10-trade-show-booth/${booth.code}`}>
                <Button
                  style={{ transitionDuration: "500ms" }}
                  className="mt-4 bg-transparent hover:bg-secondary border-2 border-[#B0CB1F] hover:border-secondary text-[#B0CB1F] hover:text-white px-6 py-2 font-bold text-sm"
                >
                  Customize Now!
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BoothGrid;
