import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getAllBlogs, getSingleBlog } from "@/server/actions/blogs";
import { getSingleEvent } from "@/server/actions/events";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Timer from "../top-trade-shows/[show_name]/_components/Timer";
import { Calendar, MapPin } from "lucide-react";
import BoothSizeForm from "../top-trade-shows/[show_name]/_components/BoothSizeForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Products from "../(landing)/Products";
import BlogForm from "../blogs/_components/BlogForm";
import "../top-trade-shows/[show_name]/styles.css";
import "../blogs/[blog_id]/styles.css";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import WebsitePopup from "../top-trade-shows/[show_name]/_components/website-popup";
// if blog and event both are not found , then return 404

export async function generateMetadata({ params }) {
  const slug = (await params).slug;

  const { data } = await getSingleBlog({ slug: slug });

  if (data){
    return {
      title: data?.meta_title || "Default Title",
      description: data?.meta_description || "Default Description",
      keywords: data?.meta_keywords?.join(",") ?? "Default Keywords",
      alternates: {
        canonical: `https://chronicleexhibits.com/${slug}`,
      }
    };
  }

  const { data: eventData } = await getSingleEvent(slug);

  return {
    title: eventData?.meta_title || "Default Title",
    description: eventData?.meta_description || "Default Description",
    keywords: eventData?.meta_keywords?.join(",") ?? "Default Keywords",
    alternates: {
      canonical: `https://chronicleexhibits.com/${slug}`,
    }
  };
}

const Page = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const { data } = await getSingleBlog({ slug: slug });

  if (data) {
    const blogFromDb = await getAllBlogs(
      null,
      data.blog_count,
      "name title slug image image_alt_text"
    );
    const blogsToBeMapped = blogFromDb.data;

    return (
      <>
        <div className="booth-design-bg md:px-12 sm:px-8 px-6 lg:px-20 text-white gap-4 h-[360px] justify-center items-center flex flex-col">
          <h1 className="text-white text-center uppercase heading-font text-[2.35rem] font-bold">
            {data.title}
          </h1>
        </div>

        <div className="bg-background  text-gray-800 ">
          {/* Main Content Section */}
          <div className="px-4 sm:px-12  lg:px-20 w-full grid grid-cols-1 lg:grid-cols-3 gap-[40px] py-20 ">
            {/* Left Section */}
            <div className="lg:col-span-2">
              {/* Hero Image */}
              <Image
                src={data.image}
                alt="Trade Show"
                width={800}
                height={600}
                className="w-full max-h-[500px] rounded-lg"
              />
              {/* Blog Content */}
              <div
                id="blog_content"
                dangerouslySetInnerHTML={{ __html: data.body }}
                className="mt-6 space-y-4 bg-white shadow-one px-4 sm:px-6 lg:px-10 py-14  rounded-lg "
              ></div>
            </div>

            <div className="w-full">
              {/* Related Blogs */}
              <div className="flex flex-col  justify-center items-center py-4">
                <h3 className="text-2xl font-semibold py-2 text-[#B0CB1F]">
                  Related Blogs
                </h3>
                <div className="gap-x-6 gap-y-6 lg:block grid grid-cols-1 sm:grid-cols-2">
                  {blogsToBeMapped.map((blog, index) => (
                    <Card
                      key={index}
                      className="shadow-one lg:mt-4 relative h-full lg:max-w-[350px] w-full 2xl:max-w-[420px] flex flex-col justify-between grid-cols-1"
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
                          href={`/${blog.slug}`}
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
      </>
    );
  }

  const { data: eventData } = await getSingleEvent(slug);
  console.log(eventData);
  if (eventData) {
    console.group("event data", eventData.start_date);
    const date = new Date(eventData.start_date).toISOString().split("T")[0];
    const eventName = eventData.event_name;
    const eventCity = eventData.city;
    console.log("eventdata======", date, eventName, eventCity);

    console.log(data);
    const startDate = eventData.start_date;
    const targetDate = eventData.end_date;

    const isExpired = moment(targetDate).isBefore(moment());
    return (
      <>
        <div className="detail-trade-show-bg flex flex-col items-center gap-8 px-6 sm:px-20 py-12">
          <h1 className=" text-4xl text-center text-white uppercase font-semibold heading-font">
            {eventData.event_name}
          </h1>
          {!isExpired ? (
            <Timer targetDate={startDate} />
          ) : (
            <span className="text-red-600 font-semibold text-4xl">
              No Date Announced Yet
            </span>
          )}
          <div className="flex flex-col w-full items-center gap-2">
            <p className="flex text-center gap-4 items-center text-white font-semibold">
              <MapPin color="#FFFFFF" />
              <span className="text-xl">{eventData.city} | United States</span>
            </p>
            <p className="flex text-center items-center gap-4 mb-20 ">
              <Calendar color={isExpired ? "#FF0000" : "#FFFFFF"} />
              <span
                className={cn(
                  "text-white font-semibold text-xl",
                  isExpired && "text-red-600 line-through	"
                )}
              >
                {moment(startDate).format("DD")}{" "}
                {moment(startDate).format("MMM")} -{" "}
                {moment(targetDate).format("DD")}{" "}
                {moment(targetDate).format("MMM")}{" "}
                {moment(targetDate).format("YYYY")}
              </span>
            </p>
          </div>
        </div>
        <Image
          className="rounded-full shadow-xl border-white border-[6px] mx-auto mt-[-80px] z-10"
          width={170}
          height={170}
          src={eventData.icon}
          alt={"show.title"}
        />
        <div className="flex flex-col px-[40px] lg:flex-row lg:px-20 gap-12 py-12">
          <div className="w-full lg:w-[70%] bg-white sm:p-6 p-8  rounded-xl shadow-one">
            <h2 className="text-2xl heading-font text-secondary font-semibold">
              {eventData.title}
            </h2>
            <div
              id="show_name_desc"
              dangerouslySetInnerHTML={{ __html: eventData.body }}
            ></div>
          </div>
          <div className="w-full lg:w-[30%] flex flex-col gap-6">
            <BoothSizeForm
              eventName={eventName}
              eventCity={eventCity}
              date={date}
            />

            <div className="grid grid-cols-1 gap-y-6 border-secondary/70">
              <div
                style={{ transitionDuration: "500ms" }}
                className="group cursor-pointer transition-500 shadow-two hover:bg-[#B0CB1F]  bg-white border-secondary/70 p-6 flex items-center gap-5"
              >
                <Image src={"/email.svg"} width={30} height={30} alt="cube" />
                <Link
                  href={"mailto:example@example.com"}
                  style={{ transitionDuration: "500ms" }}
                  className="text-secondary transition-500 text-center text-lg heading-font font-semibold"
                >
                  Contact E-mail
                </Link>
              </div>

              <WebsitePopup website={eventData.website} eventName={eventName} />
              <div
                style={{ transitionDuration: "500ms" }}
                className="group bg-white transition-500 hover:bg-[#B0CB1F] cursor-pointer shadow-two   p-6 flex items-center gap-5"
              >
                <Image
                  src={"/location-pin.svg"}
                  width={30}
                  height={30}
                  alt="cube"
                />
                <h4
                  style={{ transitionDuration: "500ms" }}
                  className="text-secondary transition-500 text-center text-lg heading-font font-semibold"
                >
                  {eventCity} | USA
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full  product-bg flex flex-col items-center justify-center py-14 px-4 text-center">
          <div className="font-bold text-lg md:text-xl pt-10 text-primary">
            Are you looking for turnkey trade show booth services for
            <br />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl uppercase heading-font text-white font-bold pt-10">
              {eventData.title}?
            </h2>
          </div>
          <div className="py-10">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-transparent rounded-xl text-base sm:text-lg border-2 border-primary hover:bg-[#B0CB1F] px-6 py-4 sm:py-5 font-bold text-primary transition-all duration-300 hover:text-secondary">
                  Get Quote
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full">
                <BoothSizeForm eventCity={eventCity} eventName={eventName} date={startDate} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <Products
          title={eventData.booth_title ?? "Trade Show Booth Rental"}
          subTitle={
            eventData.booth_description ??
            "Chronicle Exhibits LLC. is the most famous trade show booth builder working since 2013. We build immersive brand experiences by providing complete exhibition stand management."
          }
          bgColor="white"
        />
      </>
    );
  }

  return notFound();
};

export default Page;
