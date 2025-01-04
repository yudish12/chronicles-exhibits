import { Button } from "@/components/ui/button";
import React from "react";

const Hero = ({ fields }) => {
  return (
    <div className="h-[95vh] ">
      <h2 className="heading-font mt-6 uppercase text-center text-black font-medium text-[3.2rem]">
        {fields[0].value}
      </h2>
      <div className="hidden sm:block hero mt-6 h-1/2 w-2/3 mx-auto shadow-xl rounded-[32px] relative"></div>
      <div className="left-[20%] p-8 rounded-[32px] justify-center absolute flex flex-col gap-8 w-[60%] bg-white top-[59%] mt-16">
        <h3 className="text-4xl text-center text-primary uppercase font-medium">
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
