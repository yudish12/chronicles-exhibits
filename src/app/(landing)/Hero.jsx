import { Button } from "@/components/ui/button";
import React from "react";

const Hero = () => {
  return (
    <div className="h-[95vh] ">
      <h2 className="heading-font mt-6 uppercase text-center text-black font-medium text-[3.2rem]">
        State of the Art Exhibit Displays
      </h2>
      <div className="hidden sm:block hero mt-6 h-1/2 w-2/3 mx-auto shadow-xl rounded-[32px] relative"></div>
      <div className="left-[20%] p-8 rounded-[32px] justify-center absolute flex flex-col gap-8 w-[60%] bg-white top-[59%] mt-16">
        <h3 className="text-4xl text-center text-primary uppercase font-medium">
          The leading exhibit display design studio in usa
        </h3>
        <p className="text-lg text-center">
          Your one-stop destination for exceptional trade show booth design and
          building services in the USA.
        </p>
        <Button
          style={{ transitionDuration: "500ms" }}
          className="rounded-full w-1/4 mx-auto px-12 py-6 font-thin text text-xl text-black border hover:bg-primary hover:text-white  bg-transparent border-primary"
        >
          Get Personalised Quote
        </Button>
      </div>
    </div>
  );
};

export default Hero;
