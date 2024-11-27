import React from "react";
import { Card } from "@/components/ui/card";
import { CardContent , CardTitle , CardFooter  } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
const About = () => {
    return (
        <>
<div className="bg-[#FDF3ED] py-10 sm:py-4">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center">
      {/* Title */}
      <h2 className="text-xl heading-font font-bold text-black sm:text-3xl">
        THE LEADING EXHIBIT DISPLAY DESIGN STUDIO IN USA
      </h2>
      {/* Subtitle */}
      <h3 className="mt-6 text-lg font-medium text-secondary">
        Welcome to Chronicle Exhibits LLC – Your Trusted Trade Show Booth Design and Builders in Las Vegas, USA.
      </h3>
      {/* Description */}
      <h6 className="mt-4 text-base font-light text-secondary">
        Your one-stop destination for exceptional trade show booth design and building services in the USA.
      </h6>
      <h6 className=" text-base font-light text-secondary">
        Our expert team delivers exceptional services for designing and constructing custom trade show booths.
      </h6>
      <h6 className=" text-base font-light text-secondary">
        Elevate your brand presence at trade shows with our innovative solutions and local expertise.
      </h6>
    </div>
  </div>
</div>


<div className="bg-[#FDF3ED] pt-12 sm:pt-16">
  <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
    <div className="text-center">
      <h2 className="text-lg font-extrabold text-[#B0CB1F] ">What We Do</h2>
      <p className="mt-4 text-2xl heading-font font-bold text-secondary ">END-TO-END TRADE SHOW BOOTH DESIGN & PRODUCTION</p>
    </div>
    <div className="mt-6 bg-[#FDF3ED]">
  <div className="px-4 py-5 sm:p-6">
    <h3 className="text-lg text-center text-secondary   ">
      Our recent work in the USA showcases stunning images of our exceptional projects. From trade show booths to eye-catching displays, our portfolio reflects the expertise and
    </h3>
    <h3 className="text-lg text-center text-secondary whitespace-nowrap overflow-hidden text-ellipsis">
      creativity we bring to every project. Get inspired by our work and let us create a standout experience for your brand.
    </h3>
  </div>
</div>

  </div>
</div>

<div className="bg-[#FDF3ED] py-12 sm:py-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {/* Card 1: Display Exhibits */}
      <div className="flex flex-col h-full">
        <Card className="h-full shadow-lg rounded-lg overflow-hidden flex flex-col">
          {/* Image */}
          <div className="w-full h-48 sm:h-64 overflow-hidden">
            <img
              src="/what-we-do-1.png"
              alt="Exhibit Display"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Text Content */}
          <CardHeader className="text-center">
            <CardTitle className="text-xl heading-font font-bold text-secondary">
              DISPLAY EXHIBITS
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-500">
              Explore our range of trade show booth displays design rentals by size and budget.
            </p>
          </CardContent>
          {/* Button */}
          <CardFooter className="mt-auto flex justify-center">
            <Button
              variant="outline"
              className="border-[#51374F] text-secondary hover:bg-[#51374F] hover:text-white p-4 border-2 "
            >
              View All
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Card 2: Our Services */}
      <div className="flex flex-col h-full">
        <Card className="h-full shadow-lg rounded-lg overflow-hidden flex flex-col">
        <div className="w-full h-48 sm:h-64 overflow-hidden">
            <img
              src="/what-we-do-2.png"
              alt="Exhibit Display"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Text Content */}
          <CardHeader className="text-center">
            <CardTitle className="text-xl heading-font font-bold text-secondary">
              OUR SERVICES
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-500">
              We offer full trade show booth displays design services to make your experience hassle-free.
            </p>
          </CardContent>
          {/* Button */}
          <CardFooter className="mt-auto flex justify-center">
            <Button
              variant="outline"
              className="border-[#51374F] text-secondary hover:bg-[#51374F] hover:text-white p-4 border-2 "
            >
              Know More
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Card 3: Our Work */}
      <div className="flex flex-col h-full">
        <Card className="h-full shadow-lg rounded-lg overflow-hidden flex flex-col">
        <div className="w-full h-48 sm:h-64 overflow-hidden">
            <img
              src="/what-we-do-3.png"
              alt="Exhibit Display"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Text Content */}
          <CardHeader className="text-center">
            <CardTitle className="text-xl heading-font font-bold text-secondary">
              OUR WORK
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-500">
              Check out our most recent trade show booth designs and projects executed in the USA.
            </p>
          </CardContent>
          {/* Button */}
          <CardFooter className="mt-auto flex justify-center">
            <Button
              variant="outline"
              className="border-[#51374F] text-secondary hover:bg-[#51374F] hover:text-white p-4 border-2 "
            >
              View Portfolio
            </Button>
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
