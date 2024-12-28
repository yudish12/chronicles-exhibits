import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import { getSinglePage } from "@/server/actions/pages";
import React from "react";
import "./style.css";

const page = async () => {
  const data = await getSinglePage({ name: "faq" });

  return (
    <>
      <SubHeader />
      <Header />
      <div className="flex items-center justify-center py-4 ">
        <div
          id="faq-body"
          dangerouslySetInnerHTML={{ __html: data.data.fields[0].value }}
          className="container  py-12 px-12 "
        ></div>
      </div>
      <Footer />
    </>
  );
};

export default page;
