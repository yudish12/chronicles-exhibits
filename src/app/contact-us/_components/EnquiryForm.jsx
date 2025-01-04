import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const EnquiryForm = () => {
  return (
    <div className=" bg-white shadow-one flex flex-col justify-center items-center py-8 px-10 rounded-lg">
      <div className="py-4 text-center">
        <h1 className="heading-font font-bold text-xl sm:text-2xl">
          ENQUIRE FOR THE BEST EXHIBIT DISPLAYS IN USA!
        </h1>
      </div>
      <div className="text-secondary py-4 text-center">
        <p>
          Looking for a brilliant partner for trade show booth design and
          construction? There is no need to look further, <br />
          put your query here now!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full sm:w-4/5">
        <Input
          placeholder="Enter your name"
          className="bg-white border-secondary  col-span-1 sm:col-span-3 placeholder:text-secondary/50 border-2 text-black py-4 px-4 rounded-lg"
        />
        <Input
          placeholder="Email ID"
          className="bg-white border-secondary placeholder:text-secondary/50 border-2 text-black py-4 px-4 rounded-lg"
        />
        <Input
          placeholder="Phone Number"
          className="bg-white border-secondary placeholder:text-secondary/50 border-2 text-black py-4 px-4 rounded-lg"
        />
        <Input
          placeholder="Budget"
          className="bg-white border-secondary placeholder:text-secondary/50 border-2 text-black py-4 px-4 rounded-lg"
        />
        <Input
          type="file"
          placeholder="Choose File"
          className="bg-white col-span-3 flex items-center justify-center border-secondary placeholder:text-secondary/50 border-2 text-black py-[28px] mb-6 px-4 rounded-lg"
        />
        <textarea
          rows={3}
          placeholder="Additional information that you would like to add..."
          className="bg-white border-secondary placeholder:text-secondary/50 p-4 border-2 rounded-lg col-span-1 sm:col-span-3"
        ></textarea>
      </div>
      <div className="py-6 text-center">
        <Button className="bg-secondary font-bold text-lg text-white px-8 py-3 rounded-lg hover:bg-[#B0CB1F] hover:text-secondary">
          Submit your design
        </Button>
      </div>
    </div>
  );
};

export default EnquiryForm;
