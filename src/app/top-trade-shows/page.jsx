import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import tradeShows from "../../utils/constants/dev-data/trade-shows.json";
import React from "react";
import Image from "next/image";
import moment from "moment";
import Footer from "@/components/ui/footer";
import { Bell, MapPin, Calendar } from "lucide-react";
import RequestDesign from "../booth/size/[booth_size]/_components/RequestDesign";

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
      <div className="bg-background p-20 flex flex-col items-center justify-center gap-4">
        <h3 className="uppercase text-[2.1rem] font-semibold heading-font text-secondary text-center ">
          upcoming trade show directory
        </h3>
        <p className="text-[17px] text-center">
          The following trade show directory can be a valuable branding and
          marketing tool for your business. It comprises some of the biggest
          trade shows in the USA across various industries. Explore and identify
          top trade shows in the USA that can drive your brand to get ahead of
          your competition.
        </p>
        <div className="flex gap-6 justify-center w-full mt-8">
          <input
            className="shadow-one w-[40%] placeholder:font-medium rounded-lg placeholder:text-secondary/60 px-4"
            placeholder="Search for upcoming trade shows"
          />
          <Button className="text-secondary font-semibold bg-white hover:bg-secondary hover:text-white transition-all py-5 shadow-one">
            Search
          </Button>
        </div>
        <div className="grid lg:grid-cols-[290px,290px,290px,290px] md:grid-cols-3 gap-x-12 gap-y-12 sm:grid-cols-2 gap-4 px-20 mt-12">
          {tradeShows.map((show) => (
            <div
              key={show.id}
              className="h-[380px] bg-white flex shadow-one rounded-xl flex-col gap-5 items-center p-6"
            >
              <h4 className="text-secondary heading-font text-2xl uppercase font-semibold">
                {show.title}
              </h4>
              <Image
                className="rounded-full"
                width={140}
                height={140}
                src={show.image}
                alt={show.title}
              />
              <div className="flex flex-col gap-2 w-full px-4">
                <p className="flex  gap-4">
                  <Calendar color="#B0CB1F" />
                  <span className="text-[16px]">
                    {moment(show.start_date).format("DD")}-
                    {moment(show.end_date).format("DD")}{" "}
                    {moment(show.start_date).format("MMMM")}{" "}
                    {moment(show.end_date).format("YYYY")}
                  </span>
                </p>
                <p className="flex gap-4">
                  <MapPin color="#B0CB1F" />
                  <span className="text-[16px]">{show.location}</span>
                </p>
              </div>
              <Button
                variant="outline"
                className="text-secondary w-full hover:bg-secondary hover:text-white border-secondary border-2 bg-transparent font-semibold py-[18px] text-[16px]"
              >
                View Details
              </Button>
            </div>
          ))}
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
