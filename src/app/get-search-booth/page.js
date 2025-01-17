import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import { getBoothByName, getBoothsBySize } from "@/server/actions/booths";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = async ({ params, searchParams }) => {
  const size = searchParams.size;
  const { data } = await getBoothByName(size);

  if (!data || !data.length) {
    return (
      <>
        {/* <SubHeader /> */}
        <Header />
        <div className="booth-design-bg text-white flex justify-center px-4 md:px-8 lg:px-20 flex-col gap-8 items-center">
          <h2 className="text-4xl text-center uppercase font-semibold heading-font">
            No Data Found
          </h2>
        </div>
      </>
    );
  }

  return (
    <>
      {/* <SubHeader /> */}
      <Header />
      <div className="booth-design-bg text-white flex justify-center px-4 md:px-8 lg:px-20 flex-col gap-8 items-center">
        <h2 className="text-4xl text-center uppercase font-semibold heading-font">
          Here are some booth designs based on your search.
        </h2>
      </div>
      <div className="grid  my-16 grid-cols-1 px-6 lg:p-0 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 place-items-center place-content-center max-w-[1200px] mx-auto ">
        {data.map((booth) => (
          <Card
            key={booth._id}
            className="shadow-one rounded-lg overflow-hidden lg:w-[380px] w-full"
          >
            <CardHeader className="p-0">
              <Image
                height={250}
                width={378}
                src={booth.thumbnail_image}
                alt={`${booth.image_alt_text}`}
                className="w-full lg:h-[250px] h-[220px]"
              />
            </CardHeader>
            <CardContent className="p-4 text-center">
              <p className="font-semibold text-lg text-secondary">
                Booth Code: {booth.booth_code}
              </p>
              <Link href={`/${size}-trade-show-booth/${booth.booth_code}`}>
                <Button
                  style={{ transitionDuration: "500ms" }}
                  className="mt-4 bg-transparent hover:bg-secondary border-2 border-[#B0CB1F] hover:border-secondary text-[#B0CB1F] hover:text-white px-6 py-2 font-bold text-sm"
                >
                  Customize Now!
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Page;
