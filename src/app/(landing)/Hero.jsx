import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
const EnquiryForm = dynamic(() => import("@/components/Form"))

const Hero = ({ fields }) => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative xl:h-[95vh] lg:h-[100vh] 2xl:h-[64vh] h-full">
        <h1 className="heading-font py-8 sm:py-10 sm:w-full xs:w-[90%] w-[85%] mx-auto uppercase text-center text-black font-medium text-4xl sm:text-[2.75rem]">
          {fields[0].value}
        </h1>
        {/* <Image className="block hero sm:h-1/2 h-full lg:w-2/3 w-4/5 mx-auto shadow-xl rounded-[32px] relative"
        priority={true}
         /> */}

    <div className="relative overflow-hidden bg-black/70">
      <Image
        src="/hero-bg.gif" // Ensure this is in the public folder
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        priority={true} // Optimizes LCP by preloading
        loading="eager"
        decoding="async" 
        fetchPriority="high"
        className="absolute top-0 left-0 w-full h-full mix-blend-darken opacity-80 -z-10" 
      />
    </div>
        {/* Absolute Text and Button Container */}
        <div className="left-[20%] px-6 sm:px-12 md:px-20 lg:p-8 p-4 rounded-[32px] justify-center lg:absolute flex flex-col gap-8 lg:w-[60%] w-full bg-white top-[43%] 2xl:top-[47%] lg:mt-16 sm:mt-4 mt-0">
          <h3 className="text-2xl sm:text-3xl text-wrap 2xl:mt-2 break-words text-center text-primary uppercase font-medium">
            {fields[3].value}
          </h3>
          <p className="text-base sm:text-lg text-center">{fields[4].value}</p>

          {/* <Button
            style={{ transitionDuration: "500ms" }}
            className="rounded-full w-1/4 mx-auto px-12 py-6 font-thin text text-xl text-black border hover:bg-primary hover:text-white bg-transparent border-primary"
          >
            {fields[5].value}
          </Button> */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                style={{ transitionDuration: "500ms" }}
                className="rounded-full transition-500 w-1/6 font-semibold mx-auto px-6 py-5 bg-primary body-bold text-base  hover:bg-white hover:text-secondary border-2 border-secondary text-secondary"
              >
                Get Quote
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[700px] overflow-auto">
              <EnquiryForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Shadow Div to Control Spacing Between Sections */}
      <div className="shadow-div bg-gray-50"></div>
    </>
  );
};

export default Hero;
