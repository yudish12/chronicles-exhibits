"use client";
import React, { useState } from "react";
import TradeShowGrid from "./TradeShowGrid";
import { Button } from "@/components/ui/button";
import { getAllData, getAllDataBySearch } from "@/server/actions/events";
import { RevalidatePath } from "@/server/actions/revalidate-path";
import { useSearchParams } from "next/navigation";

const TradeshowSearch = ({ tradeShows, totalPages, pages, limit }) => {
  const [searchValue, setSearchValue] = React.useState("");
  const [shows, setShows] = useState(tradeShows);
  const [loading, setLoading] = useState(false);
  const [paginationState, setPagination] = useState({
    totalPages: totalPages,
    currentPage: pages,
    limit: limit,
  });

  const searchParams = useSearchParams();

  const onSearch = async () => {
    setLoading(true);
    if (!searchValue) {
      const page = pages;
      const limit = 12;
      const skip = (page - 1) * limit;
      let tradeShows = await getAllData(
        skip,
        limit,
        "start_date end_date title icon event_name country city slug"
      );
      const totalPages = Math.ceil(tradeShows.count / limit);
      setShows(tradeShows);
      setPagination({
        totalPages: totalPages,
        currentPage: page,
        limit: limit,
      });
      setLoading(false);
      return;
    }

    try {
      const response = await getAllDataBySearch(searchValue);
      setShows(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-6 justify-center w-full">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="shadow-one w-[100%] md:w-[60%] lg:w-[40%] placeholder:text-center placeholder:font-medium rounded-lg placeholder:text-secondary/60 px-4"
          placeholder="Search for upcoming trade shows"
        />
        <Button
          onClick={onSearch}
          className="text-secondary font-semibold bg-white hover:bg-secondary hover:text-white transition-all py-5 shadow-one"
        >
          Search
        </Button>
      </div>
      {loading ? (
        <div class="loader"></div>
      ) : (
        <TradeShowGrid
          tradeShows={shows}
          totalPage={paginationState.totalPages}
          currentPage={paginationState.currentPage}
          limit={paginationState.limit}
        />
      )}
    </>
  );
};

export default TradeshowSearch;
