"use client";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pagination } from "./Pagination";

const TradeShowGrid = ({ tradeShows, totalPage, currentPage }) => {
  return (
    <div className="px-0 md:px-10 lg:px-20 mt-12 w-full">
      {/* Trade show grid */}
      <div className="grid lg:grid-cols-3 mx-0 lg:mx-10 sm:gap-x-5 md:gap-x-10 lg:gap-x-12 gap-y-12 sm:grid-cols-2 gap-4">
        {tradeShows?.map((show) => (
          <div
            key={show._id}
            className="min-h-[360px] w-full justify-between bg-[#414141] flex shadow-one rounded-xl flex-col gap-5 items-center p-6"
          >
            <h4 className="text-white text-center heading-font text-2xl uppercase font-semibold">
              {show.event_name}
            </h4>
            <Link href={`/${show.slug}`}>
              <Image
                loading="eager"
                className="rounded-full"
                width={120}
                height={120}
                src={show.icon}
                alt={show.event_name ?? "event name"}
              />
            </Link>
            <div className="flex flex-col gap-2 w-full px-4">
              <p className="flex text-white gap-4">
                <MapPin color="#B0CB1F" />
                <span className="text-[17px]">
                  {show?.location_id?.city ?? show.city} | United States
                </span>
              </p>
              <p className="flex gap-4">
                <Calendar color="#B0CB1F" />
                <span className="text-[17px] text-white">
                  {moment(show.start_date).format("DD")}-
                  {moment(show.end_date).format("DD")}{" "}
                  {moment(show.start_date).format("MMMM")}{" "}
                  {moment(show.end_date).format("YYYY")}
                </span>
              </p>
            </div>
            <Link className="w-full justify-center" href={`/${show.slug}`}>
              <Button
                variant="outline"
                className="text-white w-full hover:bg-white hover:text-secondary border-white border-2 bg-transparent font-semibold py-[18px] text-[16px]"
              >
                View Details
              </Button>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination component */}
      <Pagination currentPage={currentPage} totalPages={totalPage} />
    </div>
  );
};

export default TradeShowGrid;
