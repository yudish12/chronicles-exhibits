import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import Image from "next/image";
import React from "react";
import Timer from "./_components/Timer";
import { Calendar, MapPin } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import recentShows from "../../../utils/constants/dev-data/trade-shows.json";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";

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

const DiamondSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="16"
      height="16"
    >
      <polygon
        points="50,0 100,50 50,100 0,50"
        fill="#B0CB1F"
        stroke="#B0CB1F"
        strokeWidth="2"
      />
    </svg>
  );
};

const Page = () => {
  const targetDate = "2024-12-31T23:59:59";
  recentShows = recentShows.slice(0, 3);
  return (
    <>
      <SubHeader />
      <Header />
      <div className="trade-show-bg flex flex-col items-center gap-8 px-20 py-12">
        <h2 className=" text-4xl text-center text-white uppercase font-semibold heading-font">
          The Asi Show
        </h2>
        <Timer targetDate={targetDate} />
        <div className="flex flex-col w-full items-center gap-2">
          <p className="flex text-center gap-4 items-center text-white font-semibold">
            <MapPin color="#FFFFFF" />
            <span className="text-xl">New York | NY</span>
          </p>
          <p className="flex text-center items-center gap-4">
            <Calendar color="#FFFFFF" />
            <span className=" text-white font-semibold text-xl">
              {moment(targetDate).format("DD")}-
              {moment(targetDate).format("DD")}{" "}
              {moment(targetDate).format("MMMM")}{" "}
              {moment(targetDate).format("YYYY")}
            </span>
          </p>
        </div>
      </div>
      <Image
        className="rounded-full shadow-xl border-white border-[6px] mx-auto mt-[-80px] z-10"
        width={170}
        height={170}
        src={"/aaep-show.png"}
        alt={"show.title"}
      />
      <div className="px-20 gap-12 py-12 flex">
        <div className="w-[70%] bg-white p-6 rounded-xl shadow-one">
          <h3 className="text-3xl heading-font text-secondary font-semibold">
            About: The ASI Show 2025
          </h3>
          <p className="text-[16px] mt-4 leading-[26px]">
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
          </ul>
        </div>
        <div className="flex flex-col gap-8 items-center">
          <div className="h-[320px] w-[350px] bg-white flex shadow-one rounded-xl flex-col gap-5 items-center p-6">
            <h4 className="text-secondary heading-font text-2xl uppercase font-semibold">
              The ASI Show 2025
            </h4>
            <Image
              className="rounded-full"
              width={120}
              height={120}
              src={"/aaep-show.png"}
              alt={"show.title"}
            />
            <div className="flex flex-col items-center gap-2 w-full px-4">
              <p className="flex gap-2">
                <MapPin color="#B0CB1F" />
                <span className="text-[16px]">New York | NY</span>
              </p>
              <p className="flex  gap-2">
                <Calendar color="#B0CB1F" />
                <span className="text-[16px]">
                  {moment(targetDate).format("DD")}-
                  {moment(targetDate).format("DD")}{" "}
                  {moment(targetDate).format("MMMM")}{" "}
                  {moment(targetDate).format("YYYY")}
                </span>
              </p>
            </div>
          </div>

          <div className="w-full">
            <h4 className="text-secondary text-center heading-font font-semibold text-2xl">
              RELATED TRADE SHOWS
            </h4>
            {recentShows.map((e, ind) => (
              <div
                key={ind}
                className="bg-white flex shadow-one rounded-xl p-6 mt-8"
              >
                <Image
                  src={"/aaep-show.png"}
                  alt="show.title"
                  width={80}
                  height={80}
                />
                <div className="w-full">
                  <h4 className="text-xl text-center font-semibold heading-font">
                    AAEP 25 ORLANDO
                  </h4>
                  <Link
                    className="w-4/5 flex justify-center mt-3 mx-auto"
                    href={"/trade-show"}
                  >
                    <Button
                      variant="outline"
                      className="text-secondary w-4/5 hover:bg-secondary hover:text-white border-secondary border-2 bg-transparent font-semibold py-[12px] text-[16px]"
                    >
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
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
      <Footer />
    </>
  );
};

export default Page;
