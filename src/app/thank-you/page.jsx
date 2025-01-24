import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/ui/footer";

const page = () => {
  return (
    <>
      {/* <SubHeader /> */}
      <Header />
      <div className="flex flex-col justify-center items-center h-screen overflow-hidden">
        <Image src="/deal 1.svg" width={100} height={100} alt="Deal Icon" />
        <div className="text-secondary text-4xl py-2 heading-font">
          THANK YOU
        </div>
        <div className="text-center flex flex-col items-center justify-center px-4">
          <p>
            You&apos;re one step closer to a smooth and successful exhibition!
          </p>
          <p>
            Your request has been successfully submitted. Our team will connect
            with you shortly.
          </p>
        </div>
        <div className="mt-6 ">
          <Link href={"/"} >
          <Button className="text-white text-lg bg-secondary hover:bg-[#B0CB1F] hover:text-secondary font-bold p-4 ">
            Back to Home
          </Button>
          </Link>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default page;
