import ClientLink from "@/components/ClientLink";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export const Pagination = ({ currentPage, totalPages }) => {
  const getPages = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };
  return (
    <>
      <div className="flex items-center justify-center mt-6 sm:gap-4 gap-x-2  ">
        {currentPage > 1 && (
          <ClientLink
            revalidate={true}
            link={`/top-trade-shows/?page=${currentPage - 1}`}
          >
            <div
              className={`w-10 h-10 flex items-center text-secondary justify-center rounded-full border shadow-one bg-white hover:bg-gray-100`}
            >
              <ChevronLeft />
            </div>
          </ClientLink>
        )}
        {/* page numbers  */}
        {getPages().map((page) => (
          <ClientLink
            key={page}
            link={`/top-trade-shows/?page=${page}`}
            revalidate={true}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full shadow-one border-secondary border-0 ${
                page === currentPage
                  ? "bg-secondary text-white"
                  : "bg-white text-secondary hover:bg-gray-100"
              }`}
            >
              {page}
            </div>
          </ClientLink>
        ))}

        {currentPage < totalPages && (
          <ClientLink
            revalidate={true}
            link={`/top-trade-shows/?page=${currentPage + 1}`}
          >
            <div
              className={`w-10 h-10 flex items-center text-secondary justify-center rounded-full border shadow-one bg-white hover:bg-gray-100`}
            >
              <ChevronRight />
            </div>
          </ClientLink>
        )}
      </div>
    </>
  );
};
