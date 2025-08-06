"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const BoothGrid = ({ size }) => {
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const observerRef = useRef();
  const loadingRef = useRef();

  const fetchBooths = useCallback(
    async (pageNum) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/booths?size=${size}&page=${pageNum}&limit=9`
        );
        const result = await response.json();

        if (result.success) {
          if (pageNum === 1) {
            setBooths(result.data.booths);
          } else {
            setBooths((prev) => [...prev, ...result.data.booths]);
          }
          setHasMore(result.data.pagination.hasMore);
        } else {
          setError(result.message || "Failed to fetch booths");
        }
      } catch (err) {
        setError("Failed to fetch booths");
        console.error("Error fetching booths:", err);
      } finally {
        setLoading(false);
      }
    },
    [size]
  );

  useEffect(() => {
    fetchBooths(1);
  }, [fetchBooths]);

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPage((prevPage) => {
              const nextPage = prevPage + 1;
              fetchBooths(nextPage);
              return nextPage;
            });
          }
        },
        {
          rootMargin: "100px",
        }
      );

      if (node) {
        observerRef.current.observe(node);
      }
    },
    [loading, hasMore, fetchBooths]
  );

  if (error) {
    return (
      <div className="py-20 bg-gradient-to-b">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 md:px-20 xl:px-6">
          <div className="text-center text-red-600">
            <p>Error: {error}</p>
            <Button
              onClick={() => fetchBooths(1)}
              className="mt-4 bg-secondary hover:bg-secondary/80"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gradient-to-b">
      {/* Booth Grid */}
      <div className="grid grid-cols-1 mx-auto sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 max-w-[1200px] px-6 sm:px-10 md:px-20 xl:px-6">
        {booths.map((booth, index) => {
          const isLastElement = index === booths.length - 1;

          return (
            <Card
              key={booth._id || index}
              ref={isLastElement ? lastElementRef : null}
              className="shadow-one mx-auto rounded-lg overflow-hidden max-w-[360px] w-full xl:w-[360px]"
            >
              <CardHeader className="p-0">
                <Link href={`/${size}-trade-show-booth/${booth.booth_code}`}>
                  <Image
                    loading="lazy"
                    height={250}
                    width={378}
                    src={booth.thumbnail_image}
                    alt={`Booth ${booth.booth_code}`}
                    className="w-full h-[200px] lg:h-[250px]"
                  />
                </Link>
              </CardHeader>
              <CardContent className="p-4 text-center">
                <p className="font-semibold text-lg text-secondary">
                  Booth Code: {booth.booth_code}
                </p>
                <Link href={`/${size}-trade-show-booth/${booth.booth_code}`}>
                  <Button
                    style={{ transitionDuration: "500ms" }}
                    className="mt-4 bg-transparent transition-500 hover:bg-secondary border-2 border-[#B0CB1F] hover:border-secondary text-[#B0CB1F] hover:text-white px-6 py-2 font-bold text-sm"
                  >
                    Contact Us
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center mt-8" ref={loadingRef}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
        </div>
      )}

      {/* No more data indicator */}
      {!hasMore && booths.length > 0 && (
        <div className="text-center mt-8 text-gray-600">
          <p>No more booths to load</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && booths.length === 0 && !error && (
        <div className="text-center mt-8 text-gray-600">
          <p>No booths found for this size</p>
        </div>
      )}
    </div>
  );
};

export default BoothGrid;
