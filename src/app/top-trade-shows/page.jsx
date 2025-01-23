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
import { getSinglePage } from "@/server/actions/pages";
import TradeshowSearch from "./_components/Tradeshow-search";
import TradeShowClient from "./_components/trade-show-client";

export const generateMetadata = async ({}) => {
  const { data } = await getSinglePage({ name: "events" });
  return {
    title: data?.meta_title || "Default Title",
    description: data?.meta_description || "Default Description",
    alternates: {
      canonical: `https://chronicleexhibits.com/top-trade-shows/`,
    },
    keywords: data?.meta_keywords?.join(",") ?? "Default Keywords",
  };
};

const Page = async ({ params, searchParams }) => {
  const searchparams = await searchParams;
  const page = Number(searchparams?.page) ?? 1;
  const limit = 12;
  const skip = (page - 1) * limit;
  let tradeShows = await getAllData(
    skip,
    limit,
    "start_date end_date title icon event_name country city slug"
  );
  const totalPages = Math.ceil(tradeShows.count / limit);
  console.log("==trade shows ==", tradeShows);
  const { data } = await getSinglePage({ name: "events" });
  // project -> start_date , end_date , title , icon ,event_name , country , city
  return (
    <>
      {/* <SubHeader /> */}
      <Header />
      <div className="trade-show-bg px-20 flex justify-center items-center flex-col">
        <h1 className="text-[2.1rem] text-center text-white uppercase font-semibold heading-font">
          {data.fields[0].value}
        </h1>
      </div>
      <TradeShowClient
        data={data}
        tradeShows={tradeShows}
        totalPages={totalPages}
        page={page}
        limit={limit}
      />

      <Footer />
    </>
  );
};

export default Page;
