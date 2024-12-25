"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
const ProductCarousel = ({ boothsizes }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);

  useEffect(() => {
    const updateVisibleCards = () => {
      setVisibleCards(window.innerWidth >= 768 ? 3 : 1);
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);

    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex + visibleCards >= boothsizes.length
        ? 0
        : prevIndex + visibleCards
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex - visibleCards < 0
        ? boothsizes.length - visibleCards
        : prevIndex - visibleCards
    );
  };

  const handleDotClick = (slideIndex) => {
    setActiveIndex(slideIndex * visibleCards);
  };

  return (
    <div className="relative w-full py-6 px-4 md:px-24">
      {/* Chevron Navigation */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="flex md:hidden absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white rounded-full p-3"
      >
        &#8249;
      </button>
      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="flex md:hidden absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white rounded-full p-3"
      >
        &#8250;
      </button>

      {/* Card Carousel */}
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(activeIndex * 100) / visibleCards}%)`,
          }}
        >
          {boothsizes.map((item, index) => (
            <Link
              href={`/booth/size/${item.name}`}
              key={index}
              className={`min-w-full md:min-w-[33.33%] max-w-full md:max-w-[33.33%] flex-shrink-0 px-2 md:px-6`}
            >
              <div className="rounded-lg h-[400px] shadow-xl overflow-hidden w-full bg-secondary flex flex-col">
                <Image
                  src={item.image}
                  width={350}
                  height={300}
                  alt={item.size}
                  className="w-full h-3/4 object-cover"
                  // layout="fill" // Ensures the image covers the parent container
                />
                <div className="flex h-1/4 heading-font-700 bg-white flex-col justify-center items-center bg-secondary/[.94] text-secondary">
                  <p className="text-[1.65rem] font-semibold">{item.name}</p>
                  <p className="uppercase text-lg font-semibold">
                    trade show booth rental
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="hidden md:flex justify-center gap-2 mt-4">
        {Array.from({
          length: Math.ceil(boothsizes.length / visibleCards),
        }).map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => handleDotClick(slideIndex)}
            className={`w-[10px] h-[10px] rounded-full cursor-pointer ${
              slideIndex === Math.floor(activeIndex / visibleCards)
                ? "bg-white"
                : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
