import React from "react";
import { Card } from "@/components/ui/card";
import { CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

const About = ({ fields }) => {
  return (
    <>
      {/* Section Header */}
      <div id="about" className="bg-white mt-4 lg:mt-0 pt-2 sm:pt-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="mt-4 uppercase text-3xl sm:text-3xl heading-font-700 font-bold text-secondary">
              {fields[6].value}
            </p>
          </div>
          <div className="mt-6 bg-white">
            <div className="py-2 sm:p-4">
              <h3 className="lg:mx-40 sm:mx-20 text-center text-[18px] text-black px-6">
                {fields[7].value}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="bg-white pt-8 pb-16">
        <div className="mx-auto 2xl:px-72 lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 sm:px-12 lg:px-0">
            {/* Card 1 */}
            <Card className="shadow-one w-full 2xl:max-w-[390px] xs:w-[70%] mx-auto sm:w-full rounded-xl overflow-hidden flex flex-col">
              <div>
                <div className="w-full h-48 border-b-2 border-b-primary overflow-hidden">
                  <Image
                    height={260}
                    width={350}
                    src={fields[11].value}
                    alt={fields[12].value}
                    className="w-full h-full"
                  />
                </div>

                <CardHeader className="text-center p-2">
                  <CardTitle className="text-[24px] heading-font-600 font-bold text-secondary">
                    {fields[8].value}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-secondary p-0 px-4">
                  <p>{fields[9].value}</p>
                </CardContent>
              </div>
              <CardFooter className="flex justify-center p-2 my-2">
                <Link href="/custom-trade-show-booth-ideas">
                  <Button
                    style={{ transitionDuration: "500ms" }}
                    className="rounded-full  mx-auto px-8 text-lg hover:bg-white border border-black hover:text-black bg-primary text-black "
                  >
                    {fields[10].value}
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Card 2 */}
            <Card className="shadow-one w-full xs:w-[70%] 2xl:max-w-[390px] mx-auto sm:w-full  rounded-xl overflow-hidden flex flex-col">
              <div>
                <div className="w-full h-48 border-b-2 border-b-primary overflow-hidden">
                  <Image
                    height={260}
                    width={350}
                    src={fields[16].value}
                    alt={fields[17].value}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <CardHeader className="text-center p-2">
                    <CardTitle className="text-[24px] heading-font-600 font-bold text-secondary">
                      {fields[13].value}
                    </CardTitle>
                  </CardHeader>
                </div>
                <CardContent className="text-center text-secondary p-0 px-4">
                  <p>{fields[14].value}</p>
                </CardContent>
              </div>
              <CardFooter className="flex justify-center p-2 my-2">
                <Link href="/trade-show-booth-displays-designs">
                  <Button
                    style={{ transitionDuration: "500ms" }}
                    className="rounded-full  mx-auto px-8 text-lg hover:bg-white border border-black hover:text-black bg-primary text-black "
                  >
                    {fields[15].value}
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Card 3 */}
            <Card className="shadow-one w-full xs:w-[70%] 2xl:max-w-[390px] mx-auto sm:w-full rounded-xl overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-full h-48 border-b-2 border-b-primary overflow-hidden">
                  <Image
                    height={260}
                    width={350}
                    src={fields[21].value}
                    alt={fields[22].value}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="text-center p-2">
                  <CardTitle className="text-[24px] heading-font-600 font-bold text-secondary">
                    {fields[18].value}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-secondary p-0 px-4">
                  <p>{fields[19].value}</p>
                </CardContent>
              </div>
              <CardFooter className="flex justify-center  p-2 my-2">
                <Link href="/portfolio">
                  <Button
                    style={{ transitionDuration: "500ms" }}
                    className="rounded-full  mx-auto px-8 text-lg hover:bg-white border border-black hover:text-black bg-primary text-black "
                  >
                    {fields[20].value}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
