"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const BoothGrid = ({ size }) => {
  const [boothCodes, setBoothCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const observerRef = useRef();
  const loadingRef = useRef();

  const fetchBoothCodes = useCallback(
    async (pageNum) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/booths?size=${size}&page=${pageNum}&limit=9`
        );
        const result = await response.json();

        if (result.success) {
          const booths = result.data.booths.map((booth) => ({
            _id: booth._id,
            booth_code: booth.booth_code,
            thumbnail_image: booth.thumbnail_image,
            image_alt_text: booth.image_alt_text || `Booth ${booth.booth_code}`,
          }));

          if (pageNum === 1) {
            setBoothCodes(booths);
          } else {
            setBoothCodes((prev) => [...prev, ...booths]);
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
    setPage(1);
    setBoothCodes([]);
    setHasMore(true);
    fetchBoothCodes(1);
  }, [size, fetchBoothCodes]);

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
              fetchBoothCodes(nextPage);
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
    [loading, hasMore, fetchBoothCodes]
  );

  if (error) {
    return (
      <div className="py-12 bg-gradient-to-b bg-background">
        <h2 className="text-center text-xl md:text-3xl font-bold text-[#B0CB1F] py-2">
          Similar Booth Size Designs
        </h2>
        <div className="max-w-[1200px] mx-auto px-6 mt-6">
          <div className="text-center text-red-600">
            <p>Error: {error}</p>
            <Button
              onClick={() => {
                setPage(1);
                setBoothCodes([]);
                fetchBoothCodes(1);
              }}
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
    <div className="py-12 bg-gradient-to-b bg-background">
      {/* Title and Subtitle */}
      <h2 className="text-center text-xl md:text-3xl font-bold text-[#B0CB1F] py-2">
        Similar Booth Size Designs
      </h2>

      {/* Booth Grid */}
      <div className="grid mt-6 grid-cols-1 px-6 lg:p-0 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 place-items-center place-content-center max-w-[1200px] mx-auto">
        {boothCodes.map((booth, index) => {
          const isLastElement = index === boothCodes.length - 1;

          return (
            <Card
              key={booth._id || index}
              ref={isLastElement ? lastElementRef : null}
              className="shadow-one rounded-lg overflow-hidden lg:w-[380px] w-full"
            >
              <CardHeader className="p-0">
                <Link href={`/${size}-trade-show-booth/${booth.booth_code}`}>
                  <Image
                    loading="lazy"
                    height={250}
                    width={378}
                    src={booth.thumbnail_image}
                    alt={booth.image_alt_text}
                    className="w-full lg:h-[250px] h-[220px]"
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
                    Customize Now!
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
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B0CB1F]"></div>
        </div>
      )}

      {/* Empty state */}
      {!loading && boothCodes.length === 0 && !error && (
        <div className="text-center mt-8 text-gray-600">
          <p>No booths found for this size</p>
        </div>
      )}
    </div>
  );
};

export default BoothGrid;
