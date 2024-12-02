import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import ourWorksData from "../../utils/constants/dev-data/our-works.json";

const Ourworks = () => {
  return (
    <div className="flex flex-col px-12  gap-5">
      <h5 className="text-primary text-[1.35rem] text-center font-semibold">
        Our Works
      </h5>
      <h3
        style={{ lineHeight: "1.2" }}
        className="text-[2rem] text-secondary heading-font font-semibold text-center"
      >
        TRADE SHOW BOOTH DESIGN PORTFOLIO
      </h3>
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
      <div />
      <div className="flex justify-center items-center flex-col px-20 py-6">
        <p className="text-black text-center">
          Our recent works in the USA showcase stunning images of our
          exceptional projects. From trade show booths to eye-catching displays,
          our portfolio reflects the expertise and creativity we bring to every
          project. Get inspired by our work and let us create a standout
          experience for your brand.
        </p>
        <Button
          style={{ transitionDuration: "500ms" }}
          className="bg-transparent hover:bg-secondary hover:text-white mx-auto mt-4 border-2 border-secondary font-semibold text-secondary"
        >
          View Complete Portfolio
        </Button>
      </div>
    </div>
  );
};

export default Ourworks;
