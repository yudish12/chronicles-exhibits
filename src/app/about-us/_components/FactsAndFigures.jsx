import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const static_data = [
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

const FactsAndFigures = ({ fields }) => {
  let data = [];
  if (fields) {
    data = [
      {
        id: 1,
        iconImage: fields[12].value ?? "/projects-svgrepo-com.svg",
        number: fields[10].value ?? "Projects Completed",
        text: fields[11].value,
        alt_text: fields[13].value,
        bgColor: "bg-white",
      },
      {
        id: 2,
        iconImage: fields[16].value ?? "/partners-svgrepo-com.svg",
        number: fields[14].value,
        text: fields[15].value,
        alt_text: fields[17].value,
        bgColor: "bg-white",
      },
      {
        id: 3,
        iconImage: fields[20].value ?? "/exhibition-museum-svgrepo-com.svg",
        number: fields[18].value,
        text: fields[19].value,
        alt_text: fields[21].value,
        bgColor: "bg-white",
      },
      {
        id: 4,
        iconImage: fields[24].value ?? "/icons/Fire.svg",
        number: fields[22].value,
        text: fields[23].value,
        alt_text: fields[25].value,
        bgColor: "bg-white",
      },
    ];
  } else {
    data = static_data;
  }

  return (
    <div className="bg-white py-16 flex flex-col justify-center items-center ">
      <div className="text-secondary heading-font-700 text-2xl leading-10 uppercase font-bold">
        {fields ? fields[8].value : "Facts And Figures"}
      </div>
      <div className="hidden mx-52 lg:mx-80 text-center md:block py-4">
        {fields
          ? fields[9].value
          : "Discover some of the features that have made us one of the distinguished trade show booth design companies. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium asperiores nemo maiores est unde vitae veniam, ullam iste excepturi assumenda?"}
      </div>
      <div className="block md:hidden py-4 px-2 ">
        <p className="text-center px-2 ">
          {fields
            ? fields[9].value
            : "Discover some of the features that have made us one of the distinguished trade show booth design companies. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium asperiores nemo maiores est unde vitae veniam, ullam iste excepturi assumenda?"}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-8 md:px-12 lg:px-16 mt-8">
        {data.map((item) => (
          <Card
            key={item.id}
            className={`group w-[155px] xs:w-[170px] sm:w-[180px] md:w-[220px] h-[150px] transition-all duration-300 shadow-one ${item.bgColor} `}
          >
            <CardContent className="flex flex-col px-4 xs:px-6 justify-center items-center text-center h-full">
              <div className="text-3xl transition-all duration-300 pt-8">
                <Image
                  width={100}
                  height={100}
                  alt={item.alt_text ?? "icon"}
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
