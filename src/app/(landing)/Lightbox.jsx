"use client";
import Image from "next/image";
import React, { useState } from "react";
import FsLightbox from "fslightbox-react";

const LightboxComp = ({ images }) => {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  const { toggler, slide } = lightboxController;

  function openLightboxOnSlide(number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    });
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[370px,370px,370px] shadow-two w-full md:w-max mx-auto  gap-x-4 sm:gap-x-6 md:gap-x-8 p-4 sm:p-6 md:p-8 gap-y-6">
        {images.map((item, index) => (
          <div
            key={index}
            onClick={() => openLightboxOnSlide(index + 1)}
            className="overflow-hidden cursor-pointer w-full sm:w-[370px] h-[200px] sm:h-[250px] md:h-[300px]"
          >
            <Image
              width={370}
              height={300}
              className="transition-transform w-full h-full duration-300 transform hover:scale-110"
              src={item.image}
              alt={item.image_alt_text ?? "default"}
            />
          </div>
        ))}
      </div>
      <FsLightbox
        toggler={toggler}
        slide={slide}
        sources={[...images.map((e) => e.image)]}
      />
    </>
  );
};

export default LightboxComp;
