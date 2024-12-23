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
  console.log(data);
  const startDate = data.data.start_date;
  const targetDate = data.data.end_date;

  return (
    <>
      <Head>
        <title>{data?.meta_title || "Default Title"}</title>
      </Head>
      <SubHeader />
      <Header />
      <div className="trade-show-bg flex flex-col items-center gap-8 px-20 py-12">
        <h2 className=" text-4xl text-center text-white uppercase font-semibold heading-font">
          {data.data.title}
        </h2>
        <Timer targetDate={targetDate} />
        <div className="flex flex-col w-full items-center gap-2">
          <p className="flex text-center gap-4 items-center text-white font-semibold">
            <MapPin color="#FFFFFF" />
            <span className="text-xl">
              {data.data.city} | {data.data.city.slice(0, 2).toUpperCase()}
            </span>
          </p>
          <p className="flex text-center items-center gap-4">
            <Calendar color="#FFFFFF" />
            <span className=" text-white font-semibold text-xl">
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
      <div className="px-20 gap-12 py-12 flex">
        <div className="w-[70%] bg-white p-6 rounded-xl shadow-one">
          <h3 className="text-3xl heading-font text-secondary font-semibold">
            About: {data.data.title}
          </h3>
          <div
            id="show_name_desc"
            dangerouslySetInnerHTML={{ __html: data.data.body }}
          ></div>
          {/* <p className="text-[16px] mt-4 leading-[26px]">
            The Live Design International (LDI) is a major conference and trade
            show for professionals in the live entertainment industry, including
            lighting designers, sound technicians, stage designers, and more. It
            provides attendees opportunities to learn, see the latest in event
            technologies, network, and conduct business. The event features a
            wide range of educational programming, networking events, and
            showcases of the latest technology and equipment in the industry.
            The event is going to take place in Las Vegas, Nevada, the United
            States , between 8-10 Dec 2024 .<br />
            <br />
            LDI attracts over 22,000 attendees, including producers, event
            planners, architects, designers, technicians, engineers, and more
            who work in live event production. Over 600 exhibitors showcase the
            latest products, technologies, and services for live events in areas
            like lighting, audio, staging, rigging, video, special effects, and
            more. Networking opportunities abound, allowing attendees to meet
            and interact with their peers in the industry. Educational sessions
            and workshops cover topics related to designing, producing, and
            executing live events effectively.If you are looking for a exhibit
            design companies las vegas you can contact us.
          </p>
          <h3 className="text-3xl mt-6 heading-font text-secondary font-semibold">
            Benefits of attending the ASI Show
          </h3>
          <ul className=" mt-3">
            {points.map((e, ind) => (
              <li key={ind} className="flex items-start gap-3 py-2 ">
                <div className="mt-1">
                  <DiamondSvg />
                </div>
                <span>{e}</span>
              </li>
            ))}
          </ul> */}
        </div>
        <div className="w-[30%] flex flex-col gap-6">
          <div className="shadow-one h-max bg-white p-6 rounded-xl w-full">
            <p className="text-center text-secondary">
              Need exhibit displays for the ASI Show?Reach out to us for a
              hassle-free experience.
            </p>
            <h5 className="text-3xl mt-4 text-center font-semibold heading-font text-secondary">
              Enquiry Form
            </h5>
            <div className="mt-4 flex flex-col gap-5">
              <Input
                className="border-secondary/70 text-secondary placeholder:text-secondary/70"
                type="text"
                placeholder="Enter Your Name"
              />
              <Input
                className="border-secondary/70 text-secondary/70 placeholder:text-secondary/70"
                type="email"
                placeholder="Enter Your Email"
              />
              <Input
                className="border-secondary/70 text-secondary/70 placeholder:text-secondary/70"
                type="number"
                placeholder="Enter Your Phone Number"
              />
              <Input
                className="border-secondary/70 text-secondary/70 placeholder:text-secondary/70"
                type="file"
                placeholder="Choose A File"
              />
              <Input
                className="border-secondary/70 text-secondary/70 placeholder:text-secondary/70"
                placeholder="Booth Size"
              />
              <Input
                className="border-secondary/70 text-secondary/70 placeholder:text-secondary/70"
                placeholder="Enter Event Name"
              />
              <textarea
                rows={4}
                className="border p-2 border-secondary/70 placeholder:text-secondary/70 rounded-lg"
                placeholder="Message"
              />
              <Button className="w-1/3 mx-auto bg-transparent border-2 border-secondary text-secondary hover:text-white font-semibold py-2 rounded hover:bg-secondary ">
                Get Quote
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 border-2 border-dashed border-secondary/70 rounded-lg">
            <div
              style={{ transitionDuration: "500ms" }}
              className="group bg-white border-r-2 border-b-2 border-dashed border-secondary/70 hover:bg-secondary p-6 flex flex-col items-center gap-5 rounded-tl-lg"
            >
              <Image
                src={"/layers-stacked.svg"}
                width={30}
                height={30}
                alt="cube"
              />
              <h4
                style={{ transitionDuration: "500ms" }}
                className="text-secondary group-hover:text-white text-center text-lg heading-font font-semibold"
              >
                New York
                <br />
                USA
              </h4>
            </div>
            <div
              style={{ transitionDuration: "500ms" }}
              className="group bg-white border-b-2 border-dashed border-secondary/70 hover:bg-secondary p-6 flex flex-col items-center gap-5 rounded-tr-lg"
            >
              <Image
                src={"/layers-stacked.svg"}
                width={30}
                height={30}
                alt="cube"
              />
              <h4
                style={{ transitionDuration: "500ms" }}
                className="text-secondary group-hover:text-white text-center text-lg heading-font font-semibold"
              >
                {moment(startDate).format("DD")}{" "}
                {moment(startDate).format("MMM")} -{" "}
                {moment(targetDate).format("DD")}{" "}
                {moment(targetDate).format("MMM")}{" "}
                {moment(targetDate).format("YYYY")}
              </h4>
            </div>
            <div
              style={{ transitionDuration: "500ms" }}
              className="group bg-white  border-r-2 border-dashed border-secondary/70 hover:bg-secondary p-6 flex flex-col items-center gap-5 rounded-bl-lg"
            >
              <Image
                src={"/layers-stacked.svg"}
                width={30}
                height={30}
                alt="cube"
              />
              <h4
                style={{ transitionDuration: "500ms" }}
                className="text-secondary group-hover:text-white text-center text-lg heading-font font-semibold"
              >
                Official Website
              </h4>
            </div>
            <div
              style={{ transitionDuration: "500ms" }}
              className="group bg-white hover:bg-secondary p-6 flex flex-col items-center gap-5 rounded-br-lg"
            >
              <Image
                src={"/layers-stacked.svg"}
                width={30}
                height={30}
                alt="cube"
              />
              <h4
                style={{ transitionDuration: "500ms" }}
                className="text-secondary group-hover:text-white text-center text-lg heading-font font-semibold"
              >
                New York
                <br />
                USA
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full product-bg flex flex-col items-center justify-center py-14 px-4 text-center">
        <div className="font-bold text-lg md:text-xl pt-10 text-[#B0CB1F]">
          Want your booth in one of these trade shows?
        </div>
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl uppercase heading-font text-white font-bold pt-10">
          Contact us for a fully personalized trade fair experience.
        </div>
        <div className="py-10">
          <Button className="bg-transparent rounded-xl text-base sm:text-lg border-2 border-[#B0CB1F] hover:bg-[#B0CB1F] px-6 py-4 sm:py-6 font-bold text-[#B0CB1F] transition-all duration-300 hover:text-secondary">
            Get Customized Quote
          </Button>
        </div>
      </div>
      <Products />
      <Footer />
    </>
  );
};

export default Page;
