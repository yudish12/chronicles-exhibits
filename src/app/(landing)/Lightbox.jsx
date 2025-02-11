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
      <div className="grid grid-cols-1 xl:w-max sm:grid-cols-2 lg:grid-cols-3 w-full  mx-auto  gap-x-4 sm:gap-x-6 md:gap-x-8 py-4 sm:py-6 md:py-8  gap-y-6 pb-4">
        {images.map((item, index) => (
          <div
            key={index}
            onClick={() => openLightboxOnSlide(index + 1)}
            className="overflow-hidden max-w-[320px] lg:max-w-[360px] 2xl:max-w-[400px] mx-auto sm:max-w-full cursor-pointer w-full h-[230px] sm:h-[250px] md:h-[300px] lg:h-[270]px xl:h-[300px]"
          >
            <Image
loading="eager"
              width={370}
              height={300}
              className="transition-transform  w-full h-full duration-300 transform hover:scale-110"
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
