"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputFile from "@/components/ui/input-file";
import { contactUsForm } from "@/server/actions/forms";
import { getPageNameAndUrl } from "@/utils";
import { emailRegex, phoneRegex } from "@/utils/constants/regex";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { toast } from "sonner";

const Queryform = () => {
  const [countryCode, setCountryCode] = useState("us");
  const [loading, setLoading] = useState(false);
  const path = usePathname()
  const router = useRouter();

  const obj = getPageNameAndUrl(path);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    file: [],
    budget: "",
    message: "",
    url: window.location.origin + "/" + obj.url,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handlePhoneChange = (value) => {
    // Ensure the value starts with "+"
    const formattedValue = value.startsWith("+") ? value : `+${value}`;
    setFormData({ ...formData, phone: formattedValue });
  };

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

    setFormData((prevData) => ({
      ...prevData,
      url: window.location.href,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error("Please fill all fields");
      setLoading(false);
      return;
    }
    if(!emailRegex.test(formData.email)){
      toast.error("Please enter a valid email address.")
      setLoading(false);
      return false 
    }
    const digitCount = formData.phone.length;
    if (!phoneRegex.test(formData.phone) || digitCount < 11) {
      toast.error("Please enter a valid phone number.");
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
      ApiData.append("url", formData.url);
      const resp = await contactUsForm(ApiData, obj.name);

      if (!resp.success) {
        toast.error("Something went wrong. Please try again later.");
        return;
      }
      toast.success("Enquiry submitted successfully.");
      setLoading(false);
      router.push("/thank-you");

    } catch (error) {
      console.log(error);
      toast.error("Failed to submit form. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{ height: "630px" }}
      className=" p-2 px-6 sm:p-8 booth-design-bg-query md:p-12 pb-20 flex flex-col overflow-y-auto items-center gap-4"
    >
      <h2 className="heading-font text-white text-center text-xl sm:text-2xl md:text-3xl uppercase font-semibold">
        Describe Your Trade Show Booth Requirements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-6 gap-4 sm:gap-6 w-full sm:w-[80%] md:w-[64%]">
        <Input
          value={formData.name}
          onChange={handleChange}
          required
          name="name"
          disabled={loading}
          placeholder="Person/Company Name"
          className="bg-gray-300 border-primary placeholder:text-secondary/50 border-2 text-black py-5 rounded-lg"
        />
        <Input
          value={formData.email}
          onChange={handleChange}
          required
          name="email"
          disabled={loading}
          placeholder="Email ID"
          className="bg-gray-300 border-primary placeholder:text-secondary/50 border-2 text-black py-5 rounded-lg"
        />
        <PhoneInput
          country={countryCode}
          value={formData.phone}
          disabled={loading}
          className="query-form-phone-input"
          onChange={handlePhoneChange}
        />
        <Input
          value={formData.budget}
          onChange={handleChange}
          required
          name="budget"
          disabled={loading}
          placeholder="Budget"
          className="bg-gray-300 border-primary placeholder:text-secondary/50 border-2 text-black py-5 rounded-lg"
        />
        <InputFile className={"bg-gray-300 border-primary placeholder:text-secondary/50 border-2 text-black py-5 rounded-lg"} value={formData.file} onChange={(files) => setFormData({ ...formData, file: files })} />
        <textarea
          rows={3}
          value={formData.message}
          onChange={handleChange}
          required
          name="message"
          disabled={loading}
          placeholder="Message/Customisations"
          className="bg-gray-300 border-primary placeholder:text-secondary/50 p-4 border-2 rounded-lg sm:col-span-2"
        ></textarea>
      </div>
      <Button
        style={{ transitionDuration: "500ms" }}
        disabled={loading}
        onClick={handleSubmit}
        type="button"
        className="bg-primary transition-500 hover:bg-primary rounded-full text-secondary transition-all text-lg font-semibold px-6 py-2"
      >
        Customize Now
      </Button>
    </div>
  );
};

export default Queryform;
