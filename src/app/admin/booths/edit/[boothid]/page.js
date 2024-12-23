import React from "react";
import { findSingleBooth } from "@/server/actions/booths";
import Editbooth from "./_components/Editbooth";

const Page = async ({ params }) => {
  const { boothid } = await params;
  console.log(boothid);
  const boothResponse = await findSingleBooth({ _id: boothid });
  console.log("booth res", boothResponse);
  let singleBooth = boothResponse.data;

  return (
    <>
      <div className="flex flex-col items-center justify-start overflow-auto min-h-full bg-gray-200 p-8 w-full">
        <Editbooth boothData={singleBooth} />
      </div>
    </>
  );
};
export default Page;
