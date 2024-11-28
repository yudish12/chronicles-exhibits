"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
const Products = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    { imgSrc: "/what-we-do-1.png", size: "10X10", link: "#" },
    { imgSrc: "/what-we-do-1.png", size: "10X20", link: "#" },
    { imgSrc: "/what-we-do-1.png", size: "10X30", link: "#" },
    { imgSrc: "/what-we-do-2.png", size: "20X20", link: "#" },
    { imgSrc: "/what-we-do-2.png", size: "20X30", link: "#" },
    { imgSrc: "/what-we-do-2.png", size: "30X30", link: "#" },
    { imgSrc: "/what-we-do-3.png", size: "40X40", link: "#" },
    { imgSrc: "/what-we-do-3.png", size: "40X50", link: "#" },
    { imgSrc: "/what-we-do-2.png", size: "50X50", link: "#" },
  ];

  const visibleCards = 3;

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      (prevIndex + visibleCards) % cards.length
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex - visibleCards < 0
        ? cards.length - visibleCards
        : prevIndex - visibleCards
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const totalSlides = Math.ceil(cards.length/3);
  return (
    <div className="bg-secondary w-full flex flex-col items-center py-14">
      <h2 className="text-xl font-bold text-[#B0CB1F] pt-4 mb-4">
        Product Lineup
      </h2>
      <h1 className="text-center heading-font text-white text-3xl font-bold">
        EYE CATCHING TRADE SHOW BOOTH DESIGNS
      </h1>
      <h1 className="text-center heading-font text-white mb-2 text-3xl font-bold">
        FOR SUCCESSFUL EXHIBITIONS
      </h1>
      <p className="text-center text-gray-300 text-md pt-4 ">
        Explore over 1,000 trade show booth designs by selecting your booth size.
        All designs are fully customizable.
      </p>
  
      <div className="flex items-center justify-center w-full px-32 pt-6 relative my-6">
        {/* Card Carousel */}
        <div className="flex justify-center items-center gap-12 overflow-hidden">
          {cards.map((item, index) => (
            <div
              key={index}
              className={`transition-all transform h-[370px] w-[370px] shadow-one ${
                index >= activeIndex && index < activeIndex + visibleCards
                  ? "scale-100 opacity-100 block"
                  : "scale-0 opacity-0 hidden"
              }`}
            >
              <div
                className="shadow-xl rounded-lg overflow-hidden w-[100%] h-[98.75%] bg-secondary flex flex-col"
              >
                {/* Image Section */}
                <img
                  src={item.imgSrc}
                  alt={item.size}
                  className="w-full h-[80%] object-cover"
                />
                {/* Content Section */}
                <div className="flex flex-col justify-center items-center bg-secondary/[.94] text-white h-[25%]">
                  <div className="text-2xl font-bold  text-white heading-font pt-2">
                    {item.size}
                  </div>
                  <Link
                    href={item.link}
                    className="text-[#B0CB1F] underline text-xsm font-light mt-2 mb-2"
                  >
                    View More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 ">
          {Array.from({length: totalSlides}).map((_ , slideIndex)=>(
            <div
            key={slideIndex}
            className={`w-[10px] h-[10px] rounded-full ${
              slideIndex === Math.floor(activeIndex / 3)
              ? "bg-white"
              : "bg-gray-400"}`}>
            </div>
          ))}
        </div>
    </div>
  );
  };

export default Products;
