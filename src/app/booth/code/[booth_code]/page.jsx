import React from "react";
import SubHeader from "@/components/ui/sub-header";
import Header from "@/components/ui/header";
import Queryform from "@/app/(landing)/Queryform";
// import Queryform from '../(landing)/Queryform';
import BoothGrid from "./_components/BoothCardGrid";
import BoothEnquiry from "./_components/BoothInuiry";
import { BoothDetails } from "./_components/BoothDetails";
import Footer from "@/components/ui/footer";
import { getAllData, getDataByCode } from "@/server/actions/booths";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
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
  console.log("params", resolvedParams);
  const boothCode = resolvedParams.booth_code;
  const header = await headers();
  const referer = header.get("referer");

  console.log(referer);

  const size = referer?.split("/")[3]?.split("-")[0];
  const resp = await getDataByCode(boothCode, size);

  if (!resp?.data) {
    notFound();
  }

  const boothCodes = await getAllData(
    0,
    3,
    "booth_code thumbnail_image image_alt_text",
    resp.data.booth_size,
    true
  );

  console.log(boothCodes);

  return (
    <>
      <SubHeader />
      <Header />
      {/* <div>

    </div> */}
      <BoothDetails size={size} boothData={resp.data} boothCode={boothCode} />
      {/* <BoothEnquiry/> */}
      <BoothGrid size={size} boothCodes={boothCodes} />
      <Footer />
    </>
  );
};

export default BoothByCode;
