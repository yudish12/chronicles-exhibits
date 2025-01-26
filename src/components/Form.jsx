"use client";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { submitCallForm } from "@/server/actions/forms";
import { UploadButton } from "@uploadthing/react";
import { toast } from "sonner";
import InputFile from "./ui/input-file";
import { usePathname, useRouter } from "next/navigation";
import { getPageNameAndUrl } from "@/utils";
import { emailRegex , phoneRegex } from "@/utils/constants/regex";
const EnquiryForm = ({setOpen}) => {
  const [countryCode, setCountryCode] = useState("us");
  const [loading,setLoading] = useState(false)
  const page = usePathname();
  const obj = getPageNameAndUrl(page);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    company : "",
    email: "",
    phone: "",
    boothSize: "",
    eventName: "",
    eventCity: "",
    budget: "",
    file: [],
    url: obj.url,
    message: "",
  });

  // Fetch user's country code based on IP
  useEffect(() => {
    const fetchCountryCode = async () => {
      try {
        const response = await fetch("https://api.country.is");
        const data = await response.json();
        if (data && data.country) {
          setCountryCode(data.country.toLowerCase());
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
    // Ensure the value starts with "+"
    const formattedValue = value.startsWith("+") ? value : `+${value}`;
    setFormData({ ...formData, phone: formattedValue });
  };
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Validate email
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }
  
    // Validate phone number
    const digitCount = formData.phone.trim().length; // Count only digits
    if (!phoneRegex.test(formData.phone) || digitCount < 11) {
      toast.error("Please enter a valid phone number with at least 10 digits.");
      setLoading(false);
      return;
    }
  
    try {
      const ApiData = new FormData();
      ApiData.append("name", formData.name);
      ApiData.append("email", formData.email);
      ApiData.append("phone", formData.phone);
      ApiData.append("message", formData.message);
      ApiData.append("budget", formData.budget);
      formData.file.forEach((file) => {
        ApiData.append("files", file);
      });
      ApiData.append("company", formData.company);
      ApiData.append("eventName", formData.eventName);
      ApiData.append("url",formData.url);
      ApiData.append("eventCity", formData.eventCity);
      ApiData.append("boothSize", formData.boothSize);
  
      const resp = await submitCallForm(ApiData, obj.name);
      console.log(resp);
  
      if (!resp.success) {
        toast.error("Failed to submit form. Please try again later.");
        return;
      }
      toast.success("Enquiry submitted successfully.");
      if (setOpen) {
        setOpen(false);
      }
      router.push("/thank-you");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit form. Please try again later.");
    } finally {
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
          value={formData.phone}
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
        <InputFile value={formData.file} onChange={(e)=> setFormData({ ...formData, file: e })} />
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
          {loading && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>}
        </Button>
      </div>
    </div>
  );
};

export default EnquiryForm;
