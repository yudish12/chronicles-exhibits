import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import tradeShows from "../../utils/constants/dev-data/trade-shows.json";
import React from "react";
import Image from "next/image";
import moment from "moment";
import Footer from "@/components/ui/footer";
import { MapPin, Calendar } from "lucide-react";
import RequestDesign from "../booth/size/[booth_size]/_components/RequestDesign";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <SubHeader />
      <Header />
      <div className="trade-show-bg px-20 flex justify-center items-center flex-col">
        <h2 className="text-[2.1rem] text-center text-white uppercase font-semibold heading-font">
          Top Trade Shows In USA
        </h2>
        <p className="text-center text-[17px] text-white mt-4 sm:mt-6 ">
          Trade shows, exhibitions, and conferences in the USA are effective
          platforms to strengthen your brand recognition value and take your
          business to the next level of success. Top trade shows in the USA
          offer excellent opportunities to make in-person connections through
          face-to-face interactions.
        </p>
      </div>
      <div className="bg-background px-20 py-12 flex flex-col items-center justify-center gap-4">
        <div className="flex gap-6 justify-center w-full">
          <input
            className="shadow-one w-[40%] placeholder:font-medium rounded-lg placeholder:text-secondary/60 px-4"
            placeholder="Search for upcoming trade shows"
          />
          <Button className="text-secondary font-semibold bg-white hover:bg-secondary hover:text-white transition-all py-5 shadow-one">
            Search
          </Button>
        </div>
        <p className="text-[17px] text-center">
          The following trade show directory can be a valuable branding and
          marketing tool for your business. It comprises some of the biggest
          trade shows in the USA across various industries. Explore and identify
          top trade shows in the USA that can drive your brand to get ahead of
          your competition.
        </p>

        <div className="grid lg:grid-cols-[290px,290px,290px,290px] md:grid-cols-3 gap-x-12 gap-y-12 sm:grid-cols-2 gap-4 px-20 mt-12">
          {tradeShows.map((show) => (
            <div
              key={show.id}
              className="h-[360px] bg-white flex shadow-one rounded-xl flex-col gap-5 items-center p-6"
            >
              <h4 className="text-secondary heading-font text-2xl uppercase font-semibold">
                {show.title}
              </h4>
              <Image
                className="rounded-full"
                width={120}
                height={120}
                src={show.image}
                alt={show.title}
              />
              <div className="flex flex-col gap-2 w-full px-4">
                <p className="flex gap-4">
                  <MapPin color="#B0CB1F" />
                  <span className="text-[16px]">{show.location}</span>
                </p>
                <p className="flex  gap-4">
                  <Calendar color="#B0CB1F" />
                  <span className="text-[16px]">
                    {moment(show.start_date).format("DD")}-
                    {moment(show.end_date).format("DD")}{" "}
                    {moment(show.start_date).format("MMMM")}{" "}
                    {moment(show.end_date).format("YYYY")}
                  </span>
                </p>
              </div>
              <Link className="w-full" href={"/trade-show"}>
                <Button
                  variant="outline"
                  className="text-secondary w-full hover:bg-secondary hover:text-white border-secondary border-2 bg-transparent font-semibold py-[18px] text-[16px]"
                >
                  View Details
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
