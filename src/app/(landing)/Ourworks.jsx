import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import ourWorksData from "../../utils/constants/dev-data/our-works.json";
import Link from "next/link";

const Ourworks = () => {
  return (
    <div className="flex flex-col px-12 py-4 gap-6">
      <h3
        style={{ lineHeight: "1.2" }}
        className="text-[2rem] text-secondary heading-font font-semibold text-center"
      >
        TRADE SHOW BOOTH DESIGN PORTFOLIO
      </h3>
      <p className="text-black text-center mb-2 px-16">
        Our recent works in the USA showcase stunning images of our exceptional
        projects. From trade show booths to eye-catching displays, our portfolio
        reflects the expertise and creativity we bring to every project. Get
        inspired by our work and let us create a standout experience for your
        brand.
      </p>
      <div className="grid grid-cols-[370px,370px,370px] shadow-two  w-max mx-auto bg-white rounded-xl gap-x-8 place-content-center p-8 gap-y-8">
        {ourWorksData.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-xl w-[370px] h-[300px]" // Wrapper to constrain image scale
          >
            <Image
              width={370}
              height={300}
              className="transition-transform min-h-[300px] duration-300 transform hover:scale-110"
              src="/photo1-ourwork.png"
              alt={`photo-${index}`}
            />
          </div>
        ))}
      </div>
      <Link className="flex" href="/portfolio">
        <Button
          style={{ transitionDuration: "500ms" }}
          className="bg-transparent hover:bg-secondary hover:text-white mx-auto border-2 border-secondary font-semibold text-secondary"
        >
          View Complete Portfolio
        </Button>
      </Link>
    </div>
  );
};

export default Ourworks;
