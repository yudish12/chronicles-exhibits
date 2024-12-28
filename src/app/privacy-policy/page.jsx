import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import React from "react";
import Image from "next/image";
import "./style.css";

import { getSinglePage } from "@/server/actions/pages";
const Page = async () => {
  const data = await getSinglePage({ name: "privacy-policy" });

  console.log(data);

  return (
    <>
      <SubHeader />
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
