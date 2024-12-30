"use client";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { submitGetFreeDesignForm } from "@/server/actions/forms";

const GetFreeDesignForm = () => {
  const [countryCode, setCountryCode] = useState("us");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    country: "",
    eventName: "",
    eventCity: "",
    boothSize: "",
    file: "",
    timeZone: "",
    message: "",
    url: "",
  });

  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let i = 1; i < 24; i += 2) {
      const start = i.toString().padStart(2, "0");
      const end = ((i + 2) % 24).toString().padStart(2, "0");
      timeSlots.push(`${start}-${end}`);
    }
    return timeSlots;
  };

  // Fetch user's country code and set the current URL
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
    const resp = await submitGetFreeDesignForm(formData, "home");
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
        Get Free 3D Design
      </h5>
      <div className="mt-4 flex flex-col gap-5">
        <Input
          className="border-[#CACACA] text-secondary placeholder:text-secondary/70"
          type="text"
          placeholder="Enter Your Name"
          onChange={handleChange}
          required
          name="name"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          type="email"
          placeholder="Enter Your Email"
          onChange={handleChange}
          required
          name="email"
        />
        <PhoneInput
          country={countryCode}
          value={formData.phoneNumber}
          onChange={handlePhoneChange}
          inputStyle={{ width: "100%", marginBottom: "10px" }}
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          type="text"
          placeholder="Enter Your Country"
          onChange={handleChange}
          required
          name="country"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          type="text"
          placeholder="Enter Your Company"
          onChange={handleChange}
          required
          name="company"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          type="text"
          placeholder="Enter Your Budget"
          onChange={handleChange}
          required
          name="budget"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          type="text"
          placeholder="Enter Your Event Name"
          onChange={handleChange}
          required
          name="eventName"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          type="text"
          placeholder="Enter Your Event City"
          onChange={handleChange}
          required
          name="eventCity"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          type="text"
          placeholder="Enter Your Booth Size"
          onChange={handleChange}
          required
          name="boothSize"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          type="file"
          placeholder="Choose File"
          onChange={handleChange}
          required
          name="file"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          placeholder="Timezone"
          value={formData.timeZone}
          onChange={handleChange}
          name="timeZone"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          placeholder="url"
          value={formData.url}
          type="hidden"
          style={{ display: "none" }}
          name="url"
          readOnly // Make it read-only since it's pre-filled
        />
        <textarea
          rows={4}
          className="border p-2 border-[#CACACA] placeholder:text-secondary/70 rounded-lg"
          placeholder="Message"
          name="message"
          onChange={handleChange}
        />
        <Button
          onClick={handleSubmit}
          className="w-1/3 mx-auto bg-transparent border-2 border-secondary text-secondary hover:text-white font-semibold py-2 rounded hover:bg-secondary "
        >
          Send Enquiry
        </Button>
      </div>
    </div>
  );
};

export default GetFreeDesignForm;
