import React from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/ui/footer";
import "./styles.css";
import SubHeader from "@/components/ui/sub-header";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getAllBlogs, getSingleBlog } from "@/server/actions/blogs";

export async function generateMetadata({ params }) {
  const blog_slug = (await params).blog_id;

  const { data } = await getSingleBlog({ slug: blog_slug });

  return {
    title: data?.meta_title || "Default Title",
    description: data?.meta_description || "Default Description",
    keywords: data?.meta_keywords?.join(",") ?? "Default Keywords",
  };
}

const page = async ({ params }) => {
  const blog_slug = (await params).blog_id;

  const { data } = await getSingleBlog({ slug: blog_slug });
  console.log("==blog data==", data);

  const blogFromDb = await getAllBlogs();
  const blogsToBeMapped = blogFromDb.data.slice(0, 3);
  console.log("==blog from db ==", blogFromDb);
  const relatedBlogs = [
    {
      title: "2025: BIGGEST TRADE SHOWS IN VEGAS",
      imageUrl: "/what-we-do-2.png",
    },
    {
      title: "2025: BIGGEST TRADE SHOWS IN VEGAS",
      imageUrl: "/what-we-do-2.png",
    },
    {
      title: "2025: BIGGEST TRADE SHOWS IN VEGAS",
      imageUrl: "/what-we-do-2.png",
    },
    {
      title: "2025: BIGGEST TRADE SHOWS IN VEGAS",
      imageUrl: "/what-we-do-2.png",
    },
  ];
  return (
    <>
      <SubHeader />
      <Header />
      <div className="bg-[url('/blog-hero-bg-small.png')] grayscale-[70%] bg-cover bg-no-repeat px-20 text-white gap-4 h-[360px] justify-center items-center flex flex-col">
        <Image
          src={"/Book-open.png"}
          width={60}
          height={60}
          alt="location-bg"
          className="object-cover"
        />
        <h3 className="text-white heading-font text-[2.35rem] font-bold">
          MAXIMIZING THE USE OF SPACE IN TRADE SHOWS
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
                        href={`/blog/${index}`}
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
            <div className="mt-6 space-y-4 bg-white shadow-one p-10  rounded-lg flex flex-col justify-center items-center ">
              <div className="w-[98%] h-full bg-[#B0CB1F] rounded-lg py-2 ">
                <h3 className="text-2xl text-center heading-font text-secondary ">
                  ENQUIRY FORM
                </h3>
              </div>
              <form className="gap-6 w-full mt-2 pt-4 flex flex-col ">
                <Input
                  placeholder="Your Name"
                  className="w-full shadow-two py-2 border-0"
                />
                <Input
                  placeholder="Your Email"
                  className="w-full shadow-two py-2 border-0"
                />
                <Input
                  placeholder="Phone Number"
                  className="w-full shadow-two py-2 border-0"
                />
                <Input
                  type="file"
                  className="w-full shadow-two py-2 border-0"
                />
                <Input
                  placeholder="Event Name"
                  className="w-full shadow-two py-2 border-0 "
                />
                <Input
                  placeholder="Booth Size"
                  className="w-full shadow-two py-2 border-0"
                />
                <Textarea
                  placeholder="Tell us about your requirements"
                  className="w-full shadow-two py-2 border-0"
                  rows={3}
                />
                <Button
                  type="submit"
                  className=" bg-secondary hover:bg-white hover:text-secondary text-white shadow-one font-bold "
                >
                  View Portfolio
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default page;
