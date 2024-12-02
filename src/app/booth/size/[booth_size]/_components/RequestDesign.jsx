import React from "react";
import { Button } from "@/components/ui/button";

const RequestDesign = () => {
  return (
    <div className="w-full product-bg flex flex-col items-center justify-center py-14 px-4 text-center">
      <div className="font-bold text-lg md:text-xl pt-10 text-[#B0CB1F]">
        Looking For Something Different?
      </div>
      <div className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl heading-font text-white font-bold pt-10">
        CONTACT US FOR A COMPLEMENTARY CUSTOM 3D DESIGN
      </div>
      <div className="py-10">
        <Button className="bg-transparent text-base sm:text-lg border-2 border-[#B0CB1F] hover:bg-[#B0CB1F] px-6 sm:px-8 py-4 sm:py-6 font-bold text-[#B0CB1F] hover:text-white">
          Request for Free Design
        </Button>
      </div>
    </div>
  );
};

export default RequestDesign;
