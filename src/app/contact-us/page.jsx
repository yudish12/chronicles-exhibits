import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import React from "react";
import Image from "next/image";
import EnquiryForm from "./_components/EnquiryForm";
import LocateUs from "./_components/LocateUs";
import OtherOffices from "./_components/OtherOffices";
import { getSinglePage } from "@/server/actions/pages";
import ContactInfo from "./_components/ContactInfo";

export async function generateMetadata({ params }) {
  const pageData = await getSinglePage({ name: "contact-us" }, "meta_keywords meta_title meta_description");
  return {
    title: pageData?.data?.meta_title,
    description: pageData?.data?.meta_description,
    keywords: pageData?.data?.meta_keywords,
  };
}

const Page = async () => {
  const contactUsPageData = await getSinglePage({ name: "contact-us" });
  const fields = contactUsPageData.data.fields;

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="relative booth-design-bg text-white py-24 px-4 sm:px-6 lg:px-8">
          
          <div className="relative h-full flex flex-col justify-center max-w-7xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              CONTACT US
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto">
              Get in touch with us for the best exhibit displays in the USA
            </p>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <ContactInfo fields={fields} />
              <EnquiryForm />
            </div>
          </div>
        </section>

        <LocateUs />
        <OtherOffices />
      </main>
      <Footer />
    </>
  );
};

export default Page;
