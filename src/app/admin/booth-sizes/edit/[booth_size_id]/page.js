import { getSingleBoothSize } from "@/server/actions/booth-sizes";
import React from "react";
import Editboothsize from "./_component/Editboothsize";
import { getSinglePage } from "@/server/actions/pages";

const Page = async ({ params }) => {
  const resolvedParams = await params;
  const boothSizeId = resolvedParams.booth_size_id;

  const boothData = await getSingleBoothSize({ _id: boothSizeId });
  const boothPageData = await getSinglePage({ name: boothData.data.name });

  return (
    <div className="flex flex-col items-center justify-start overflow-auto min-h-full bg-gray-200 p-8 w-full">
      <Editboothsize
        pageData={boothPageData.data}
        singleBoothsizeData={boothData.data}
      />
    </div>
  );
};

export default Page;
