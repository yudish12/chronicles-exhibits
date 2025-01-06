"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";

const ProductCarousel = ({ bgColor, boothsizes, location }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(1);
  const slideInterval = useRef(null);

  useEffect(() => {
    const updateVisibleCards = () => {
      setVisibleCards(
        window.innerWidth >= 1025 ? 3 : window.innerWidth >= 768 ? 2 : 1
      );
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);

    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  useEffect(() => {
    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, [activeIndex, visibleCards]);

  const startAutoSlide = () => {
    stopAutoSlide(); // Clear any existing interval before starting a new one
    slideInterval.current = setInterval(() => {
      handleNext();
    }, 3000); // Change slides every 5 seconds
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

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
    startAutoSlide(); // Reset the interval on dot click
  };

  return (
    <div
      className="relative w-full py-6 px-4 lg:px-20 xl:px-24"
      onMouseEnter={stopAutoSlide} // Pause auto-slide on mouse enter
      onMouseLeave={startAutoSlide} // Resume auto-slide on mouse leave
    >
      {/* Chevron Navigation */}
      <button
        onClick={() => {
          handlePrev();
          startAutoSlide(); // Reset the interval on manual navigation
        }}
        aria-label="Previous Slide"
        className="flex md:hidden absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white rounded-full p-3"
      >
        <ChevronLeftCircle />
      </button>
      <button
        onClick={() => {
          handleNext();
          startAutoSlide(); // Reset the interval on manual navigation
        }}
        aria-label="Next Slide"
        className="flex md:hidden absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white rounded-full p-3"
      >
        <ChevronRightCircle />
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
              className={`min-w-full md:min-w-[50%] lg:min-w-[33.33%] max-w-full md:max-w-[50%] lg:max-w-[33.33%] flex-shrink-0 px-2 xl:px-6`}
            >
              <div
                className={cn(
                  "rounded-lg h-[400px] shadow-xl overflow-hidden w-full bg-secondary flex flex-col",
                  bgColor === "white"
                    ? "shadow-none border border-gray-400"
                    : ""
                )}
              >
                <Image
                  src={item.image}
                  width={350}
                  height={300}
                  alt={item.size ?? "size"}
                  className="w-full h-3/4 object-cover"
                />
                <div className="flex h-1/4 heading-font-700 bg-white flex-col justify-center items-center bg-secondary/[.94] text-secondary">
                  <p className="text-[1.65rem] uppercase font-semibold">
                    {item.name.toUpperCase()}
                  </p>
                  <p className="capitalize text-lg font-semibold">
                    trade show booth rental {location?.toLowerCase() ?? ""}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="hidden md:flex justify-center gap-2 mt-4">
        {Array.from({
          length: Math.ceil(boothsizes.length / visibleCards),
        }).map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => handleDotClick(slideIndex)}
            className={`w-[10px] h-[10px] rounded-full cursor-pointer ${
              slideIndex === Math.floor(activeIndex / visibleCards)
                ? bgColor === "white"
                  ? "bg-primary"
                  : "bg-white"
                : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
