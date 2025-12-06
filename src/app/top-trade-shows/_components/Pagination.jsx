import ClientLink from "@/components/ClientLink";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({ currentPage, totalPages }) => {
  // Validate and convert to numbers, with defaults
  const current = Math.max(1, Math.floor(Number(currentPage) || 1));
  const total = Math.max(1, Math.floor(Number(totalPages) || 1));

  // Don't render if invalid or only one page
  if (!total || total <= 1 || isNaN(current) || isNaN(total)) {
    return null;
  }

  // Ensure current doesn't exceed total
  const safeCurrent = Math.min(current, total);

  // Helper function to safely add a page number
  const addPage = (pages, pageNum) => {
    const num = Math.floor(Number(pageNum));
    if (!isNaN(num) && num >= 1 && num <= total) {
      pages.push(num);
    }
  };

  // Helper function to generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];

    // If total pages is 7 or less, show all pages
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        addPage(pages, i);
      }
      return pages;
    }

    // Always show first page
    addPage(pages, 1);

    if (safeCurrent <= 3) {
      // Show: 1, 2, 3, ..., lastPage
      addPage(pages, 2);
      addPage(pages, 3);
      if (total > 4) {
        pages.push("ellipsis-end");
      }
      if (total > 3) {
        addPage(pages, total);
      }
    } else if (safeCurrent >= total - 2) {
      // Show: 1, ..., last-2, last-1, last
      pages.push("ellipsis-start");
      for (let i = Math.max(2, total - 2); i <= total; i++) {
        addPage(pages, i);
      }
    } else {
      // Show: 1, ..., current-1, current, current+1, ..., lastPage
      pages.push("ellipsis-start");
      addPage(pages, safeCurrent - 1);
      addPage(pages, safeCurrent);
      addPage(pages, safeCurrent + 1);
      pages.push("ellipsis-end");
      addPage(pages, total);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Button */}
      {safeCurrent > 1 && (
        <ClientLink
          className="w-10 h-10 flex items-center text-secondary justify-center rounded-full border shadow-one bg-white hover:bg-gray-100 transition-colors"
          revalidate={true}
          link={`/top-trade-shows/?page=${safeCurrent - 1}`}
        >
          <div className="w-10 h-10 flex items-center text-secondary justify-center rounded-full border shadow-one bg-white hover:bg-gray-100 transition-colors">
            <ChevronLeft />
          </div>
        </ClientLink>
      )}

      {/* Page Numbers */}
      {pageNumbers
        .map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-10 h-10 flex items-center justify-center text-secondary"
              >
                ...
              </span>
            );
          }

          // Ensure page is a valid number
          const pageNum = Number(page);
          if (isNaN(pageNum) || pageNum < 1 || pageNum > total) {
            return null;
          }

          return (
            <ClientLink
              key={pageNum}
              link={`/top-trade-shows/?page=${pageNum}`}
              revalidate={true}
              className="w-10 h-10 flex items-center text-secondary justify-center rounded-full border shadow-one bg-white hover:bg-gray-100 transition-colors"
            >
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full shadow-one border-secondary border-0 transition-colors ${
                  pageNum === safeCurrent
                    ? "bg-secondary text-white"
                    : "bg-white text-secondary hover:bg-gray-100"
                }`}
              >
                {pageNum}
              </div>
            </ClientLink>
          );
        })
        .filter(Boolean)}

      {/* Next Button */}
      {safeCurrent < total && (
        <ClientLink
          className="w-10 h-10 flex items-center text-secondary justify-center rounded-full border shadow-one bg-white hover:bg-gray-100 transition-colors"
          revalidate={true}
          link={`/top-trade-shows/?page=${safeCurrent + 1}`}
        >
          <div className="w-10 h-10 flex items-center text-secondary justify-center rounded-full border shadow-one bg-white hover:bg-gray-100 transition-colors">
            <ChevronRight />
          </div>
        </ClientLink>
      )}
    </div>
  );
};
