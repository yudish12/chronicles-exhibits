import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import Image from "next/image";
import React from "react";
import "./styles.css";
import Timer from "./_components/Timer";
import { Calendar, MapPin } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import recentShows from "../../../utils/constants/dev-data/trade-shows.json";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
import { Input } from "@/components/ui/input";
import Products from "@/app/(landing)/Products";
import { DiamondSvg } from "@/app/booth/size/[booth_size]/_components/TradeShowSection";
import { getAllData, getSingleEvent } from "@/server/actions/events";
import Head from "next/head";
import BoothSizeForm from "./_components/BoothSizeForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import WebsitePopup from "./_components/website-popup";
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const show_name = resolvedParams.show_name;

  const { data } = await getSingleEvent(show_name);
  return {
    title: data?.meta_title || "Default Title",
    description: data?.meta_description || "Default Description",
    keywords: data?.meta_keywords?.join(",") ?? "Default Keywords",
  };
}

const points = [
  "With hundreds of exhibiting companies and thousands of attendees, CES Las Vegas has unparalleled scale and reach within the industry.",
  "The massive event spans multiple large convention venues.",
  "International coverage by global press and media translates to huge brand exposure.",
  "Announcements at CES Las Vegas 2025 receive billions in free publicity that helps launch new products and companies.",
  "Attendees include top buyers, retailers, investors, and other influencers.",
  "It's a place for companies to showcase their goods, attract partners, and generate sales leads.",
  "Exhibiting gives lesser-known startups high-profile visibility alongside industry giants.",
  "The chance to be discovered at this stage can make or break a young company.",
  "For all exhibitors, the benefits include connecting with clients/partners, evaluating competitors face-to-face, gauging technological trends, and solidifying thought leadership status.",
  "Participation lends credibility to brands and allows them to test new ideas directly with their target audience before launching products globally.",
];

const Page = async ({ params }) => {
  const resolvedParams = await params;
  const show_name = resolvedParams.show_name;
  // let recentShows = await getAllData();
  // recentShows = recentShows.data.slice(0, 3);

  const data = await getSingleEvent(show_name);
  if (!data.data) {
    notFound();
  }
  console.group("event data", data);
  const date = new Date(data.data.start_date).toISOString().split("T")[0];
  const eventName = data.data.event_name;
  const eventCity = data.data.city;
  console.log("eventdata======", date, eventName, eventCity);

  console.log(data);
  const startDate = data.data.start_date;
  const targetDate = data.data.end_date;

  const isExpired = moment(targetDate).isBefore(moment());

  return (
    <>
      <Head>
        <title>{data?.meta_title || "Default Title"}</title>
      </Head>
      {/* <SubHeader /> */}
      <Header />
      <div className="detail-trade-show-bg flex flex-col items-center gap-8 px-6 sm:px-20 py-12">
        <h2 className=" text-4xl text-center text-white uppercase font-semibold heading-font">
          {data.data.event_name}
        </h2>
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
            <span className="text-xl">{data.data.city} | United States</span>
          </p>
          <p className="flex text-center items-center gap-4 mb-20 ">
            <Calendar color={isExpired ? "#FF0000" : "#FFFFFF"} />
            <span
              className={cn(
                "text-white font-semibold text-xl",
                isExpired && "text-red-600 line-through	"
              )}
            >
              {moment(startDate).format("DD")} {moment(startDate).format("MMM")}{" "}
              - {moment(targetDate).format("DD")}{" "}
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
        src={data.data.icon}
        alt={"show.title"}
      />
      <div className="flex flex-col px-6 sm:px-8 md:px-[40px] lg:flex-row lg:px-20 gap-12 py-12">
        <div className="w-full lg:w-[70%] bg-white sm:p-6 p-8  rounded-xl shadow-one">
          <h3 className="text-2xl heading-font text-secondary font-semibold">
            {data.data.title}
          </h3>
          <div
            id="show_name_desc"
            dangerouslySetInnerHTML={{ __html: data.data.body }}
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
              className="group cursor-pointer shadow-two hover:bg-[#B0CB1F]  bg-white border-secondary/70 p-6 flex items-center gap-5"
            >
              <Image src={"/email.svg"} width={30} height={30} alt="cube" />
              <Link
                href={"mailto:example@example.com"}
                style={{ transitionDuration: "500ms" }}
                className="text-secondary text-center text-lg heading-font font-semibold"
              >
                Contact E-mail
              </Link>
            </div>

            <WebsitePopup website={data.data.website} eventName={eventName} />
            <div
              style={{ transitionDuration: "500ms" }}
              className="group bg-white hover:bg-[#B0CB1F] cursor-pointer shadow-two   p-6 flex items-center gap-5"
            >
              <Image
                src={"/location-pin.svg"}
                width={30}
                height={30}
                alt="cube"
              />
              <h4
                style={{ transitionDuration: "500ms" }}
                className="text-secondary text-center text-lg heading-font font-semibold"
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
            {data.data.title}?
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
        title={data.data.booth_title ?? "Trade Show Booth Rental"}
        subTitle={
          data.data.booth_description ??
          "Chronicle Exhibits LLC. is the most famous trade show booth builder working since 2013. We build immersive brand experiences by providing complete exhibition stand management."
        }
        bgColor="white"
      />
      <Footer />
    </>
  );
};

export default Page;
