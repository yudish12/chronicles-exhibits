import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
const data = [
  {
    id: 1,
    iconImage: "/projects-svgrepo-com.svg",
    number: "2931",
    text: "Projects Completed",
    hoverIconImage: "/icons/Location-green.svg",
    hoverNumber: "91",
    hoverText: "Locations Served",
    bgColor: "bg-white",
    hoverBgColor: "bg-secondary",
  },
  {
    id: 2,
    iconImage: "/partners-svgrepo-com.svg",
    number: "3717",
    text: "Trusted Partners",
    hoverIconImage: "/icons/Person.svg",
    hoverNumber: "250",
    hoverText: "Expert Crew Members",
    bgColor: "bg-white",
    hoverBgColor: "bg-secondary",
  },
  {
    id: 3,
    iconImage: "/exhibition-museum-svgrepo-com.svg",
    number: "9182",
    text: "Featured Trade Shows",
    hoverIconImage: "/services-svgrepo-com.svg",
    hoverNumber: "25",
    hoverText: "Services Offered",
    bgColor: "bg-white",
    hoverBgColor: "bg-secondary",
  },
  {
    id: 4,
    iconImage: "/icons/Fire.svg",
    number: "10382",
    text: "Booths Designed",
    hoverIconImage: "/icons/Like.png",
    hoverNumber: "3540",
    hoverText: "Recommendations",
    bgColor: "bg-white",
    hoverBgColor: "bg-secondary",
  },
];

const FactsAndFigures = () => {
  return (
<div className="bg-white py-16 flex flex-col justify-center items-center">
  <div className="text-secondary heading-font-700 text-2xl leading-10 uppercase font-bold">
    Facts & Figures
  </div>
  <div className="hidden md:block py-4">13+ Years in Industry</div>
  <div className="block md:hidden py-4 px-2 ">
  <p className="text-center px-2 ">
    We boast 13+ years of experience in the industry 
    and 1000+ trade show booth esigns compatible
     with any kind of space.</p></div>
  <div className="grid grid-cols-2 px-2  gap-6 mt-8 md:flex md:flex-row md:flex-wrap md:justify-center md:items-center md:gap-10">
    {data.map((item) => (
      <Card
        key={item.id}
        className={`group w-[180px] h-[150px] transition-all duration-300 shadow-one ${item.bgColor} hover:${item.hoverBgColor} md:w-[280px]`}
      >
        <CardContent className="flex flex-col justify-center items-center text-center h-full">
          <div className="text-3xl transition-all duration-300 pt-8">
            <Image
              width={100}
              height={100}
              alt="hover icon"
              src={item.hoverIconImage}
              className="w-12 h-12 hidden pt-2 group-hover:block"
            />
            <Image
              width={100}
              height={100}
              alt="icon"
              src={item.iconImage}
              className="w-12 h-12 block pt-2 group-hover:hidden"
            />
          </div>
          <div className="text-2xl font-bold transition-all duration-300">
            <span className="hidden group-hover:block text-white pt-2 heading-font">
              {item.hoverNumber}
            </span>
            <span className="block group-hover:hidden text-secondary pt-2 heading-font">
              {item.number}
            </span>
          </div>
          <div className="transition-all duration-300 font-light">
            <span className="hidden group-hover:block text-white pt-2 pb-4">
              {item.hoverText}
            </span>
            <span className="block group-hover:hidden text-secondary pt-2 pb-4">
              {item.text}
            </span>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
</div>
  );
};

export default FactsAndFigures;
