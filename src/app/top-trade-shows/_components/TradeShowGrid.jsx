import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pagination } from "./Pagination";

const TradeShowGrid = ({ tradeShows, totalPage, currentPage }) => {
  return (
    <div className="px-20 mt-12">
      {/* Trade show grid */}
      <div className="grid lg:grid-cols-[290px,290px,290px,290px] md:grid-cols-3 gap-x-12 gap-y-12 sm:grid-cols-2 gap-4">
        {tradeShows.data.map((show) => (
          <div
            key={show._id}
            className="min-h-[360px] justify-between bg-white flex shadow-one rounded-xl flex-col gap-5 items-center p-6"
          >
            <h4 className="text-secondary text-center heading-font text-2xl uppercase font-semibold">
              {show.event_name}
            </h4>
            <Image
              className="rounded-full"
              width={120}
              height={120}
              src={show.icon}
              alt={show.event_name ?? "event name"}
            />
            <div className="flex flex-col gap-2 w-full px-4">
              <p className="flex gap-4">
                <MapPin color="#B0CB1F" />
                <span className="text-[16px]">
                  {show?.location_id?.city ?? show.city},{" "}
                  {show?.location_id?.continent ?? show.country}
                </span>
              </p>
              <p className="flex gap-4">
                <Calendar color="#B0CB1F" />
                <span className="text-[16px]">
                  {moment(show.start_date).format("DD")}-
                  {moment(show.end_date).format("DD")}{" "}
                  {moment(show.start_date).format("MMMM")}{" "}
                  {moment(show.end_date).format("YYYY")}
                </span>
              </p>
            </div>
            <Link className="w-full justify-center" href={`/${show.slug}/`}>
              <Button
                variant="outline"
                className="text-secondary w-full hover:bg-secondary hover:text-white border-secondary border-2 bg-transparent font-semibold py-[18px] text-[16px]"
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
