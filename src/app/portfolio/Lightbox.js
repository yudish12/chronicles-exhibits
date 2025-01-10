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
      <div className="py-8 px-6 sm:px-8 md:px-12 lg:px-32 xl:px-52">
        <div className="grid grid-cols-2 mx-auto gap-x-8 place-content-center py-8 gap-y-8">
          {images.data.map((item, index) => (
            <div
              key={index}
              onClick={() => openLightboxOnSlide(index + 1)}
              className={cn(
                "overflow-hidden rounded-3xl cursor-pointer",
                (index + 1) % 3 === 0
                  ? "col-span-2"
                  : "col-span-2 sm:col-span-1",
                ""
              )} // Wrapper to constrain image scale
            >
              <Image
                width={400}
                height={300}
                className={cn(
                  `transition-transform h-full min-h-[300px] max-h-[450px] w-full duration-300 transform scale-110 hover:scale-125`
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
