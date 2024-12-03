import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import React from "react";

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
        <div className="flex gap-6 justify-center w-full mt-4">
          <input
            className="shadow-one w-[40%] placeholder:font-medium rounded-lg placeholder:text-secondary/60 px-4"
            placeholder="Search for upcoming trade shows"
          />
          <Button className="text-secondary font-semibold bg-white hover:bg-secondary hover:text-white transition-all py-5 shadow-one">
            Search
          </Button>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-4">
          <div>asdbahjs</div>
          <div>asdbahjs</div>
          <div>asdbahjs</div>
          <div>asdbahjs</div>
          <div>asdbahjs</div>
        </div>
      </div>
    </>
  );
};

export default Page;
