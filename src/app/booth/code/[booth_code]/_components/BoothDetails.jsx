// "use client";
// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import { ArrowLeft, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// const imagegroup1 = [
//   "/booth-2.jpeg", // Replace with actual image URLs
//   "/booth-4.jpeg",
//   "/booth-3.jpeg",
//   "/booth-1.jpeg",
// ];

// const imagegroup2 = ["/booth-code-6.jpeg", "/booth-code-3.jpeg"];

// const imagegroup3 = ["/booth-code-4.jpeg", "/booth-code-5.jpeg"];

// const packageDetails = [
//   "Design renders ",
//   "Stand construction and installation ",
//   "Carpet flooring (single colour carpet/Vinyl)",
//   "Furniture (as per ready stock)",
//   "Audio-Visual (as per design)",
//   "Counter with Branding",
//   "Graphic Print and Installation (ready to print files by client)",
//   "Lights and Sockets (sufficient for the given size)",
//   "Logistic includes (Shippings to and Fro our facility)",
//   "Labour (Workshop , Installation and Dismantling)",
//   "Booth cleaning (once during the delivery)",
// ];

// export function BoothDetails({ boothCode }) {
//   const [selectedIndex, setSelectedIndex] = React.useState(0);
//   let images;

//   if (boothCode === "CEL101001") images = imagegroup1;
//   else if (boothCode === "CEL101002") images = imagegroup2;
//   else images = imagegroup3;

//   const handlePrevious = () => {
//     setSelectedIndex(
//       (prevIndex) => (prevIndex - 1 + images.length) % images.length
//     );
//   };
//   const handleNext = () => {
//     console.log("~handle next");
//     setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };
//   const handleThumbnailClick = (index) => {
//     setSelectedIndex(index);
//   };

//   return (
//     <div className="bg-background gap-12 flex justify-center pr-16 py-7 px-40">
//       {/*Thumbnails */}
//       <div className="flex flex-col mt-16 items-start gap-8">
//         <h3 className="text-[1.4rem] text-secondary font-semibold ">
//           {boothCode}
//         </h3>
//         <div className="flex w-full flex-col gap-6">
//           {images.map((src, index) => (
//             <img
//               key={index}
//               src={src}
//               alt={`Thumbnail ${index + 1}`}
//               className={cn(
//                 "w-full grayscale h-20 object-cover rounded cursor-pointer",
//                 index === selectedIndex ? "grayscale-0" : ""
//               )}
//               onClick={() => handleThumbnailClick(index)}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Carousel */}
//       <div className="relative col-span-2 bborder-[1px] mt-16 bg-[#FCF8F3] border-[1px] px-4 pt-4 pb-0">
//         <Carousel className="w-full ">
//           <CarouselContent className="h-full">
//             {images.map((src, index) => (
//               <CarouselItem
//                 key={index}
//                 className={cn(
//                   index === selectedIndex ? "block" : "hidden",
//                   "h-full rounded-none"
//                 )}
//               >
//                 <Card className="w-full h-full rounded-none">
//                   <img
//                     src={src}
//                     alt={`Carousel ${index + 1}`}
//                     className="w-full h-full object-cover rounded-none"
//                   />
//                 </Card>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//         </Carousel>
//         <div className="flex flex-col items-center justify-center py-6">
//           <div className="w-full">
//             <div className="flex justify-between mb-4">
//               <label className="flex items-center space-x-2">
//                 <Input
//                   type="checkbox"
//                   className="h-4 w-4 border-gray-300 rounded "
//                 />
//                 <span className="text-secondary font-semibold">
//                   Rental Quotation
//                 </span>
//               </label>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   className="h-4 w-4 border-secondary rounded text-primary "
//                 />
//                 <span className="text-secondary font-semibold">
//                   Purchase Request
//                 </span>
//               </label>
//               <label className="flex items-center space-x-2">
//                 <input
//                   type="checkbox"
//                   className="h-4 w-4 border-gray-300 rounded text-purple-600 focus:ring-2 focus:ring-purple-500"
//                 />
//                 <span className="text-secondary font-semibold">
//                   Customization Request
//                 </span>
//               </label>
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
//               <input
//                 type="text"
//                 placeholder="Contact Person"
//                 className="w-full border border-secondary  rounded-lg px-3 py-2 "
//               />
//               <input
//                 type="text"
//                 placeholder="Phone/Mobile Number"
//                 className="w-full border border-secondary  rounded-lg px-3 py-2 "
//               />
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className="w-full border border-secondary  rounded-lg px-3 py-2 "
//               />
//               <input
//                 type="text"
//                 placeholder="Country"
//                 className="w-full border border-secondary  rounded-lg px-3 py-2 "
//               />
//               <input
//                 type="text"
//                 placeholder="Event Name"
//                 className="w-full border border-secondary  rounded-lg px-3 py-2 "
//               />
//               <input
//                 type="text"
//                 placeholder="Event City"
//                 className="w-full border border-secondary  rounded-lg px-3 py-2 "
//               />
//             </div>

//             <textarea
//               placeholder="Description/Message/Customizations"
//               className="w-full border border-secondary  rounded-lg px-3 py-2 "
//               rows="4"
//             ></textarea>
//           </div>
//           <Button className="transition-all py-4 px-6 duration-150 bg-secondary hover:text-white hover:bg-secondary font-semibold mt-4 self-end rounded text-white">
//             Get Quote
//           </Button>
//         </div>
//       </div>

//       {/* Details */}
//       <ul className="flex flex-col gap-2 text-secondary">
//         <div className="flex gap-3 mb-8 text-primary underline font-semibold text-sm">
//           <span>Home/</span>
//           <span>Booth By Size/</span>
//           <span>10x10/</span>
//         </div>
//         <h2 className="text-xl font-semibold mb-4">Package Includes:</h2>
//         {packageDetails.map((detail, index) => (
//           <li key={index} className="flex items-center gap-2">
//             <span className="text-[#B0CB1F]">◆</span>
//             {detail}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PhoneInput from "react-phone-input-2";
import { submitBoothCodeForm } from "@/server/actions/forms";
const imagegroup1 = [
  "/booth-2.jpeg", // Replace with actual image URLs
  "/booth-4.jpeg",
  "/booth-3.jpeg",
  "/booth-1.jpeg",
];

const imagegroup2 = ["/booth-code-6.jpeg", "/booth-code-3.jpeg"];

const imagegroup3 = ["/booth-code-4.jpeg", "/booth-code-5.jpeg"];

const imagegroup4 = [
  "/booth-code-9.webp",
  "/booth-code-10.webp",
  "/booth-code-11.webp",
];

const imagegroup5 = [
  "/booth-code-13.webp",
  "/booth-code-14.webp",
  "/booth-code-15.webp",
];

const imagegroup6 = [
  "/booth-code-16.webp",
  "/booth-code-17.webp",
  "/booth-code-18.webp",
  "/booth-code-19.webp",
];

const packageDetails = [
  "Booth as per design",
  "Graphics as per client",
  "Lights (as shown)",
  "Counter (as per stock)",
  "Flooring (single colour carpet/vinyl)",
  "Furniture (as per stock)",
  "Audio-Visual (as per design)",
  "Shipping/Installation/Dismantling",
  "Booth Vacuuming",
  "Project Management",
];

const CarouselImages = ({
  boothCode,
  images,
  index,
  selectedIndex,
  handleThumbnailClick,
}) => {
  return (
    <div className="flex flex-col md:mt-16 items-start gap-8">
      <h3 className="text-[1.4rem]  md:block hidden text-secondary font-semibold ">
        {boothCode}
      </h3>
      <div className="w-full mt-6 md:mt-0 grid md:grid-cols-1 grid-cols-3  gap-6">
        {images.map((src, index) => (
          <Image
            width={150}
            height={100}
            key={index}
            src={src}
            alt={`Thumbnail ${index + 1}`}
            className={cn(
              "w-full grayscale h-20 object-cover rounded cursor-pointer",
              index === selectedIndex ? "grayscale-0" : ""
            )}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

const BoothForm = () => {
  const [countryCode, setCountryCode] = useState("us");
  const [selectedValue, setSelectedValue] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    budget: "",
    eventName: "",
    eventCity: "",
    file: "",
    country: "",
    eventDate: "",
    email: "",
    phoneNumber: "",
    boothSize: "",
    message: "",
    url: "",
    requestType: "",
    country: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedValue((prevValue) => (prevValue === value ? "" : value));
  };
  // Handle phone number input
  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { requestType, ...otherFields } = formData;

    const formattedData = {
      ...otherFields,
      rentalQuotation: requestType === "rental",
      purchaseRequest: requestType === "purchase",
      customizationRequest: requestType === "customization",
    };

    console.log("Formatted Data Submitted:", formattedData);

    const resp = await submitBoothCodeForm(formattedData, "home");
    console.log(resp);
  };
  useEffect(() => {
    const fetchCountryCode = async () => {
      try {
        const response = await fetch("http://ip-api.com/json/");
        const data = await response.json();
        if (data && data.countryCode) {
          setCountryCode(data.countryCode.toLowerCase());
        }
      } catch (error) {
        console.error("Error fetching country code:", error);
      }
    };
    fetchCountryCode();

    setFormData((prevData) => ({
      ...prevData,
      url: window.location.href,
    }));
  }, []);
  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="w-full">
        <div className="flex justify-between mb-4">
          <label className="flex items-center gap-x-2">
            <Input
              type="radio"
              name="requestType"
              value="rental"
              checked={selectedValue === "rental"}
              className="h-4 w-4 border-gray-300 rounded"
              onChange={handleRadioChange}
            />
            <span className="text-secondary font-semibold">
              Rental Quotation
            </span>
          </label>
          <label className="flex items-center gap-x-2">
            <Input
              type="radio"
              name="requestType"
              value="purchase"
              checked={selectedValue === "purchase"}
              className="h-4 w-4 border-gray-300 rounded text-primary"
              onChange={handleRadioChange}
            />
            <span className="text-secondary font-semibold">
              Purchase Request
            </span>
          </label>
          <label className="flex items-center gap-x-2">
            <Input
              type="radio"
              name="requestType"
              value="customization"
              checked={selectedValue === "customization"}
              className="h-4 w-4 border-gray-300 rounded"
              onChange={handleRadioChange}
            />
            <span className="text-secondary font-semibold">
              Customization Request
            </span>
          </label>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Input
              type="text"
              placeholder="Contact Person"
              className="w-full border border-gray-300  rounded-lg px-3 py-2 bg-white"
              name="name"
              onChange={handleChange}
            />
          </div>
          <PhoneInput
            country={countryCode}
            value={formData.phoneNumber}
            onChange={handlePhoneChange}
            className="booth-code-phone-input"
          />
          <div>
            <Input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300  rounded-lg px-3 py-2 bg-white"
              onChange={handleChange}
              name="email"
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Country"
              className="w-full border border-gray-300  rounded-lg px-3 py-2 bg-white"
              onChange={handleChange}
              name="country"
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Event Name"
              className="w-full border border-gray-300  rounded-lg px-3 py-2 bg-white "
              onChange={handleChange}
              name="eventName"
            />
          </div>
          <div>
            <Input
              type="text"
              placeholder="Event City"
              className="w-full border border-gray-300  rounded-lg px-3 py-2 bg-white "
              onChange={handleChange}
              name="eventCity"
            />
          </div>
          <div className="md:col-span-3 col-span-2">
            <Input
              type="text"
              placeholder="Your Budget"
              className="w-full border col-span-3  border-gray-300  rounded-lg px-3 py-2 bg-white "
              onChange={handleChange}
              name="budget"
            />
          </div>
        </div>
        <textarea
          placeholder="Description/Message/Customizations"
          className="w-full border border-gray-300  rounded-lg px-3 py-2 "
          rows="4"
          onChange={handleChange}
          name="message"
        ></textarea>
      </div>
      <Button
        className="transition-all py-4 px-6 duration-150 bg-secondary hover:text-white hover:bg-secondary font-semibold mt-4 self-end rounded text-white"
        onClick={handleSubmit}
      >
        Get Quote
      </Button>
    </div>
  );
};

const PackageDetails = ({ boothData }) => {
  return (
    <ul className="flex flex-1 md:w-max flex-col mx-auto gap-2 text-secondary">
      <div className="hidden md:flex text-center gap-3 mb-8 text-primary underline font-semibold text-sm">
        <span>Home/</span>
        <span>Booth By Size/</span>
        <span>10x10/</span>
      </div>
      <h2 className="text-xl mt-8 md:mt-0 font-semibold mb-4">
        Package Includes:
      </h2>
      <div
        id="package"
        className="font-medium text-lg"
        dangerouslySetInnerHTML={{ __html: boothData.packge_description }}
      ></div>
    </ul>
  );
};

export function BoothDetails({ boothCode, boothData }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  let images;

  if (boothCode === "CEL101001") images = imagegroup1;
  else if (boothCode === "CEL101002") images = imagegroup2;
  else if (boothCode === "CEL101003") images = imagegroup3;
  else if (boothCode === "CEL101004") images = imagegroup4;
  else if (boothCode === "CEL101005") images = imagegroup5;
  else if (boothCode === "CEL101006") images = imagegroup6;
  else images = [...boothData.all_images];

  const handlePrevious = () => {
    setSelectedIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  const handleNext = () => {
    console.log("~handle next");
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const handleThumbnailClick = (index) => {
    setSelectedIndex(index);
  };

  if (!boothData) return <div>No Data Found</div>;

  return (
    <>
      <div className="bg-background gap-12 hidden md:flex flex-wrap justify-center pr-16 py-7 px-32">
        {/*Thumbnails */}
        <CarouselImages
          boothCode={boothCode}
          images={images}
          index={selectedIndex}
          selectedIndex={selectedIndex}
          handleThumbnailClick={handleThumbnailClick}
        />
        {/* Carousel */}
        <div className="relative flex-[3_3_0%] mt-16 bg-[#FCF8F3] border-[1px] px-4 pt-4 pb-0">
          <Carousel className="w-full ">
            <CarouselContent className="h-full">
              {images.map((src, index) => (
                <CarouselItem
                  key={index}
                  className={cn(
                    index === selectedIndex ? "block" : "hidden",
                    "h-full rounded-none"
                  )}
                >
                  <Card className="w-full h-full rounded-none">
                    <Image
                      width={1100}
                      height={1000}
                      src={src}
                      alt={`Carousel ${index + 1}`}
                      className="w-full h-full object-cover rounded-none"
                    />
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <BoothForm />
        </div>

        {/* Details */}
        <PackageDetails boothData={boothData} />
      </div>
      <div className="flex md:hidden flex-col px-8 py-6">
        <h3 className="text-[1.4rem] text-center text-secondary font-semibold ">
          {boothCode}
        </h3>
        <Carousel className="w-full mt-6">
          <CarouselContent className="h-full">
            {images.map((src, index) => (
              <CarouselItem
                key={index}
                className={cn(
                  index === selectedIndex ? "block" : "hidden",
                  "h-full rounded-none"
                )}
              >
                <Card className="w-full h-full rounded-none">
                  <Image
                    width={1100}
                    height={1000}
                    src={src}
                    alt={`Carousel ${index + 1}`}
                    className="w-full h-full object-cover rounded-none"
                  />
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <CarouselImages
          boothCode={boothCode}
          images={images}
          index={selectedIndex}
          selectedIndex={selectedIndex}
          handleThumbnailClick={handleThumbnailClick}
        />
        <BoothForm />
        {/* Details */}
        <PackageDetails boothData={boothData} />
      </div>
    </>
  );
}
