import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
const WhyChooseUs = () => {
  const bulletPoints = [
    {
      pt :  "Experience and Expertise"  
    }, 
    {
      pt: "Global Presence"
    },
    {
      pt: "Unparalelled Customer Service"
    },
    {
      pt: "Customization and Innovation"
    },
    {
      pt: "Comprehensive Solutions"
    },
    {
      pt: "Transparent and Cost-Effective"
    },
    {
      pt: "High-Quality Craftsmanship"
    },
    {
      pt: "Proven Track Record"
    }
  ]
  return (
    <div className="product-bg p-6 md:p-20 flex flex-col md:flex-row gap-6 md:gap-10">
       <div className="w-full md:w-1/2">
        <h3
          style={{ lineHeight: "1.2" }}
          className="heading-font uppercase font-semibold text-[#B0CB1F] text-lg sm:text-xl md:text-[2rem]"
        >
         WHY CHOOSE US ? 
        </h3>
        <p className="text-white mt-4 sm:mt-6 text-base ">
          When you Choose Exhibits LLC , you are choosing a reliable partner 
          dedicated to making your trade show experience memorable and impactful . With
          our passion for excellence, commitment to innovation, and unwavering support, we 
          are ready to elevate your brand presence and help you achieve your exhibiting
          <br />
          <br />
          {
            bulletPoints.map((bullet , index)=>(
              <li
              key={index}
              className="flex items-center py-2 " >
                <Image
                width={20}
                height={20}
                src="/Rectangle 99.svg"/>
                <span className="px-2">{bullet.pt}</span>
              </li>
            ))
          }
        </p>
      <div>
        <Button className="border-2 border-[#B0CB1F] text-[#B0CB1F] p-2 bg-transparent mt-4 ">Get Quote</Button>
      </div>
      </div>

      {/* Image Container */}
      <div className="w-full md:w-1/2">
        <Image
          layout="responsive" 
          width={370} 
          height={250} 
          src="/photo1 2.png"
          alt="photo1"
          className="max-h-[300px] md:max-h-[530px] object-cover rounded-lg "
        />
      </div>

    </div>
  );
};

export default WhyChooseUs;
