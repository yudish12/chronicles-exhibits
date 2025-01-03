"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Import Card components from shadcn
import Link from "next/link";
import Image from "next/image";

const BoothGrid = ({ boothCode, image }) => {
  const [visibleCount, setVisibleCount] = useState(9);
  const boothToRender = [
    {
      id: 1,
      image: image,
      code: "CEL101001",
    },
    {
      id: 3,
      image: image,
      code: "CEL101002",
    },
    {
      id: 6,
      image: image,
      code: "CEL101003",
    },
  ];

  return (
    <div className="py-12 bg-gradient-to-b bg-background">
      {/* Title and Subtitle */}
      <h2 className="text-center text-xl md:text-3xl font-bold text-[#B0CB1F] py-2">
        Similar Booth Designs
      </h2>

      {/* Booth Grid */}
      <div className="grid mt-6 grid-cols-1 px-6 lg:p-0 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 place-items-center place-content-center max-w-[1200px] mx-auto">
        {boothToRender.slice(0, visibleCount).map((booth) => (
          <Card
            key={booth.id}
            className="shadow-one rounded-lg overflow-hidden lg:w-[380px] w-full"
          >
            <CardHeader className="p-0">
              <Image
                height={250}
                width={378}
                src={booth.image}
                alt={`Booth ${booth.code}`}
                className="w-full lg:h-[250px] h-[220px]"
              />
            </CardHeader>
            <CardContent className="p-4 text-center">
              <p className="font-semibold text-lg text-secondary">
                Booth Code: {booth.code}
              </p>
              <Link href={`/booth/code/${booth.code}`}>
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
