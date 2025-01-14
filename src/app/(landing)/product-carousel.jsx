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

  // Update visible cards on window resize
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

  // Start auto-slide on mount
  useEffect(() => {
    startAutoSlide();

    return () => {
      stopAutoSlide();
    };
  }, [activeIndex]);

  // Auto-slide functions
  const startAutoSlide = () => {
    stopAutoSlide(); // Clear any existing interval
    slideInterval.current = setInterval(handleNext, 3000);
  };

  const stopAutoSlide = () => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
  };

  // Slide to the next card
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === 7 ? 0 : prevIndex + 1));
  };

  // Slide to the previous card
  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? 7 : prevIndex - 1));
  };

  // Handle dot navigation
  const handleDotClick = (slideIndex) => {
    setActiveIndex(slideIndex);
    startAutoSlide(); // Reset auto-slide
  };

  return (
    <div
      className="relative w-full py-6"
      onMouseEnter={stopAutoSlide} // Pause auto-slide on mouse enter
      onMouseLeave={startAutoSlide} // Resume auto-slide on mouse leave
    >
      {/* Chevron Navigation */}
      <button
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="flex md:hidden absolute -left-5 top-1/2 transform -translate-y-1/2 z-10  text-white rounded-full p-3"
      >
        <ChevronLeftCircle />
      </button>
      <button
        onClick={handleNext}
        aria-label="Next Slide"
        className="flex md:hidden absolute -right-5 top-1/2 transform -translate-y-1/2 z-10 text-white rounded-full p-3"
      >
        <ChevronRightCircle />
      </button>

      {/* Card Carousel */}
      <div className="overflow-hidden w-full lg:px-0 sm:max-w-[400px] md:max-w-[800px] lg:max-w-[1200px] mx-auto">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(activeIndex * 100) / visibleCards}%)`,
          }}
        >
          {boothsizes.map((item, index) => (
            <Link
              href={`/${item.name}-trade-show-booth`}
              key={index}
              className={`w-full md:w-[50%] lg:w-1/3 flex-shrink-0 px-2 xl:px-6`}
            >
              <div
                className={cn(
                  "rounded-lg h-[330px] w-[320px] mx-auto xs:w-[350px] sm:w-full lg:w-[350px] shadow-xl overflow-hidden bg-secondary flex flex-col",
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
                  className="w-full h-3/4"
                />
                <div className="flex h-1/4 heading-font-700 bg-white flex-col justify-center items-center bg-secondary/[.94] text-secondary">
                  <p className="text-[1.65rem] uppercase font-semibold">
                    {item.name.toUpperCase()}
                  </p>
                  <p className="text-lg capitalize font-semibold">
                    trade show booth rental{" "}
                    {location
                      ?.replaceAll("-", " ") // Replace hyphens with spaces
                      ?.split(" ") // Split the string into words
                      ?.map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      ) // Capitalize the first letter of each word
                      ?.join(" ") ?? ""}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="hidden md:flex justify-center gap-2 mt-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((_, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => handleDotClick(slideIndex)}
            className={`w-[10px] h-[10px] rounded-full cursor-pointer ${
              slideIndex === activeIndex
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
