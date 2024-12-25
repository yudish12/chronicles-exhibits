"use client";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { submitScheduleCallForm } from "@/server/actions/forms";

const ScheduleCallForm = () => {
  const [countryCode, setCountryCode] = useState("us");
  const [formData, setFormData] = useState({
    country: "",
    email: "",
    phoneNumber: "",
    callDate: "",
    callTime: "",
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
    const resp = await submitScheduleCallForm(formData, "home");
    console.log(resp);
  };

  return (
    <div
      style={{
        width: "100%",
        margin: "16px auto",
        padding: "20px",
      }}
    >
      <h5 className="text-3xl mt-4 text-center font-semibold heading-font text-secondary">
        Enquiry Form
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
          type="date"
          name="callDate"
          onChange={handleChange}
          required
          min={new Date().toISOString().split("T")[0]}
        />
        <select
          name="callTime"
          className="border border-[#CACACA] text-secondary/70 p-2 rounded-lg"
          onChange={handleChange}
          required
          value={formData.callTime}
        >
          <option value="" disabled>
            Best Time to call
          </option>
          {generateTimeSlots().map((slot, index) => (
            <option key={index} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          placeholder="url"
          value={formData.url}
          type="hidden"
          style={{display : "none"}}
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
          Get Quote
        </Button>
      </div>
    </div>
  );
};

export default ScheduleCallForm;