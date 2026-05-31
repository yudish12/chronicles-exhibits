"use client";

import { cn } from "@/lib/utils";
import FsLightbox from "fslightbox-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

function normalizeImages(images) {
  if (Array.isArray(images)) return images;
  if (images?.data && Array.isArray(images.data)) return images.data;
  return [];
}

function getColumnCount(width) {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

function distributeToColumns(items, columnCount) {
  const columns = Array.from({ length: columnCount }, () => []);
  items.forEach((item, index) => {
    columns[index % columnCount].push({ item, originalIndex: index });
  });
  return columns;
}

const PortfolioLightbox = ({ images, className, gridClassName }) => {
  const items = normalizeImages(images);
  const [columnCount, setColumnCount] = useState(3);
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  useEffect(() => {
    const updateColumnCount = () => {
      setColumnCount(getColumnCount(window.innerWidth));
    };

    updateColumnCount();
    window.addEventListener("resize", updateColumnCount);
    return () => window.removeEventListener("resize", updateColumnCount);
  }, []);

  const columns = useMemo(
    () => distributeToColumns(items, columnCount),
    [items, columnCount],
  );

  const { toggler, slide } = lightboxController;

  function openLightboxOnSlide(number) {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: number,
    });
  }

  if (!items.length) return null;

  return (
    <>
      <div className={cn("px-4", className)}>
        <div className="container mx-auto">
          <div className={cn("flex items-start gap-4 w-full", gridClassName)}>
            {columns.map((column, columnIndex) => (
              <div
                key={columnIndex}
                className="flex flex-1 flex-col gap-4 min-w-0"
              >
                {column.map(({ item, originalIndex }) => (
                  <button
                    key={item._id ?? originalIndex}
                    type="button"
                    onClick={() => openLightboxOnSlide(originalIndex + 1)}
                    className="group block w-full overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer text-left"
                    aria-label={`View portfolio image ${originalIndex + 1}`}
                  >
                    <Image
                      src={item.image}
                      alt={
                        item.image_alt_text ||
                        `Portfolio image ${originalIndex + 1}`
                      }
                      width={1200}
                      height={900}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <FsLightbox
        toggler={toggler}
        slide={slide}
        sources={items.map((e) => e.image)}
      />
    </>
  );
};

export default PortfolioLightbox;
