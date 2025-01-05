"use client";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { submitCallForm } from "@/server/actions/forms";
import { UploadButton } from "@uploadthing/react";

const EnquiryForm = () => {
  const [countryCode, setCountryCode] = useState("us");
  const [formData, setFormData] = useState({
    name: "",
    company : "",
    email: "",
    phoneNumber: "",
    boothSize: "",
    eventName: "",
    eventCity: "",
    budget: "",
    file: "",
    message: "",
  });

  // Fetch user's country code based on IP
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
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle phone number input
  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    const resp = await submitCallForm(formData, "home");
    console.log(resp);
  };

  return (
    <div
      style={{
        width: "100%",
        margin: "0px auto",
      }}
    >
      <h5 className="text-3xl mt-4 text-center font-semibold heading-font text-secondary">
        Enquiry Form
      </h5>
      <div className="mt-4 w-full flex flex-col lg:grid lg:grid-cols-2 gap-5">
        <Input
          className="border-[#CACACA] text-secondary placeholder:text-secondary/70 "
          type="text"
          placeholder="Enter Your Name"
          onChange={handleChange}
          required
          name="name"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70 "
          type="email"
          placeholder="Enter Your Email"
          onChange={handleChange}
          required
          name="email"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70 "
          placeholder="Enter Your Company"
          onChange={handleChange}
          required
          name="company"
        />
        <PhoneInput
          country={countryCode}
          value={formData.phoneNumber}
          onChange={handlePhoneChange}
          inputStyle={{ width: "100%", marginBottom: "10px" }}
        />
        <Input
          className=" border-[#CACACA] text-secondary/70 placeholder:text-secondary/70 "
          type="text"
          name="boothSize"
          placeholder="Booth Size"
          onChange={handleChange}
          required
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70 "
          placeholder="Enter Event Name"
          type="text"
          name="eventName"
          onChange={handleChange}
          required
        />
        <Input
          className="border-[#CACACA] text-secondary placeholder:text-secondary/70 "
          type="text"
          placeholder="Enter Event City"
          onChange={handleChange}
          required
          name="eventCity"
        />
        <Input
          className="border-[#CACACA] text-secondary placeholder:text-secondary/70 "
          type="text"
          placeholder="Enter Budget"
          onChange={handleChange}
          required
          name="budget"
        />
        <Input
          className="border-[#CACACA] text-secondary placeholder:text-secondary/70 "
          type="file"
          placeholder="Upload resources (optional)"
          onChange={(e) => setFormData({ ...formData, file: e.target.value })}
          name="file"
        />
        <textarea
          rows={4}
          className="border col-span-2 p-2 border-[#CACACA] placeholder:text-secondary/70 rounded-lg"
          placeholder="Message"
          name="message"
          onChange={handleChange}
        />
        <Button
          onClick={handleSubmit}
          className="w-1/3 mx-auto col-span-2 bg-transparent border-2 border-secondary text-secondary hover:text-white font-semibold py-2 rounded hover:bg-secondary "
        >
          Get Quote
        </Button>
      </div>
    </div>
  );
};

export default EnquiryForm;
