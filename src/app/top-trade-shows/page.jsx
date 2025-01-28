import Header from "@/components/ui/header";
import React from "react";
import Footer from "@/components/ui/footer";
import { getAllData } from "@/server/actions/events";
import { getSinglePage } from "@/server/actions/pages";
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
  const { data } = await getSinglePage({ name: "events" });
  // project -> start_date , end_date , title , icon ,event_name , country , city
  return (
    <>
      {/* <  /> */}
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
