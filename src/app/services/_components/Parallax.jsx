"use client";
import React, { useEffect, useState } from "react";
import useScrollPosition from "@/components/useScroll";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Parallax = ({ fields }) => {
  const scrollPosition = useScrollPosition();

  // Determine the active section based on scroll position
  const currentSection =
    scrollPosition < 1100
      ? 1
      : scrollPosition < 1700
      ? 2
      : scrollPosition < 2300
      ? 3
      : 4;
  const [activeSection, setActiveSection] = useState(currentSection);

  useEffect(() => {
    if (activeSection !== currentSection) {
      setActiveSection(currentSection);
    }
  }, [currentSection, activeSection]);

  // Content data for each section
  const sections = [
    {
      id: 1,
      image: fields[19].value,
      alt_text: fields[20].value,
      text: fields[21].value,
    },
    {
      id: 2,
      image: fields[26].value,
      alt_text: fields[27].value,
      text: fields[28].value,
    },
    {
      id: 3,
      image: fields[33].value,
      alt_text: fields[34].value,
      text: fields[35].value,
    },
    {
      id: 4,
      image: fields[40].value,
      alt_text: fields[41].value,
      text: fields[42].value,
    },
  ];

  console.log(sections);

  return (
    <div className="bg-background px-20 py-16">
      <h3 className="text-secondary font-semibold text-center text-[2rem] heading-font">
        {fields[17].value}
      </h3>
      <p className="text-[17px] text-black text-center mt-6">
        {fields[18].value}
      </p>

      <div className="mt-20 grid bg-transparent grid-cols-2 gap-x-20">
        {/* Left Sticky Div */}
        <div
          className="sticky top-[250px] hover:text-white transition-all shadow-one hover:bg-secondary max-w-[650px] p-8 bg-white rounded-lg"
          style={{
            height: "300px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            transitionDuration: "500ms",
          }}
        >
          <Image
            src={sections[currentSection - 1].image}
            width={70}
            height={70}
            alt="icon"
            style={{ transitionDuration: "500ms" }}
          />
          <p key={`text-${activeSection}`} className="fadeInOut text-center ">
            {sections[currentSection - 1].text}
          </p>
        </div>

        {/* Right Scrollable Content */}
        <div
          className="relative"
          style={{ height: "1800px", border: "2px solid red" }}
        >
          {/* Section 1 */}
          <div
            className={cn(
              "absolute top-0 left-0 w-full transition-opacity duration-500",
              currentSection === 1 ? "opacity-100" : "opacity-0"
            )}
          >
            <h3 className="text-center text-[1.5rem] text-secondary">
              {fields[22].value}
            </h3>
            <p className="text-center mt-4">{fields[23].value}</p>
            <Image
              src={fields[24].value}
              alt={fields[25].value}
              width={250}
              height={150}
              className="w-full h-full max-h-[150px]  object-contain rounded-2xl"
            />
          </div>

          {/* Section 2 */}
          <div
            className={cn(
              "absolute top-[500px] left-0 w-full transition-opacity duration-500",
              currentSection === 2 ? "opacity-100" : "opacity-0"
            )}
          >
            <h3 className="text-center text-[1.5rem] text-secondary">
              {fields[29].value}
            </h3>
            <p className="text-center mt-4">{fields[30].value}</p>
            <Image
              src={fields[31].value}
              alt={fields[32].value}
              width={250}
              height={150}
              className="w-full h-full max-h-[150px]  object-contain rounded-2xl"
            />
          </div>

          {/* Section 3 */}
          <div
            className={cn(
              "absolute top-[1000px] left-0 w-full transition-opacity duration-500",
              currentSection === 3 ? "opacity-100" : "opacity-0"
            )}
          >
            <h3 className="text-center text-[1.5rem] text-secondary">
              {fields[36].value}
            </h3>
            <p className="text-center mt-4">{fields[37].value}</p>
            <Image
              src={fields[38].value}
              alt={fields[39].value}
              width={250}
              height={150}
              className="w-full h-full max-h-[150px]  object-contain rounded-2xl"
            />
          </div>

          {/* Section 4 */}
          <div
            className={cn(
              "absolute top-[1500px] left-0 w-full transition-opacity duration-500",
              currentSection === 4 ? "opacity-100" : "opacity-0"
            )}
          >
            <h3 className="text-center text-[1.5rem] text-secondary">
              {fields[43].value}
            </h3>
            <p className="text-center mt-4">{fields[44].value}</p>
            <Image
              src={fields[45].value}
              alt={fields[46].value}
              width={250}
              height={150}
              className="w-full h-full max-h-[150px]  object-contain rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parallax;
