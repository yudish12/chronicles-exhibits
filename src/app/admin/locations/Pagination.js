import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Handle next and previous actions
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 4) {
      // Show all pages if total pages are 4 or less
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show 4 pages at a time with "..."
      if (currentPage > 2) {
        pageNumbers.push(1); // Always show the first page
        if (currentPage > 3) {
          pageNumbers.push("..."); // Add "..." before the range
        }
      }

      const start = Math.max(2, currentPage - 1); // Start from one before current
      const end = Math.min(totalPages - 1, currentPage + 1); // End at one after current

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) {
          pageNumbers.push("..."); // Add "..." after the range
        }
        pageNumbers.push(totalPages); // Always show the last page
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      {/* Previous Button */}
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={handlePrevious}
      >
        <ChevronLeft />
      </Button>

      {/* Page Numbers */}
      {renderPageNumbers().map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-4 py-2 text-gray-500 cursor-default">
            ...
          </span>
        ) : (
          <Button
            key={index}
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => onPageChange(page)}
            className="font-bold text-xl"
          >
            {page}
          </Button>
        )
      )}

      {/* Next Button */}
      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={handleNext}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};
