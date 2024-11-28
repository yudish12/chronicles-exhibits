import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Ourworks = () => {
  return (
    <div className="bg-background flex flex-col gap-5">
      <h5 className="text-primary text-[1.35rem] text-center font-semibold">
        Our Works
      </h5>
      <h3
        style={{ lineHeight: "1.2" }}
        className="text-[2rem] text-secondary heading-font font-semibold text-center"
      >
        TRADE SHOW BOOTH DESIGN PORTFOLIO
      </h3>
      <div className="grid grid-cols-3 px-20 gap-x-6 py-6 gap-y-6">
        <Image
          width={500}
          height={500}
          className="shadow-one"
          src="/photo1-ourwork.png"
          alt="photo1"
        />
        <Image
          width={500}
          height={500}
          className="shadow-one"
          src="/photo1-ourwork.png"
          alt="photo2"
        />
        <Image
          width={500}
          height={500}
          className="shadow-one"
          src="/photo1-ourwork.png"
          alt="photo3"
        />
        <Image
          width={500}
          height={500}
          className="shadow-one"
          src="/photo1-ourwork.png"
          alt="photo4"
        />
        <Image
          width={500}
          height={500}
          className="shadow-one"
          src="/photo1-ourwork.png"
          alt="photo5"
        />
        <Image
          width={500}
          height={500}
          className="shadow-one"
          src="/photo1-ourwork.png"
          alt="photo6"
        />
      </div>
      <div className="flex justify-center items-center flex-col px-20 py-6">
        <p className="text-black text-center">
          Our recent works in USA showcases stunning images of our exceptional
          projects. From trade show booths to eye-catching displays, our
          portfolio reflects the expertise and creativity we bring to every
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
