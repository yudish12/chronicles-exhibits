import React from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/ui/footer";
import "./styles.css";
import SubHeader from "@/components/ui/sub-header";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getAllBlogs, getSingleBlog } from "@/server/actions/blogs";
import BlogForm from "../_components/BlogForm";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const blog_slug = (await params).blog_id;

  const { data } = await getSingleBlog({ slug: blog_slug });

  return {
    title: data?.meta_title || "Default Title",
    description: data?.meta_description || "Default Description",
    keywords: data?.meta_keywords?.join(",") ?? "Default Keywords",
  };
}

const Blogpage = async ({ params }) => {
  const blog_slug = (await params).blog_id;
  console.log("~blog page" , params, blog_slug)
  const { data } = await getSingleBlog({ slug: blog_slug });
  console.log("==blog data==", data);
  if(!data){
    return notFound();
  }
  const blogFromDb = await getAllBlogs(
    null,
    data.blog_count,
    "name title slug image image_alt_text"
  );
  const blogsToBeMapped = blogFromDb.data;
  console.log(blogsToBeMapped);

  return (
    <>
      <SubHeader />
      <Header />
      <div className="booth-design-bg px-20 text-white gap-4 h-[360px] justify-center items-center flex flex-col">
        <h3 className="text-white text-center uppercase heading-font text-[2.35rem] font-bold">
          {data.title}
        </h3>
      </div>

      <div className="bg-background  text-gray-800 ">
        {/* Main Content Section */}
        <div className="px-20 w-full grid grid-cols-1 lg:grid-cols-3 gap-[40px] py-20 ">
          {/* Left Section */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <Image
              src={data.image}
              alt="Trade Show"
              width={800}
              height={600}
              className="w-full rounded-lg"
            />
            {/* Blog Content */}
            <div
              id="blog_content"
              dangerouslySetInnerHTML={{ __html: data.body }}
              className="mt-6 space-y-4 bg-white shadow-one px-10 py-14  rounded-lg "
            ></div>
          </div>

          {/* Right Section */}
          <div className="space-y-8 w-full">
            {/* Related Blogs */}
            <div className="flex flex-col justify-center items-center py-4">
              <h3 className="text-lg font-semibold py-2 text-[#B0CB1F]">
                Related Blogs
              </h3>
              <div className="space-y-8">
                {blogsToBeMapped.map((blog, index) => (
                  <Card
                    key={index}
                    className="shadow-one relative h-full w-full flex flex-col justify-between"
                  >
                    {/* Image Section */}
                    <div className="w-full border-b-2 border-primary">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        width={400}
                        height={200}
                        className="rounded-t-lg max-h-[155px] w-full object-cover"
                      />
                    </div>

                    {/* Title Section */}
                    <CardContent className="p-4 flex flex-col h-full">
                      <CardTitle className="text-[1.35rem] font-medium heading-font text-secondary text-center">
                        {blog.title}
                      </CardTitle>
                      <Link
                        className="self-center mt-2 h-full"
                        href={`/blog/${blog.slug}`}
                      >
                        <Button className="bg-white border-2 border-secondary text-secondary font-bold hover:bg-secondary hover:text-white">
                          Read More
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Enquiry Form */}
            <BlogForm />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Blogpage;
