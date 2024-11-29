import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const data = [
  {
    id: 1,
    iconImage: "./Pin.svg", // Replace with actual icons
    number: "2931",
    text: "Projects Completed",
    hoverIconImage: "./Globe.svg",
    hoverNumber: "91",
    hoverText: "Locations Served",
    bgColor: "bg-white",
    hoverBgColor: "bg-secondary",
  },
  {
    id: 2,
    iconImage: "./Heart.svg",
    number: "3717",
    text: "Trusted Partners",
    hoverIconImage: "./Person.svg",
    hoverNumber: "250",
    hoverText: "Expert Crew Members",
    bgColor: "bg-white",
    hoverBgColor: "bg-secondary",
  },
  {
    id: 3,
    iconImage: "./Star.svg",
    number: "9182",
    text: "Featured Trade Shows",
    hoverIconImage: "./Gift.svg",
    hoverNumber: "25",
    hoverText: "Services Offered",
    bgColor: "bg-white",
    hoverBgColor: "bg-secondary",
  },
  {
    id: 4,
    iconImage: "./Fire.svg",
    number: "10382",
    text: "Booths Designed",
    hoverIconImage: "./Like.png",
    hoverNumber: "3540",
    hoverText: "Recommendations",
    bgColor: "bg-white",
    hoverBgColor: "bg-secondary",
  },
];

const FactsAndFigures = () => {
  return (
    <div className="bg-[#FDF3ED] py-20 flex flex-col justify-center items-center">
      <div className="text-[#B0CB1F] text-xl font-bold pt-4">
        Facts & Figures
      </div>
      <div className="flex flex-row flex-wrap justify-center items-center gap-10 mt-8">
        {data.map((item) => (
          <Card
            key={item.id}
            className={`group w-[280px] h-[150px] transition-all duration-300 shadow-one ${item.bgColor} hover:${item.hoverBgColor}`}
          >
            <CardContent className="flex flex-col justify-center items-center  text-center h-full">
              <div className="text-3xl transition-all duration-300 pt-8 ">
                <img
                  alt="hover icon"
                  src={item.hoverIconImage}
                  className="w-12 h-12 hidden pt-2 group-hover:block"
                />
                <img
                  alt="icon"
                  src={item.iconImage}
                  className="w-12 h-12 block pt-2 group-hover:hidden"
                />
              </div>
              <div className="text-2xl font-bold transition-all duration-300">
                <span className="hidden group-hover:block text-white pt-2 heading-font ">
                  {item.hoverNumber}
                </span>
                <span className="block group-hover:hidden text-secondary pt-2 heading-font">
                  {item.number}
                </span>
              </div>
              <div className=" transition-all duration-300 font-light ">
                <span className="hidden group-hover:block text-white pt-2 pb-4 ">
                  {item.hoverText}
                </span>
                <span className="block group-hover:hidden text-secondary pt-2 pb-4 ">
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
