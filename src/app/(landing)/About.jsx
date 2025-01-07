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
      <div className="bg-white mt-4 xs:mt-20 sm:mt-52 lg:mt-0 pt-2 sm:pt-4 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* <h2 className=" text-[22px] font-bold text-[#B0CB1F] ">
              {fields[6].value}
            </h2> */}
            <p className="mt-4 uppercase text-3xl sm:text-3xl heading-font-700 font-bold text-secondary ">
              {fields[6].value}
            </p>
          </div>
          <div className="mt-6 bg-white">
            <div className="py-2 sm:p-4">
              <h3 className="lg:mx-40 sm:mx-20 text-center text-[18px] text-black px-6">
                {fields[7].value}
                babsdh
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white pt-8 pb-16">
        <div className="mx-auto lg:px-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 xl:gap-10 lg:grid-cols-3">
            {/* Display Exhibits */}
            <div className="flex flex-col h-full">
              <Card className="h-full shadow-one rounded-xl overflow-hidden  md:max-w-[2000px] max-h-[400px] flex flex-col">
                {/* Image */}
                <div className="w-full h-28 sm:h-48 border-b-2 border-b-primary overflow-hidden">
                  <Image
                    height={100}
                    width={150}
                    src="/what-we-do-1.png"
                    alt="Exhibit Display"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text Content */}
                <CardHeader className="text-center p-2">
                  <CardTitle className="text-[24px] heading-font-600 font-bold text-secondary">
                    DISPLAY EXHIBITS
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-secondary p-0 px-4">
                  <p className="text-secondary">
                    Explore our range of trade show booth displays design
                    rentals by size and budget.
                  </p>
                </CardContent>
                {/* Button */}
                <CardFooter className="flex justify-center  p-2 my-2">
                  <Link
                    className="flex justify-center"
                    href={"/trade-show-booth-displays-designs"}
                  >
                    <Button
                      variant="outline"
                      style={{ transitionDuration: "500ms" }}
                      className="rounded-full w-1/3 mx-auto px-16  py-4 font-thin text text-xl text-black border hover:bg-primary hover:text-white  bg-transparent border-primary"
                    >
                      View All
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            {/*Our Services */}
            <div className="flex flex-col h-full">
              <Card className="h-full  shadow-one rounded-xl overflow-hidden max-h-[400px] flex flex-col">
                <div className="w-full  border-b-2 border-b-primary h-28 sm:h-48 overflow-hidden">
                  <Image
                    height={100}
                    width={150}
                    src="/what-we-do-2.png"
                    alt="Exhibit Display"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text Content */}
                <CardHeader className="text-center p-2">
                  <CardTitle className="text-[24px] heading-font-600 font-bold text-secondary">
                    OUR SERVICES
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-secondary p-0 px-4">
                  <p className="text-secondary">
                    We offer full trade show booth displays design services to
                    make your experience hassle-free.
                  </p>
                </CardContent>
                {/* Button */}
                <CardFooter className="flex justify-center p-2 my-2">
                  <Link className="flex justify-center" href="/services">
                    <Button
                      variant="outline"
                      style={{ transitionDuration: "500ms" }}
                      className="rounded-full w-1/3 mx-auto px-16  py-4 font-thin text text-xl text-black border hover:bg-primary hover:text-white  bg-transparent border-primary"
                    >
                      Know More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>

            {/* Our Work */}
            <div className="flex flex-col h-full">
              <Card className="h-full  shadow-one rounded-xl overflow-hidden max-h-[400px] flex flex-col ">
                <div className="w-full  border-b-2 border-b-primary h-28 sm:h-48 overflow-hidden">
                  <Image
                    height={100}
                    width={150}
                    src="/what-we-do-3.png"
                    alt="Exhibit Display"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text Content */}
                <CardHeader className="text-center p-2">
                  <CardTitle className="text-[24px] heading-font-600 font-bold text-secondary">
                    OUR WORK
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center text-secondary p-0 px-4">
                  <p className="text-secondary">
                    Check out our most recent trade show booth designs and
                    projects executed in the USA.
                  </p>
                </CardContent>
                {/* Button */}
                <CardFooter className="p-2 my-2 flex justify-center">
                  <Link className="flex justify-center" href={"/portfolio"}>
                    <Button
                      variant="outline"
                      style={{ transitionDuration: "500ms" }}
                      className="rounded-full w-1/3 mx-auto px-16 py-4 font-thin text text-xl text-black border hover:bg-primary hover:text-white  bg-transparent border-primary"
                    >
                      View Portfolio
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
