import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pagination } from "./_components/Pagination";
import BlogDesc from "./blog-description";

const BlogsPagination = ({
  blogs,
  totalPages,
  currentPage,
  limit,
  pageData,
}) => {
  return (
    <>
      <div className="booth-design-bg px-6 sm:px-8 md:px-20 text-white gap-4 h-[360px] justify-center items-center flex flex-col">
        <h3 className="text-white heading-font text-[2.35rem] font-bold">
          {pageData.fields[0].value}
        </h3>
        <h4 className="text-xl md:mx-40 lg:mx-64 xl:mx-80 text-center heading-font text-white">
          {pageData.fields[1].value}
        </h4>
      </div>

      <div className="lg:px-20 md:px-12 sm:px-8 px-6 py-10 flex flex-col items-center justify-center bg-background">
        {/* Display blogs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {blogs.map((blog, index) => (
            <Card
              key={index}
              className="flex border max-w-[650px] 2xl:max-w-[740px] border-secondary flex-col bg-white/60 min-h-[250px] md:flex-row items-start shadow-two rounded-lg overflow-hidden py-2"
            >
              <div className="lg:w-[50%] xl:h-full min-h-[260px] sm:min-h-[20px] h-full lg:h-4/5 p-4">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={500}
                  height={350}
                  className="w-full h-full rounded-lg"
                  priority
                />
              </div>

              <div className="lg:w-[50%] h-full p-4 flex flex-col justify-between">
                <CardTitle className="text-2xl font-bold text-secondary heading-font">
                  {blog.title}
                </CardTitle>
                <BlogDesc body={blog.body} />
                <div className="mt-4">
                  <Link href={`/${blog.slug}/`} prefetch={true}>
                    <Button
                      variant="outline"
                      className="text-secondary font-bold bg-primary border-secondary hover:bg-primary border"
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
