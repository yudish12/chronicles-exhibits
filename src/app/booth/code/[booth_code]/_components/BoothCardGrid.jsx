"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Import Card components from shadcn
import Link from "next/link";
import Image from "next/image";
const booths = [
  {
    id: 1,
    image: "https://utfs.io/f/MRDf3hQQKORGV85tUYXQj0geIpfqlvAEdS1zU24ywMCtKb5G",
    code: "CEL101001",
  },
  {
    id: 3,
    image: "https://utfs.io/f/MRDf3hQQKORGV85tUYXQj0geIpfqlvAEdS1zU24ywMCtKb5G",
    code: "CEL101002",
  },
  {
    id: 6,
    image: "https://utfs.io/f/MRDf3hQQKORGV85tUYXQj0geIpfqlvAEdS1zU24ywMCtKb5G",
    code: "CEL101003",
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
              <Image
                height={250}
                width={378}
                src={booth.image}
                alt={`Booth ${booth.code}`}
                className="w-full h-[250px]"
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
