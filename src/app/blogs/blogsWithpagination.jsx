"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination } from "./_components/Pagination";
import { useRouter } from "next/navigation";

const BlogsPagination = ({ blogs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Number of blogs per page
  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const router = useRouter();
  // Slice the blogs array to get the items for the current page
  const paginatedBlogs = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // const actionCallforPagination = async () => {
  //   //fetch blogs from server action

  // };

  // useEffect(() => {
  //   actionCallforPagination();
  // }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="bg-[url('/blog-hero-bg-small.png')] grayscale-[70%] bg-cover bg-no-repeat px-20 text-white gap-4 h-[360px] justify-center items-center flex flex-col">
        <Image
          src={"/Book-open.png"}
          width={60}
          height={60}
          alt="location-bg"
          className="object-cover"
        />
        <h3 className="text-white heading-font text-[2.35rem] font-bold">
          BLOG
        </h3>
      </div>

      <div className="px-20 py-10 flex flex-col items-center justify-center bg-background">
        <h2 className="text-xl text-[#B0CB1F] font-bold pt-[60px] pb-10">
          Blog Directory
        </h2>

        {/* Display paginated blogs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paginatedBlogs.map((blog, index) => (
            <Card
              key={index}
              className="flex flex-col bg-white/60 h-[230px] md:flex-row items-start shadow-two rounded-lg overflow-hidden py-2"
            >
              <div className="md:w-[45%] h-full p-4">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={500}
                  height={350}
                  className="w-full h-full object-cover rounded-lg"
                  priority
                />
              </div>

              <div className="md:w-[55%] h-full p-4 flex flex-col">
                <CardTitle className="text-2xl font-bold text-secondary heading-font">
                  {blog.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 mt-2">
                  {/* {blog.description} */}
                  Welcome to Chronicle, your prominent partner for trade show
                  booth displays and exhibits. With 25+ years’ worth of
                  experience and an excellent team
                </CardDescription>
                <div className="mt-4">
                  <Button
                    onClick={() => router.push(`/blogs/${blog.slug}`)}
                    variant="outline"
                    className="text-secondary font-bold bg-transparent border-2 border-secondary hover:bg-secondary hover:text-white"
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default BlogsPagination;
