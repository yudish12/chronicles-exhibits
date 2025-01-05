import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination } from "./_components/Pagination";

const BlogsPagination = ({ blogs, totalPages, currentPage, limit }) => {
  return (
    <>
      <div className="booth-design-bg px-20 text-white gap-4 h-[360px] justify-center items-center flex flex-col">
        <h3 className="text-white heading-font text-[2.35rem] font-bold">
          LATEST BLOGS
        </h3>
        <h4 className="text-xl mx-80 text-center heading-font text-white">
          Save your preferred trade show booth rental with Chronicle Exhibits
          LLC
        </h4>
      </div>

      <div className="px-20 py-10 flex flex-col items-center justify-center bg-background">
        {/* Display blogs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog, index) => (
            <Card
              key={index}
              className="flex border border-secondary flex-col bg-white/60 min-h-[230px] md:flex-row items-start shadow-two rounded-lg overflow-hidden py-2"
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

              <div className="md:w-[55%] h-full p-4 flex flex-col justify-between">
                <CardTitle className="text-2xl font-bold text-secondary heading-font">
                  {blog.title}
                </CardTitle>
                <CardDescription className="text-sm text-black mt-2">
                  {/* Shortened blog description */}
                  Welcome to Chronicle, your prominent partner for trade show
                  booth displays and exhibits. With 25+ years’ worth of
                  experience and an excellent team
                </CardDescription>
                <div className="mt-4">
                  <Link href={`/${blog.slug}/`} prefetch={true}>
                    <Button
                      variant="outline"
                      className="text-secondary font-bold bg-primary border-2 border-secondary hover:bg-primary border"
                    >
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination Component */}
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </>
  );
};

export default BlogsPagination;
