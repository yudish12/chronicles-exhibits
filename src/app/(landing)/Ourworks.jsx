import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
// import ourWorksData from "../../utils/constants/dev-data/our-works.json";
import Link from "next/link";
import { getAllPortfolios } from "@/server/actions/portfolio";
import { headers } from "next/headers"; 
import { userAgent } from "next/server";
const Ourworks = async () => {
  const ua = userAgent({ headers: headers() });
  const isMobile = ua?.device?.type === "mobile";  
  const ourWorksData = await getAllPortfolios(6, 0);
  const displayedData = isMobile ? ourWorksData.data.slice(0, 6) : ourWorksData.data;
  console.log(ourWorksData);
  return (
    <div className="flex flex-col product-bg px-4 sm:px-8 md:px-12 py-12 gap-6">
      <h3
        style={{ lineHeight: "1.2" }}
        className="text-xl sm:text-2xl md:text-[2rem] text-white heading-font-700 font-semibold text-center"
      >
        TRADE SHOW BOOTH DESIGN PORTFOLIO
      </h3>
      <p className="text-sm md:text-base  text-white/95 text-center mb-2 px-4 sm:px-8 md:px-16">
        Our recent works in the USA showcase stunning images of our exceptional
        projects. From trade show booths to eye-catching displays, our portfolio
        reflects the expertise and creativity we bring to every project. Get
        inspired by our work and let us create a standout experience for your
        brand.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[370px,370px,370px] shadow-two w-full md:w-max mx-auto  gap-x-4 sm:gap-x-6 md:gap-x-8 p-4 sm:p-6 md:p-8 gap-y-6">
        {displayedData.map((item, index) => (
          <div
            key={index}
            className="overflow-hidden w-full sm:w-[370px] h-[200px] sm:h-[250px] md:h-[300px]"
          >
            <Image
              width={370}
              height={300}
              className="transition-transform w-full h-full duration-300 transform hover:scale-110"
              src={item.image}
              alt={item.image_alt_text ?? "default"}
            />
          </div>
        ))}
      </div>
      <Link className="flex" href="/portfolio">
        <Button
          style={{ transitionDuration: "500ms" }}
          className="bg-primary rounded-full body-bold py-5 hover:bg-white hover:text-secondary mx-auto border-2 border-secondary font-semibold text-secondary"
        >
          View Complete Portfolio
        </Button>
      </Link>
    </div>
  );
};

export default Ourworks;
