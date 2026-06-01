"use client";

import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";

const AUTOPLAY_DELAY_MS = 4000;

const arrowButtonClass =
  "shrink-0 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-md border border-gray-200 text-secondary hover:bg-primary/20 transition-colors";

function EventCard({ show }) {
  return (
    <Link
      href={`/${show.slug}`}
      className="min-h-[420px] w-full bg-white flex border-2 border-gray-200 rounded-xl flex-col items-center p-6 sm:p-7 gap-5 sm:gap-6"
    >
      <div className="min-h-[5.5rem] w-full flex items-center justify-center px-2">
        <h4 className="text-secondary heading-font text-lg sm:text-xl font-semibold text-center leading-snug text-balance">
          {show.event_name}
        </h4>
      </div>
      <Image
        loading="eager"
        className="rounded-full shrink-0 border border-black"
        width={130}
        height={130}
        src={show.icon}
        alt={show.title || show.event_name}
      />
      <div className="flex flex-col gap-3 w-full mt-auto">
        <p className="flex text-black gap-3 items-start">
          <MapPin color="#B0CB1F" className="shrink-0 mt-0.5" />
          <span className="text-base sm:text-[17px] leading-snug">
            {show?.location_id?.city ?? show.city} | United States
          </span>
        </p>
        <p className="flex text-black gap-3 items-start">
          <Calendar color="#B0CB1F" className="shrink-0 mt-0.5" />
          <span className="text-base sm:text-[17px] leading-snug">
            {moment(show?.start_date).format("DD")}-
            {moment(show?.end_date).format("DD")}{" "}
            {moment(show?.start_date).format("MMMM")}{" "}
            {moment(show?.end_date).format("YYYY")}
          </span>
        </p>
      </div>
    </Link>
  );
}

const slideClass =
  "min-w-0 shrink-0 grow-0 basis-full min-[640px]:basis-1/2 min-[1228px]:basis-1/3 px-2";

export default function LocationEventsCarousel({ events = [] }) {
  const canLoop = events.length > 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: canLoop,
    dragFree: false,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onResize = () => emblaApi.reInit();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !canLoop) return;

    let intervalId;

    const startAutoplay = () => {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        emblaApi.scrollNext();
      }, AUTOPLAY_DELAY_MS);
    };

    const stopAutoplay = () => clearInterval(intervalId);

    startAutoplay();

    const root = emblaApi.rootNode();
    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", startAutoplay);
    emblaApi.on("pointerDown", stopAutoplay);
    emblaApi.on("pointerUp", startAutoplay);

    return () => {
      stopAutoplay();
      root.removeEventListener("mouseenter", stopAutoplay);
      root.removeEventListener("mouseleave", startAutoplay);
      emblaApi.off("pointerDown", stopAutoplay);
      emblaApi.off("pointerUp", startAutoplay);
    };
  }, [emblaApi, canLoop]);

  if (!events.length) return null;

  const showControls = events.length > 1;

  return (
    <div className="mt-12 pb-4 w-full px-4 md:px-12 lg:px-16">
      <div className="flex items-center w-full gap-2 sm:gap-3 md:gap-4">
        {showControls && (
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous events"
            className={arrowButtonClass}
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}

        <div
          className="flex-1 min-w-0 overflow-hidden touch-pan-y"
          ref={emblaRef}
        >
          <div className="flex">
            {events.map((show) => (
              <div
                key={show._id?.toString() ?? show.slug}
                className={slideClass}
              >
                <EventCard show={show} />
              </div>
            ))}
          </div>
        </div>

        {showControls && (
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next events"
            className={arrowButtonClass}
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        )}
      </div>
    </div>
  );
}
