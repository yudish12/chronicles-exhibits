import React from "react";
import Header from "@/components/ui/header";
import BoothGrid from "./_components/BoothCardGrid";
import { BoothDetails } from "./_components/BoothDetails";
import Footer from "@/components/ui/footer";
import {
  findSingleBooth,
  getBoothCodeStaticParams,
  getAllData,
  getDataByCode,
} from "@/server/actions/booths";
import { notFound } from "next/navigation";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const boothCodes = await getBoothCodeStaticParams();
    if (!boothCodes.success) {
      return [];
    }
    return boothCodes.data.map((boothCode) => ({
      booth_size: boothCode.booth_size.name,
      booth_code: boothCode.booth_code,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const booth_code = resolvedParams.booth_code;

  const boothData = await findSingleBooth({ booth_code }, true);
  const data = boothData.data;
  return {
    title: booth_code || "Default Title",
    description: booth_code || "Default Description",
    keywords: data?.meta_keywords?.join(",") ?? "Default Keywords",
    alternates: {
      canonical: `https://chronicleexhibits.com/${data?.booth_size?.name}-trade-show-booth/${booth_code}/`,
    },
  };
}

const BoothByCode = async ({ params }) => {
  const resolvedParams = await params;
  console.log("params", resolvedParams);
  const boothCode = resolvedParams.booth_code;
  const sizeFromHeader = resolvedParams.booth_size;

  const resp = await getDataByCode(boothCode, sizeFromHeader);
  console.log(resp.data);
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

  return (
    <>
      {/* <  /> */}
      <Header />
      {/* <div>

    </div> */}
      <BoothDetails
        size={sizeFromHeader}
        boothData={resp.data}
        boothCode={boothCode}
      />
      {/* <BoothEnquiry/> */}
      <BoothGrid size={sizeFromHeader} boothCodes={boothCodes} />
      <Footer />
    </>
  );
};

export default BoothByCode;
