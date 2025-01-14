import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import React from "react";
import Image from "next/image";
import EnquiryForm from "./_components/EnquiryForm";
import LocateUs from "./_components/LocateUs";
import OtherOffices from "./_components/OtherOffices";
import { getSinglePage } from "@/server/actions/pages";

const Page = async () => {
  const contactUsPageData = await getSinglePage({ name: "contact-us" });
  const fields = contactUsPageData.data.fields;
  return (
    <>
      <SubHeader />
      <Header />
      <div className="booth-design-bg px-4 md:px-20 text-white gap-8 h-[360px] justify-center items-center flex flex-col">
        <h1 className="text-white heading-font text-4xl font-bold">
          CONTACT US
        </h1>
      </div>

      <div className="py-16 px-6 md:px-10 bg-background">
        <h2 className="text-center text-[#9CCC4A] text-xl font-semibold">
          Reach Out To Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 px-4 ">
          <div className="bg-white p-6 rounded-md shadow-md flex items-center space-x-4">
            <Image
              src="/Whatsapp.png"
              alt="WhatsApp"
              width={40}
              height={40}
              className="object-contain"
            />
            <div>
              <p className="text-lg font-semibold text-[#4B224C]">WhatsApp</p>
              <p className="text-sm text-gray-600">
                {contactUsPageData.data.fields[0].value}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md flex items-center space-x-4">
            <Image
              src="/Phone.png"
              alt="Phone"
              width={40}
              height={40}
              className="object-contain"
            />
            <div>
              <p className="text-lg font-semibold text-secondary">Phone</p>
              <p className="text-sm text-gray-600">
                {contactUsPageData.data.fields[1].value}
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md flex items-center space-x-4">
            <Image
              src="/Envelope.png"
              alt="Email"
              width={40}
              height={40}
              className="object-contain"
            />
            <div>
              <p className="text-lg font-semibold text-[#4B224C]">Email</p>
              <p className="text-sm text-gray-600">
                {contactUsPageData.data.fields[2].value}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 mt-10 rounded-md shadow-md flex items-center space-x-4 max-w-2xl mx-auto">
          <Image
            src="/Location.png"
            alt="Location"
            width={40}
            height={40}
            className="object-contain"
          />
          <div>
            <p className="text-lg font-semibold text-[#4B224C]">
              US Office Address
            </p>
            <p className="text-sm text-gray-600">
              {contactUsPageData.data.fields[3].value}
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center">
          <Image
            src={contactUsPageData.data.fields[4].value}
            alt="QR Code"
            width={120}
            height={120}
            className="object-contain"
          />
          <p className="mt-4 text-lg text-[#9CCC4A] font-semibold">
            Scan QR Code
          </p>
        </div>
      </div>

      {/* Center the EnquiryForm */}
      <div className="flex justify-center py-16 bg-background md:px-12 lg:px-20  px-6 sm:px-8">
        <EnquiryForm />
      </div>
      <LocateUs />
      <OtherOffices />
      <Footer />
    </>
  );
};

export default Page;
