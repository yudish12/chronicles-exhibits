"use client";
import React, { useState } from "react";
import TradeShowGrid from "./TradeShowGrid";
import { Button } from "@/components/ui/button";
import { getAllData, getAllDataBySearch } from "@/server/actions/events";
import { RevalidatePath } from "@/server/actions/revalidate-path";
import { useSearchParams } from "next/navigation";

const TradeshowSearch = ({ shows, setShows, totalPages, pages, limit }) => {
  const [searchValue, setSearchValue] = React.useState("");

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

  if (!shows.length || !shows) {
    return (
      <>
        <div className="flex gap-6 justify-center w-full">
          <input
            value={searchValue}
            onKeyDown={(e) => {
              console.log(e.key);
              if (e.key === "Enter") {
                onSearch();
              }
            }}
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
          <div className="flex py-12 flex-col gap-6">
            <p className="text-xl text-center font-semibold">
              <span className="text-primary font-semibold">OOPS!</span> The
              Trade Show you are looking for is unavailable right now.
              <br /> Kindly come back later.
            </p>
            <Button
              style={{ transitionDuration: "500ms" }}
              className="rounded-full  mx-auto px-8 text-lg hover:bg-white border border-black hover:text-black bg-primary text-black "
            >
              View Other Trade Shows
            </Button>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="flex gap-6 justify-center w-full">
        <input
          value={searchValue}
          onKeyDown={(e) => {
            console.log(e.key);
            if (e.key === "Enter") {
              onSearch();
            }
          }}
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
