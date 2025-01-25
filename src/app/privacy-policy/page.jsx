import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import React from "react";
import "./style.css";

export const generateMetadata = async () => {
  const { data } = await getSinglePage({ name: "privacy-policy" }, "meta_title meta_description meta_keywords");
  return {
    title: data?.meta_title || "Default Title",
    description: data?.meta_description || "Default Description",
    keywords: data?.meta_keywords?.join(",") ?? "Default Keywords",
  };
};

import { getSinglePage } from "@/server/actions/pages";
const Page = async () => {
  const data = await getSinglePage({ name: "privacy-policy" });

  console.log(data);

  return (
    <>
      {/* <SubHeader /> */}
      <Header />
      <div className="flex items-center justify-center bg-white px-10  ">
        <div
          id="privacy-policy-body"
          dangerouslySetInnerHTML={{
            __html: data.data.fields[0].value,
          }}
          className="container py-12 px-10 lg:px-24"
        ></div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
