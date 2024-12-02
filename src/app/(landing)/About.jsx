import React from "react";
import { Card } from "@/components/ui/card";
import { CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import Link from "next/link";
const About = () => {
  return (
    <>
      <div className="bg-[#FDF3ED] py-20 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Title */}
            <h2 className="text-xl heading-font font-bold text-black sm:text-[2rem]">
              THE LEADING EXHIBIT DISPLAY DESIGN STUDIO IN USA
            </h2>
            {/* Subtitle */}
            <h3 className="mt-6 text-lg font-medium text-black">
              Welcome to Chronicle Exhibits LLC – Your Trusted Trade Show Booth
              Design and Builders in Las Vegas, USA.
            </h3>
            {/* Description */}
            <h6 className="mt-4 text-base text-black">
              Your one-stop destination for exceptional trade show booth design
              and building services in the USA.
            </h6>
            <h6 className=" text-base text-black">
              Our expert team delivers exceptional services for designing and
              constructing custom trade show booths.
            </h6>
            <h6 className=" text-base text-black">
              Elevate your brand presence at trade shows with our innovative
              solutions and local expertise.
            </h6>
          </div>
        </div>
      </div>

      <div className="bg-[#FDF3ED] pt-4 sm:pt-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className=" text-[22px] font-bold text-[#B0CB1F] ">
              What We Do
            </h2>
            <p className="mt-4 text-2xl heading-font font-bold text-secondary ">
              END-TO-END TRADE SHOW BOOTH DESIGN & PRODUCTION
            </p>
          </div>
          <div className="mt-6 bg-[#FDF3ED]">
            <div className="py-2 sm:p-4">
              <h3 className=" text-base text-black text-center">
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

      <div className="bg-[#FDF3ED] pt-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Display Exhibits */}
            <div className="flex flex-col h-full">
              <Card className="h-full shadow-one rounded-xl overflow-hidden max-h-[400px] flex flex-col">
                {/* Image */}
                <div className="w-full h-28 sm:h-48 border-b-2 border-b-primary overflow-hidden">
                  <img
                    src="/what-we-do-1.png"
                    alt="Exhibit Display"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text Content */}
                <CardHeader className="text-center p-4">
                  <CardTitle className="text-[26px] heading-font font-bold text-secondary">
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
                  <Link href={"/trade-show-booth-displays-designs"}>
                    <Button
                      variant="outline"
                      className="border-secondary bg-white font-semibold text-secondary hover:bg-secondary hover:text-white p-4 border-2 "
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
                  <img
                    src="/what-we-do-2.png"
                    alt="Exhibit Display"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text Content */}
                <CardHeader className="text-center p-4">
                  <CardTitle className="text-[26px] heading-font font-bold text-secondary">
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
                  <Button
                    variant="outline"
                    className="border-secondary bg-white font-semibold text-secondary hover:bg-secondary hover:text-white p-4 border-2 "
                  >
                    <Link className="hover:underline" href="/services">
                      Know More
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Our Work */}
            <div className="flex flex-col h-full">
              <Card className="h-full  shadow-one rounded-xl overflow-hidden max-h-[400px] flex flex-col">
                <div className="w-full h-28 sm:h-48 overflow-hidden">
                  <img
                    src="/what-we-do-3.png"
                    alt="Exhibit Display"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text Content */}
                <CardHeader className="text-center p-4">
                  <CardTitle className="text-[26px] heading-font font-bold text-secondary">
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
                  <Link href={"/portfolio"}>
                    <Button
                      variant="outline"
                      className="border-secondary bg-white font-semibold text-secondary hover:bg-secondary hover:text-white p-4 border-2 "
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
