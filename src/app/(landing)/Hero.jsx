import { Button } from "@/components/ui/button";
import React from "react";

const Hero = () => {
  return (
    <div className="hero h-[98vh]">
      <h6 className=" text-base mt-14 leading-5 font-medium text-center text-secondary">
        Ready to{" "}
        <span className="font-semibold">
          Revolutionize your Exhibit Displays?
        </span>
      </h6>
      <h2 className="heading-font mt-2 uppercase text-center text-black font-bold text-[3.45rem]">
        Get State of the Art
      </h2>
      <h2 className="text-black heading-font uppercase text-center font-bold text-[3.45rem]">
        Trade Fair Booth
      </h2>
      <h2 className="text-black heading-font uppercase text-center font-bold text-[3.45rem]">
        Displays
      </h2>
      <div className="w-full flex justify-center mt-16">
        <Button
          style={{ transitionDuration: "500ms" }}
          className="px-[1.22rem] py-[1.9rem] hover:scale-110 transition-all hover:bg-black bg-secondary rounded-xl mx-auto text-white font-bold text-2xl"
        >
          Get Personalised Quote
        </Button>
      </div>
    </div>
  );
};

export default Hero;
