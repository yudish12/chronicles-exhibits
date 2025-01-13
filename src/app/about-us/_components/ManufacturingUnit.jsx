import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllPortfolios } from "@/server/actions/portfolio";
import { headers } from "next/headers";
import { userAgent } from "next/server";
const ManufacturingUnit = async ({ fields }) => {
  // const data = await getAllPortfolios(0,0,"image");
  // console.log(data)
  const images = [
    {
      image: fields[28].value,
      alt: fields[29].value,
    },
    {
      image: fields[30].value,
      alt: fields[31].value,
    },
    {
      image: fields[32].value,
      alt: fields[33].value,
    },
    {
      image: fields[34].value,
      alt: fields[35].value,
    },
    {
      image: fields[36].value,
      alt: fields[37].value,
    },
    {
      image: fields[38].value,
      alt: fields[39].value,
    },
  ];
  return (
    <>
      <div className="flex flex-col items-center justify-center py-10 px-8">
        <div className="text-secondary text-xl-1 sm:text-3xl heading-font py-4  sm:px-0 ">
          <h2>{fields[26].value}</h2>
        </div>

        <p className="text-secondary xl:mx-44 lg:mx-32 md:mx-20 sm:mx-10 mx-4 text-center sm:px-0 px-2 py-2 mb-2 sm:py-0 ">
          {fields[27].value}
        </p>

        <div className=" sm:p-20 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full md:w-max mx-auto gap-x-2 gap-y-2">
            {images.map((src, index) => (
              <div
                key={index}
                className="overflow-hidden md:w-[370px] lg:w-[420px] sm:h-[350px] md:h-[300px] "
              >
                {/* w-full sm:w-[420px] h-[200px] sm:h-[250px] md:h-[230px] */}
                <Image
                  width={370}
                  height={300}
                  className="transition-transform w-full h-full duration-300 transform hover:scale-110"
                  src={src.image}
                  alt={src.alt}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManufacturingUnit;
