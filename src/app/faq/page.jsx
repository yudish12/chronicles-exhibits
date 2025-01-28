import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
 
import { getSinglePage } from "@/server/actions/pages";
import React from "react";

export const dynamic = 'force-dynamic';

export const generateMetadata = async () => {
  const { data } = await getSinglePage({ name: "faq" }, "meta_title meta_description meta_keywords");
  return {
    title: data?.meta_title || "Default Title",
    description: data?.meta_description || "Default Description",
    keywords: data?.meta_keywords?.join(",") ?? "Default Keywords",
  };
};

const page = async () => {
  const faqPageData = await getSinglePage({ name: "faq" });
  const faqs = faqPageData.data.fields[1].value;

  return (
    <>
      {/* <  /> */}
      <Header />
      <div
        style={{ height: "280px" }}
        className="booth-design-bg flex justify-center px-4 md:px-8 lg:px-20 flex-col gap-8 items-center"
      >
        <h1 className="text-4xl text-center uppercase font-semibold heading-font text-white">
          {faqPageData.data.fields[0].value}
        </h1>
      </div>
      <div className="flex items-center justify-center py-4 ">
        <div className="container py-8 px-12 ">
          <div className="grid sm:w-[95%] md:w-[90%] mx-auto grid-cols-1 mt-8 md:grid-rows-3 sm:gap-6 md:gap-0">
            {faqs.map((e, index) => (
              <div
                key={index}
                className="bg-white shadow-lg  border border-black overflow-hidden mb-4 md:mb-6"
              >
                <div className="bg-black h-[52px] md:h-10 flex items-center p-4">
                  <h4 className="text-primary body-bold  text-sm md:text-base flex items-center">
                    <span className="text-primary flex justify-center items-center body-bold text-lg md:text-xl">
                      {index < 9 ? 0 : ""}
                      {index + 1}
                    </span>
                    <span className="border-r-2 border-gray-300 mx-3 h-5"></span>
                    {e.question}
                  </h4>
                </div>
                <p className="text-black p-4 text-sm md:text-[15px]">
                  {e.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
