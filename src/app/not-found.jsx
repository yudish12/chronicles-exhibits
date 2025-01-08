import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/footer";
const Page = () => {
  return (
    <>
      <SubHeader />
      <Header />
      <div className="flex flex-col justify-center items-center h-[80vh] overflow-hidden">
        <Image src="/Frame 104.svg" width={100} height={100} alt="Deal Icon" />
        <div className="text-secondary text-4xl py-2 heading-font">
          PAGE NOT FOUND
        </div>
        <div className="text-center flex flex-col items-center justify-center px-4">
          <p>
            Oops! The server was able to communicate with the browser, but it
            could&apos;nt find the requested page.
          </p>
          <p>
            This can happen when a page is moved , deleted, or he URL is
            mistyped.
          </p>
        </div>
        <div className="pt-6  ">
          <Button className="text-white text-lg  bg-secondary hover:bg-[#B0CB1F] hover:text-secondary font-bold p-4 ">
            Back to Home
          </Button>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Page;
