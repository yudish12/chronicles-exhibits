"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Import Card components from shadcn
import Link from "next/link";
import Image from "next/image";

const BoothGrid = ({ fields, size, booths }) => {
  const [visibleCount, setVisibleCount] = useState(9);

  return (
    <div className="py-20 bg-gradient-to-b">
      {/* Booth Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 max-w-[1200px] px-20 sm:px-10 md:px-20 xl:px-6">
        {booths.slice(0, visibleCount).map((booth, index) => (
          <Card
            key={booth.id}
            className="shadow-one mx-auto rounded-lg overflow-hidden w-full lg:w-[360px]"
          >
            <CardHeader className="p-0">
              <Image
                height={250}
                width={378}
                src={booth.thumbnail_image}
                alt={`Booth ${booth.booth_code}`}
                className="w-full h-[200px] lg:h-[250px]"
              />
            </CardHeader>
            <CardContent className="p-4 text-center">
              <p className="font-semibold text-lg text-secondary">
                Booth Code: {booth.booth_code}
              </p>
              <Link href={`/${size}-trade-show-booth/${booth.booth_code}`}>
                <Button
                  style={{ transitionDuration: "500ms" }}
                  className="mt-4 bg-transparent hover:bg-secondary border-2 border-[#B0CB1F] hover:border-secondary text-[#B0CB1F] hover:text-white px-6 py-2 font-bold text-sm"
                >
                  Contact Us
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
