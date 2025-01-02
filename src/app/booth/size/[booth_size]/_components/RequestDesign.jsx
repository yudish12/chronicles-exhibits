import React from "react";
import { Button } from "@/components/ui/button";

const RequestDesign = ({ fields }) => {
  return (
    <div className="w-full product-bg flex flex-col items-center justify-center py-14 px-4 text-center">
      <div className="font-bold uppercase text-lg md:text-xl pt-10 text-[#B0CB1F]">
        {fields[4].value}
      </div>
      <div className="text-2xl sm:text-3xl uppercase md:text-4xl lg:text-4xl heading-font text-white font-bold pt-10">
        {fields[5].value}
      </div>
      <div className="py-10">
        <Button className="bg-transparent text-wrap h-16 sm:h-auto text-base sm:text-lg border-2 border-[#B0CB1F] hover:bg-[#B0CB1F] px-6 sm:px-8 font-bold text-[#B0CB1F] hover:text-white">
          {fields[6].value}
        </Button>
      </div>
    </div>
  );
};

export default RequestDesign;
