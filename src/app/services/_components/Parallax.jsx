"use client";
import React, { useEffect, useState } from "react";
import useScrollPosition from "@/components/useScroll";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Parallax = () => {
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
      image: "/cube.svg",
      text: "Transform your trade show presence with our booth design expertise. Our team of designers excels in crafting visually striking booths that leave a lasting impression on attendees. Whether you need a modern and sleek design or a cozy and inviting space, we tailor our services to meet your specific needs, ensuring you make a memorable impact at every trade show.",
    },
    {
      id: 2,
      image: "/layers-stacked.svg",
      text: "Watch your booth design come to life through our booth fabrication service. Our skilled team handles every aspect of the construction process, from selecting the right materials to assembling the booth in just the right way. We understand the importance of aesthetics and ensure that your booth aligns with your brand aesthetic. With our commitment to quality,you can trust your booth will impress visitors and create at.",
    },
    {
      id: 3,
      image: "/cube.svg",
      text: "Transform your trade show presence with our booth design expertise. Our team of designers excels in crafting visually striking booths that leave a lasting impression on attendees. Whether you need a modern and sleek design or a cozy and inviting space, we tailor our services to meet your specific needs, ensuring you make a memorable impact at every trade show.",
    },
    {
      id: 4,
      image: "/layers-stacked.svg",
      text: "Watch your booth design come to life through our booth fabrication service. Our skilled team handles every aspect of the construction process, from selecting the right materials to assembling the booth in just the right way. We understand the importance of aesthetics and ensure that your booth aligns with your brand aesthetic. With our commitment to quality,you can trust your booth will impress visitors and create at.",
    },
  ];

  return (
    <div className="bg-background px-20 py-16">
      <h3 className="text-secondary font-semibold text-center text-[2rem] heading-font">
        END TO END TRADE SHOW BOOTH SOLUTIONS
      </h3>
      <p className="text-[17px] text-black text-center mt-6">
        Chronicle Exhibits USA is one of the leading trade show booth
        construction companies known to provide high-quality and eye-catchy
        custom trade show booths and rentals Services.
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
              Section 1: Introduction
            </h3>
            <p className="text-center mt-4">
              This is the first section of the content. Scroll to explore more.
            </p>
            <Image
              src={"/ngwa-show.png"}
              alt="ngwa-show"
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
              Section 2: Design
            </h3>
            <p className="text-center mt-4">
              Our designs are tailored to suit your brand’s needs.
            </p>
            <Image
              src={"/ngwa-show.png"}
              alt="ngwa-show"
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
              Section 3: Customization
            </h3>
            <p className="text-center mt-4">
              Customize your trade show booth to stand out.
            </p>
            <Image
              src={"/ngwa-show.png"}
              alt="ngwa-show"
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
              Section 4: Execution
            </h3>
            <p className="text-center mt-4">
              We ensure smooth execution of trade show solutions.
            </p>
            <Image
              src={"/ngwa-show.png"}
              alt="ngwa-show"
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
