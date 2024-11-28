"use client";
import React, { useState } from "react";
import cardData from "../../utils/constants/dev-data/product-card.json";
import Link from "next/link";

const ProductCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleCards = 3; // Number of cards visible at a time

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex + visibleCards >= cardData.length
        ? 0 // Loop back to the start
        : prevIndex + visibleCards
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex - visibleCards < 0
        ? cardData.length - visibleCards // Loop back to the end
        : prevIndex - visibleCards
    );
  };

  const handleDotClick = (index) => {
    setActiveIndex(index * visibleCards);
  };

  return (
    <>
      <div className="relative w-full py-6 px-24">
        {/* Card Carousel */}
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(activeIndex / visibleCards) * 100}%)`,
            }}
          >
            {cardData.map((item, index) => (
              <div
                key={index}
                className="min-w-[33.33%] max-w-[33.33%] flex-shrink-0 px-6"
              >
                <div className="rounded-lg h-[400px] shadow-xl overflow-hidden w-full bg-secondary flex flex-col">
                  {/* Image Section */}
                  <img
                    src={item.imgSrc}
                    alt={item.size}
                    className="w-full h-[75%] object-cover"
                  />
                  {/* Content Section */}
                  <div className="flex flex-col justify-center items-center bg-secondary/[.94] text-white h-[25%]">
                    <div className="text-[1.4rem] font-bold text-white heading-font pt-2">
                      {item.size}
                    </div>
                    <Link
                      href={item.link}
                      className="text-[#B0CB1F] underline text-sm font-normal mt-2 mb-2"
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: Math.ceil(cardData.length / visibleCards) }).map(
          (_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => handleDotClick(slideIndex)}
              className={`w-[10px] h-[10px] rounded-full cursor-pointer ${
                slideIndex === Math.floor(activeIndex / visibleCards)
                  ? "bg-white"
                  : "bg-gray-400"
              }`}
            ></div>
          )
        )}
      </div>
    </>
  );
};

export default ProductCarousel;
