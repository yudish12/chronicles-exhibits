"use client";

import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { Pagination } from "./Pagination";

function TradeShowCard({ show }) {
  const city = show?.location_id?.city ?? show.city;
  const startDate = moment(show?.start_date).format("M/D/YYYY");
  const endDate = moment(show?.end_date).format("M/D/YYYY");

  return (
    <Link
      href={`/${show.slug}`}
      className="group flex w-full items-center gap-4 sm:gap-5 rounded-xl border border-[#d5dde6] bg-[#eef2f6] p-4 sm:p-5 shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex h-[88px] w-[88px] sm:h-[100px] sm:w-[100px] shrink-0 items-center justify-center rounded-lg bg-white p-2 sm:p-3">
        <Image
          loading="eager"
          src={show.icon}
          alt={show.event_name ?? "Trade show logo"}
          width={80}
          height={80}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5 sm:gap-2 text-left">
        <h4 className="heading-font text-base sm:text-lg font-bold leading-snug text-secondary group-hover:text-primary transition-colors">
          {show.event_name}
        </h4>
        <p className="text-sm sm:text-[15px] text-[#5c6b7a] leading-snug">
          {city} | United States
        </p>
        <p className="text-sm sm:text-[15px] text-[#5c6b7a] leading-snug">
          {startDate} - {endDate}
        </p>
      </div>
    </Link>
  );
}

const TradeShowGrid = ({ tradeShows, totalPage, currentPage }) => {
  return (
    <div className="mt-12 w-full px-4 sm:px-8 md:px-10 lg:px-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
        {tradeShows?.map((show) => (
          <TradeShowCard key={show._id} show={show} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPage} />
    </div>
  );
};

export default TradeShowGrid;
