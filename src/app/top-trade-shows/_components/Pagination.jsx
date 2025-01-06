import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export const Pagination = ({ currentPage, totalPages }) => {
 const getPages = ()=>{
    let pages=[];
    for(let i = 1;i<=totalPages;i++){
        pages.push(i);
    }
    return pages;
 }
 return (
    <>
    <div className="flex items-center justify-center mt-6 sm:gap-4 gap-x-2  ">
    {currentPage > 1 && (
        <Link
          href={`/top-trade-shows/?page=${currentPage - 1}`}
          className={`w-10 h-10 flex items-center text-secondary justify-center rounded-full border shadow-one bg-white hover:bg-gray-100`}
        >
          <ChevronLeft />
        </Link>
      )}
    {/* page numbers  */}
    {
        getPages().map((page)=>(
        <Link
        key={page}
        href={`top-trade-shows/?page=${page}`}
        className={`w-10 h-10 flex items-center justify-center rounded-full shadow-one border-secondary border-0 ${
            page === currentPage
              ? "bg-secondary text-white"
              : "bg-white text-secondary hover:bg-gray-100"
          }`}
        >
          {page}
        </Link>
        ))
    }

    {currentPage < totalPages && (
        <Link
          href={`/top-trade-shows/?page=${currentPage + 1}`}
          className={`w-10 h-10 flex items-center text-secondary justify-center rounded-full border shadow-one bg-white hover:bg-gray-100`}
        >
          <ChevronRight />
        </Link>
      )}
    </div>
    </>
 )
};