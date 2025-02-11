"use client";
import { cn } from "@/lib/utils";
import FsLightbox from "fslightbox-react";
import Image from "next/image";
import React, { useState } from "react";

const Lightbox = ({ images }) => {
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
      <div className="py-8 px-6 sm:px-8 md:px-12 lg:px-28 xl:px-44">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:max-w-[1200px] 2xl:max-w-[1400px] mx-auto gap-x-2 place-content-center py-8 gap-y-2">
          {images.data.map((item, index) => (
            <div
              key={index}
              onClick={() => openLightboxOnSlide(index + 1)}
              className={cn(
                "overflow-hidden cursor-pointer",

                ""
              )} // Wrapper to constrain image scale
            >
              <Image
loading="eager"
                width={400}
                height={300}
                className={cn(
                  `transition-transform sm:w-2/3 mx-auto md:w-full h-full min-h-[300px] max-h-[450px] duration-300 transform scale-110 hover:scale-125`
                )}
                src={item.image}
                alt={item.image_alt_text}
              />
            </div>
          ))}
        </div>
      </div>
      <FsLightbox
        toggler={toggler}
        slide={slide}
        sources={[...images.data.map((e) => e.image)]}
      />
    </>
  );
};

export default Lightbox;
