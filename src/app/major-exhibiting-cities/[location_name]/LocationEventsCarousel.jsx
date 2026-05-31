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
      className="h-[350px] w-full max-w-[400px] mx-auto bg-white flex border-2 border-gray-200 rounded-xl flex-col gap-5 items-center p-6 justify-between"
    >
      <h4 className="text-secondary heading-font text-xl font-semibold text-center">
        {show.event_name}
      </h4>
      <Image
        loading="eager"
        className="rounded-full"
        width={120}
        height={120}
        src={show.icon}
        alt={show.title || show.event_name}
      />
      <div className="flex flex-col gap-2 w-full px-4">
        <p className="flex text-black gap-4">
          <MapPin color="#B0CB1F" className="shrink-0" />
          <span className="text-[17px]">
            {show?.location_id?.city ?? show.city} | United States
          </span>
        </p>
        <p className="flex gap-4">
          <Calendar color="#B0CB1F" className="shrink-0" />
          <span className="text-[17px] text-black">
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

export default function LocationEventsCarousel({ events = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: events.length > 1,
    dragFree: false,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi || events.length <= 1) return;

    let intervalId;

    const startAutoplay = () => {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (!emblaApi) return;
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext();
        } else {
          emblaApi.scrollTo(0);
        }
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
  }, [emblaApi, events.length]);

  if (!events.length) return null;

  const showControls = events.length > 1;

  return (
    <div className="mt-12 pb-4 w-full px-4 sm:px-8 md:px-12 lg:px-16">
      <div className="flex items-center w-full gap-2 sm:gap-4">
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
                className="min-w-0 shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 px-2 sm:px-3"
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
