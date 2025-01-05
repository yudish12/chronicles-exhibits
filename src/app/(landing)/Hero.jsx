import { Button } from "@/components/ui/button";
import React from "react";

const Hero = ({ fields }) => {
  return (
    <div className="lg:h-[95vh] sm:h-[80vh] h-full">
      <h2 className="heading-font mt-6 uppercase text-center text-black font-medium text-[3.2rem]">
        {fields[0].value}
      </h2>
      <div className="block hero mt-2 lg:mt-6 sm:h-1/2 h-full lg:w-2/3 w-4/5 mx-auto shadow-xl rounded-[32px] relative"></div>
      <div className="left-[20%] lg:p-8 p-4 rounded-[32px] justify-center lg:absolute flex flex-col gap-8 lg:w-[60%] w-full  bg-white top-[59%] lg:mt-16 sm:mt-4 mt-0">
        <h3 className="text-4xl text-wrap break-words text-center text-primary uppercase font-medium">
          {fields[3].value}
        </h3>
        <p className="text-lg text-center">{fields[4].value}</p>
        <Button
          style={{ transitionDuration: "500ms" }}
          className="rounded-full w-1/4 mx-auto px-12 py-6 font-thin text text-xl text-black border hover:bg-primary hover:text-white  bg-transparent border-primary"
        >
          {fields[5].value}
        </Button>
      </div>
    </div>
  );
};

export default Hero;
