import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export const Pagination = ({ currentPage, totalPages }) => {
  // Helper function to create an array of page numbers
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {/* Previous Button */}
      {currentPage > 1 && (
        <Link
          href={`/blogs/?page=${currentPage - 1}`}
          className={`w-10 h-10 flex items-center text-secondary justify-center rounded-full border shadow-one bg-white hover:bg-gray-100`}
        >
          <ChevronLeft />
        </Link>
      )}

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <Link
          key={page}
          href={`/blogs/?page=${page}`}
          className={`w-10 h-10 flex items-center justify-center rounded-full shadow-one border-secondary border-0 ${
            page === currentPage
              ? "bg-secondary text-white"
              : "bg-white text-secondary hover:bg-gray-100"
          }`}
        >
          {page}
        </Link>
      ))}

      {/* Next Button */}
      {currentPage < totalPages && (
        <Link
          href={`/blogs/?page=${currentPage + 1}`}
          className={`w-10 h-10 flex items-center text-secondary justify-center rounded-full border shadow-one bg-white hover:bg-gray-100`}
        >
          <ChevronRight />
        </Link>
      )}
    </div>
  );
};
