import Image from "next/image";
import React from "react";
import "./about-us.css";
import { Button } from "@/components/ui/button";
const WhyChooseUs = ({ fields }) => {
  const bulletPoints = [
    {
      pt: "Experience and Expertise",
    },
    {
      pt: "Global Presence",
    },
    {
      pt: "Unparalelled Customer Service",
    },
    {
      pt: "Customization and Innovation",
    },
    {
      pt: "Comprehensive Solutions",
    },
    {
      pt: "Transparent and Cost-Effective",
    },
    {
      pt: "High-Quality Craftsmanship",
    },
    {
      pt: "Proven Track Record",
    },
  ];
  return (
    <div className="product-bg py-6 px-0 sm:px-4 md:px-8 lg:p-20 flex flex-col md:flex-row gap-6 md:gap-10">
      <div className="w-full md:w-1/2 px-6 sm:px-0">
        <h3
          style={{ lineHeight: "1.2" }}
          className="heading-font uppercase font-semibold text-[#B0CB1F] text-lg sm:text-xl md:text-[2rem]"
        >
          {fields[3].value}
        </h3>
        <div
          id="about_us_content"
          dangerouslySetInnerHTML={{ __html: fields[6].value }}
        ></div>
        <div>
          <Button className="border-2 font-bold border-[#B0CB1F] text-[#B0CB1F] p-4 bg-transparent hover:bg-[#B0CB1F] hover:text-secondary mt-4  text-lg">
            {fields[7].value}
          </Button>
        </div>
      </div>

      {/* Image Container */}
      <div className="w-full md:w-1/2 sm:px-0 ">
        <Image
          layout="responsive"
          width={370}
          height={250}
          alt={fields[5].value}
          src={fields[4].value}
          className="min-h-[400px] rounded-lg "
        />
      </div>
    </div>
  );
};

export default WhyChooseUs;
