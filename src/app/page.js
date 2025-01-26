import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import React from "react";
import About from "./(landing)/About";
import Products from "./(landing)/Products";
import FactsAndFigures from "./(landing)/FactsAndFigures";
import Ourworks from "./(landing)/Ourworks";
import Leadingtrade from "./(landing)/Leadingtrade";
import Faq from "./(landing)/Faq";
import dynamic from "next/dynamic";
const Queryform = dynamic(() => import("./(landing)/Queryform"))
import Footer from "@/components/ui/footer";
import { getSinglePage } from "@/server/actions/pages";
// import DownArrow from "./down-arrow";

export async function generateMetadata({ params }) {
  const homePageData = await getSinglePage({ name: "home" }, "meta_keywords meta_title meta_description");
  console.log(homePageData.data)
  return {
    title: homePageData.data.meta_title,
    description: homePageData.data.meta_description,
    alternates: {
      canonical: `https://chronicleexhibits.com/`,
    },
    keywords: homePageData.data.meta_keywords,
  };
}

const Hero = async () => {
  const homePageData = await getSinglePage({ name: "home" });
  console.log(homePageData);
  return (
    <>
      {/* {/* <SubHeader /> */}
      <Header />
      <div className="hero flex flex-col justify-center items-center h-[88vh]">
        {/* <h6 className=" text-lg 2xl:text-xl mt-14 leading-5 font-medium text-center text-white">
          Ready to{" "}
          <span className="font-semibold">
            Revolutionize your Exhibit Displays?
          </span>x
        </h6>
        <h2 className="heading-font mt-2 uppercase text-center text-white font-bold text-4xl sm:text-5xl lg:text-[3.45rem] 2xl:text-[4rem]">
          Get State of the Art
        </h2>
        <h2 className="text-white heading-font uppercase text-center font-bold text-4xl sm:text-5xl lg:text-[3.45rem] 2xl:text-[4rem]">
          Trade Fair Booth
        </h2>
        <h2 className="text-white heading-font uppercase text-center font-bold text-4xl sm:text-5xl lg:text-[3.45rem] 2xl:text-[4rem]">
          Displays
        </h2>
        <DownArrow /> */}
      </div>
      <About fields={homePageData.data.fields} />
      <Products
        title={homePageData.data.fields[23].value}
        subTitle={homePageData.data.fields[24].value}
      />
      <FactsAndFigures fields={homePageData.data.fields} />
      <Ourworks
        title={homePageData.data.fields[35].value}
        subtitle={homePageData.data.fields[36].value}
      />
      <Leadingtrade fields={homePageData.data.fields} />
      <Faq fields={homePageData.data.fields} />
      <Queryform />
      <Footer />
    </>
  );
};

export default Hero;
