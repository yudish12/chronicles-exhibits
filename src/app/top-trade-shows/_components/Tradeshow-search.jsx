"use client";
import React, { useState } from "react";
import TradeShowGrid from "./TradeShowGrid";
import { Button } from "@/components/ui/button";
import { getAllData, getAllDataBySearch } from "@/server/actions/events";
import { useSearchParams } from "next/navigation";

const TradeshowSearch = ({ shows, setShows, totalPages, pages, limit }) => {
  const [searchValue, setSearchValue] = React.useState("");
  console.log(shows, 11);
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
      setShows(tradeShows.data);
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
      setShows(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (!shows.length || !shows) {
    return (
      <>
        <div className="flex items-center justify-center w-full gap-4 px-4">
          <div className="relative w-full md:w-3/5 lg:w-2/5">
            <input
              value={searchValue}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-5 py-3 text-lg focus:ring-2 focus:ring-secondary focus:outline-none shadow-md placeholder-gray-400"
              placeholder="Search for upcoming trade shows"
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-all"
              >
                ✕
              </button>
            )}
          </div>
          <Button
            onClick={onSearch}
            className="bg-secondary text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-secondary-dark transition-all"
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
              className="rounded-full transition-500 mx-auto px-8 text-lg hover:bg-white border border-black hover:text-black bg-primary text-black "
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
      <div className="flex items-center justify-center w-full px-4">
        <div className="relative flex items-center w-full md:w-3/5 lg:w-3/5 bg-white border border-gray-300 rounded-full shadow-md focus-within:ring-2 focus-within:ring-secondary">
          <input
            value={searchValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full px-5 py-3 text-lg text-gray-700 rounded-full focus:outline-none bg-transparent placeholder-gray-400"
            placeholder="Search for upcoming trade shows"
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue("")}
              className="absolute right-14 text-gray-400 hover:text-gray-600 transition-all"
            >
              ✕
            </button>
          )}
          <button
            onClick={onSearch}
            className="absolute right-2 bg-secondary text-white font-medium px-6 py-2 rounded-full shadow-md hover:bg-secondary-dark transition-all"
          >
            Search
          </button>
        </div>
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
