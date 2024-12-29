import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import tradeShows from "../../utils/constants/dev-data/trade-shows.json";
import React from "react";
import Image from "next/image";
import moment from "moment";
import Footer from "@/components/ui/footer";
import { MapPin, Calendar } from "lucide-react";
import RequestDesign from "../booth/size/[booth_size]/_components/RequestDesign";
import Link from "next/link";
import { getAllData } from "@/server/actions/events";
import TradeShowGrid from "./_components/TradeShowGrid";

const Page = async ({ params, searchParams }) => {
  const searchparams = await searchParams;
  const page = Number(searchparams?.page) ?? 1;
  const limit = 8;
  const skip = (page - 1) * limit;
  let tradeShows = await getAllData(
    skip,
    limit,
    "start_date end_date title icon event_name country city slug"
  );
  const totalPages = Math.ceil(tradeShows.count / limit);
  console.log("==trade shows ==", tradeShows);
  // project -> start_date , end_date , title , icon ,event_name , country , city
  return (
    <>
      <SubHeader />
      <Header />
      <div className="trade-show-bg px-20 flex justify-center items-center flex-col">
        <h2 className="text-[2.1rem] text-center text-white uppercase font-semibold heading-font">
          Top Trade Shows In USA
        </h2>
        <p className="text-center text-[17px] text-white mt-4 sm:mt-6 ">
          Trade shows, exhibitions, and conferences in the USA are effective
          platforms to strengthen your brand recognition value and take your
          business to the next level of success. Top trade shows in the USA
          offer excellent opportunities to make in-person connections through
          face-to-face interactions.
        </p>
      </div>
      <div className="bg-background px-20 py-12 flex flex-col items-center justify-center gap-4">
        <div className="flex gap-6 justify-center w-full">
          <input
            className="shadow-one w-[40%] placeholder:font-medium rounded-lg placeholder:text-secondary/60 px-4"
            placeholder="Search for upcoming trade shows"
          />
          <Button className="text-secondary font-semibold bg-white hover:bg-secondary hover:text-white transition-all py-5 shadow-one">
            Search
          </Button>
        </div>
        <p className="text-[17px] text-center">
          The following trade show directory can be a valuable branding and
          marketing tool for your business. It comprises some of the biggest
          trade shows in the USA across various industries. Explore and identify
          top trade shows in the USA that can drive your brand to get ahead of
          your competition.
        </p>

        <TradeShowGrid
          tradeShows={tradeShows}
          totalPage={totalPages}
          currentPage={page}
          limit={limit}
        />
      </div>
      <Footer />
    </>
  );
};

export default Page;
