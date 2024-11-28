"use client";

import React, { useState } from "react";
import Image from "next/image";
import carouselData from "../../../utils/constants/dev-data/service-carousel.json";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + carouselData.length) % carouselData.length
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative border-2 border-primary mb-16 w-full h-full md:h-full overflow-hidden">
      {/* Carousel Content */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 25}%)`,
          width: `${carouselData.length * 100}%`,
        }}
      >
        {carouselData.map((item, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-1/4 h-full md:h-full"
          >
            {/* Background Image */}
            <div className="relative w-full h-full">
              <Image
                src={item.image}
                alt={item.heading}
                width={200}
                height={100}
                objectFit="cover"
                priority={index === 0} // Ensure the first image loads first
                className="z-[-2] w-full" // Ensures the image is below the overlay
              />
            </div>
            {/* Overlay */}
            <div className="absolute px-20 inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center z-10">
              <h3 className="text-2xl lg:text-[2rem] font-bold text-white mb-4">
                {item.heading}
              </h3>
              <p className="text-white text-lg lg:text-xl">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {carouselData.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
            }`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
