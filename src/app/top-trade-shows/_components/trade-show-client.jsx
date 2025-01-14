"use client";
import React, { useState } from "react";
import TradeshowSearch from "./Tradeshow-search";

const TradeShowClient = ({ data, tradeShows, totalPages, page, limit }) => {
  const [shows, setShows] = useState(tradeShows);

  return (
    <div className="bg-background px-6 md:px-16 lg:px-20 py-12 flex flex-col items-center justify-center gap-4">
      <TradeshowSearch
        shows={shows}
        setShows={setShows}
        totalPages={totalPages}
        pages={page}
        limit={limit}
      />
      {!shows || !shows.length ? (
        <></>
      ) : (
        <p className="text-[17px]  md:mx-16  lg:mx-24 text-justify mt-6">
          {data.fields[1].value}
          <br />
          <br />
          {data.fields[2].value}
        </p>
      )}
    </div>
  );
};

export default TradeShowClient;
