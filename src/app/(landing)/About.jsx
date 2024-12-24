import React from "react";
import { Card } from "@/components/ui/card";
import { CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
const About = () => {
  return (
    <>
      <div className="bg-white pt-4 sm:pt-6 ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className=" text-[22px] font-bold text-[#B0CB1F] ">
              What We Do
            </h2>
            <p className="mt-4 sm:text-3xl heading-font-700 font-bold text-secondary ">
              END-TO-END TRADE SHOW BOOTH DESIGN & PRODUCTION
            </p>
          </div>
          <div className="mt-6 bg-white">
            <div className="py-2 sm:p-4">
              <h3 className=" text-base text-black text-center px-4 ">
                Our recent work in the USA showcases stunning images of our
                exceptional projects. From trade show booths to eye-catching
                displays, our portfolio reflects the expertise and creativity we
                bring to every project. Get inspired by our work and let us
                create a standout experience for your brand.
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white pt-8 pb-16 px-4 ">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Display Exhibits */}
            <div className="flex flex-col h-full">
              <Card className="h-full shadow-one rounded-xl overflow-hidden max-h-[400px] flex flex-col">
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
                <CardHeader className="text-center p-4">
                  <CardTitle className="text-[26px] heading-font-600 font-bold text-secondary">
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
                <CardFooter className="flex justify-center  p-4 pt-0 mt-6">
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
                <div className="w-full h-28 sm:h-48 overflow-hidden">
                  <Image
                    height={100}
                    width={150}
                    src="/what-we-do-2.png"
                    alt="Exhibit Display"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text Content */}
                <CardHeader className="text-center p-4">
                  <CardTitle className="text-[26px] heading-font-600 font-bold text-secondary">
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
                <CardFooter className="flex justify-center p-4 pt-0 mt-6">
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
                <div className="w-full h-28 sm:h-48 overflow-hidden">
                  <Image
                    height={100}
                    width={150}
                    src="/what-we-do-3.png"
                    alt="Exhibit Display"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text Content */}
                <CardHeader className="text-center p-4">
                  <CardTitle className="text-[26px] heading-font-600 font-bold text-secondary">
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
                <CardFooter className="p-4 pt-0 mt-6 flex justify-center">
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
