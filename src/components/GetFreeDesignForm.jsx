"use client";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { submitGetFreeDesignForm } from "@/server/actions/forms";
import InputFile from "./ui/input-file";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const GetFreeDesignForm = ({setOpen}) => {
  const [countryCode, setCountryCode] = useState("us");
  const [loading,setLoading] = useState(false)
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    country: "US",
    eventName: "",
    eventCity: "",
    company: "",
    boothSize: "",
    budget: "",
    boothSize: "",
    file: [],
    message: "",
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
    setLoading(true);
    try {
      e.preventDefault();
      const ApiData = new FormData();
      ApiData.append("name", formData.name);
      ApiData.append("email", formData.email);
      ApiData.append("phone", formData.phoneNumber);
      ApiData.append("message", formData.message);
      ApiData.append("budget", formData.budget);
      formData.file.forEach((file) => {
        ApiData.append("files", file);
      });
      ApiData.append("company", formData.company);
      ApiData.append("eventName", formData.eventName);
      ApiData.append("eventCity", formData.eventCity);
      ApiData.append("boothSize", formData.boothSize);
      ApiData.append("country", formData.country);
      console.log("Form Data Submitted:", formData);
      const resp = await submitGetFreeDesignForm(ApiData, window.location.pathname);
      console.log(resp);

      if (!resp.success) {
        toast.error("Something went wrong. Please try again later.");
        return;
      }

      toast.success("Enquiry submitted successfully.");
      setOpen(false);
      router.push("/thank-you");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit form. Please try again later.");
    }finally {
      setLoading(false);
    }
    
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
          disabled={loading}
          required
          name="name"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          type="email"
          placeholder="Enter Your Email"
          onChange={handleChange}
          disabled={loading}
          required
          name="email"
        />
        <PhoneInput
          country={countryCode}
          value={formData.phoneNumber}
          onChange={handlePhoneChange}
          disabled={loading}
          inputStyle={{ width: "100%", marginBottom: "10px" }}
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          type="text"
          value={formData.country}
          placeholder="Enter Your Country"
          onChange={handleChange}
          disabled={loading}
          required
          name="country"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          type="text"
          placeholder="Enter Your Company"
          onChange={handleChange}
          disabled={loading}
          required
          name="company"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          type="text"
          placeholder="Enter Your Budget"
          onChange={handleChange}
          required
          disabled={loading}
          name="budget"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          type="text"
          placeholder="Enter Your Event Name"
          onChange={handleChange}
          disabled={loading}
          required
          name="eventName"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          type="text"
          placeholder="Enter Your Event City"
          onChange={handleChange}
          disabled={loading}
          required
          name="eventCity"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          type="text"
          placeholder="Enter Your Booth Size"
          onChange={handleChange}
          disabled={loading}
          required
          name="boothSize"
        />
        <InputFile value={formData.file} onChange={(e)=> setFormData({ ...formData, file: e })} />
        <textarea
          rows={4}
          className="border p-2 border-[#CACACA] placeholder:text-secondary/70 rounded-lg"
          placeholder="Message"
          disabled={loading}
          name="message"
          onChange={handleChange}
        />
        <Button
          disabled={loading}
          onClick={handleSubmit}
          className="w-1/3 mx-auto bg-transparent border-2 border-secondary text-secondary hover:text-white font-semibold py-2 rounded hover:bg-secondary "
        >
          Send Enquiry
          {loading && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>}
        </Button>
      </div>
    </div>
  );
};

export default GetFreeDesignForm;
