"use client";

import React, { useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
// import carouselData from "../../../utils/constants/dev-data/service-carousel.json";
import { DotButton, useDotButton } from "@/components/EmblaDots";
import "../../embla.css";

const Carousel = ({ fields }) => {
  const options = { loop: true };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

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

  const carouselData = [
    {
      image: fields[1].value,
      alt_text: fields[2].value,
      heading: fields[3].value,
      description: fields[4].value,
    },
    {
      image: fields[5].value,
      alt_text: fields[6].value,
      heading: fields[7].value,
      description: fields[8].value,
    },
    {
      image: fields[9].value,
      alt_text: fields[10].value,
      heading: fields[11].value,
      description: fields[12].value,
    },
    {
      image: fields[13].value,
      alt_text: fields[14].value,
      heading: fields[15].value,
      description: fields[16].value,
    },
  ];

  return (
    <section className="embla">
      <div className="embla__viewport mt-8" ref={emblaRef}>
        <div className="embla__container">
          {carouselData.map((item, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number relative w-full h-full">
                <Image
                  src={item.image}
                  alt={item.alt_text ?? "heading"}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover rounded-2xl"
                  priority={index === 0}
                />
                {/* Overlay */}
                <div className="absolute inset-0 rounded-2xl bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {item.heading}
                  </h3>
                  <p className="text-white md:mx-16 sm:mx-10 mx-4 lg:mx-24 xl:mx-44 text-lg">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
