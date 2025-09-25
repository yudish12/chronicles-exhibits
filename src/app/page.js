// import Header from "@/components/ui/header";
import React from "react";
import About from "./(landing)/About";
import Products from "./(landing)/Products";
import FactsAndFigures from "./(landing)/FactsAndFigures";
import Ourworks from "./(landing)/Ourworks";
import Leadingtrade from "./(landing)/Leadingtrade";
import Faq from "./(landing)/Faq";
import Queryform from "./(landing)/Queryform";
import Footer from "@/components/ui/footer";
import { getSinglePage } from "@/server/actions/pages";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/ui/header"));
// import DownArrow from "./down-arrow";

// export const dynamic = 'force-static';

export async function generateMetadata({ params }) {
  const homePageData = await getSinglePage(
    { name: "home" },
    "meta_keywords meta_title meta_description"
  );
  return {
    title: homePageData.data.meta_title,
    description: homePageData.data.meta_description,
    alternates: {
      canonical: `https://chronicleexhibits.com/`,
    },
    keywords: homePageData.data.meta_keywords,
  };
}

const page = async () => {
  // const homePageData = await getSinglePage({ name: "home" });
  // console.log("homepagedata" , homePageData)
  const res = await fetch("https://chronicles-exhibits.vercel.app/api/home/", {
    next: { revalidate: 3600 },
  });
  console.log("RESPONSE", res);
  const resp = await res.json();
  let homePageData = resp;
  return (
    <>
      <Header />
      <div className="hero flex flex-col justify-center items-center h-[88vh]">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-content" />
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

export default page;
