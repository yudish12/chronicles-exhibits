import React from "react";
import SubHeader from "@/components/ui/sub-header";
import Header from "@/components/ui/header";
import Queryform from "@/app/(landing)/Queryform";
// import Queryform from '../(landing)/Queryform';
import BoothGrid from "./_components/BoothCardGrid";
import BoothEnquiry from "./_components/BoothInuiry";
import { BoothDetails } from "./_components/BoothDetails";
import Footer from "@/components/ui/footer";
import { getDataByCode } from "@/server/actions/booths";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const booth_code = resolvedParams.booth_code;

  const { data } = await getDataByCode(booth_code);
  return {
    title: data?.meta_title || "Default Title",
    description: data?.meta_description || "Default Description",
    keywords: data?.meta_keywords?.join(",") ?? "Default Keywords",
  };
}

const BoothByCode = async ({ params }) => {
  const resolvedParams = await params;
  const boothCode = resolvedParams.booth_code;

  const resp = await getDataByCode(boothCode);
  console.log(resp);

  return (
    <>
      <SubHeader />
      <Header />
      {/* <div>

    </div> */}
      <BoothDetails boothData={resp.data} boothCode={boothCode} />
      {/* <BoothEnquiry/> */}
      <BoothGrid boothCode={boothCode} />
      <Queryform />
      <Footer />
    </>
  );
};

export default BoothByCode;
