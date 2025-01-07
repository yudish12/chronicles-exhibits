import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const FactsAndFigures = ({ fields }) => {
  const data = [
    {
      id: 1,
      iconImage: "/projects-svgrepo-com.svg",
      number: fields[25].value,
      text: fields[26].value,

      bgColor: "bg-white",
    },
    {
      id: 2,
      iconImage: "/partners-svgrepo-com.svg",
      number: fields[27].value,
      text: fields[28].value,

      bgColor: "bg-white",
    },
    {
      id: 3,
      iconImage: "/exhibition-museum-svgrepo-com.svg",
      number: fields[29].value,
      text: fields[30].value,
      bgColor: "bg-white",
    },
    {
      id: 4,
      iconImage: "/icons/Fire.svg",
      number: fields[31].value,
      text: fields[32].value,
      bgColor: "bg-white",
    },
  ];

  return (
    <div className="bg-white py-16 flex flex-col justify-center items-center">
      <div className="text-secondary heading-font-700 text-2xl leading-10 uppercase font-bold">
        FACTS AND FIGURES
      </div>
      <div className="hidden mx-80 text-center md:block py-4">
        Discover some of the features that have made us one of the distinguished
        trade show booth design companies. Lorem ipsum, dolor sit amet
        consectetur adipisicing elit. Accusantium asperiores nemo maiores est
        unde vitae veniam, ullam iste excepturi assumenda?
      </div>
      <div className="block md:hidden py-4 px-2 ">
        <p className="text-center px-2 ">
          We boast 13+ years of experience in the industry and 1000+ trade show
          booth esigns compatible with any kind of space.
        </p>
      </div>
      <div className="grid grid-cols-2 px-2  gap-6 mt-8 md:flex md:flex-row md:flex-wrap md:justify-center md:items-center md:gap-10">
        {data.map((item) => (
          <Card
            key={item.id}
            className={`group w-[180px] h-[150px] transition-all duration-300 shadow-one ${item.bgColor} md:w-[220px]`}
          >
            <CardContent className="flex flex-col justify-center items-center text-center h-full">
              <div className="text-3xl transition-all duration-300 pt-8">
                <Image
                  width={100}
                  height={100}
                  alt="icon"
                  src={item.iconImage}
                  className="w-12 h-12 block pt-2"
                />
              </div>
              <div className="text-2xl font-bold transition-all duration-300">
                <span className="block text-secondary pt-2 heading-font">
                  {item.number}
                </span>
              </div>
              <div className="transition-all duration-300 font-light">
                <span className="block text-secondary pt-2 pb-4">
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
