import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import React from "react";

const Page = () => {
  return (
    <>
      <SubHeader />
      <Header />
      <div className="trade-show-bg ">
        <h2 className="text-[2.1rem] text-center text-white uppercase font-semibold heading-font">
          The Asi Show
        </h2>
      </div>
    </>
  );
};

export default Page;
