"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitBlogForm } from "@/server/actions/forms";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
const BlogForm = () => {
  const [countryCode, setCountryCode] = useState("us");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    eventName: "",
    file: "",
    boothSize: "",
    message: "",
    url: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    const resp = await submitBlogForm(formData, "home");
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
    <div className="mt-6 lg:w-4/5 w-full mx-auto space-y-4 bg-white shadow-one p-10 py-4  rounded-lg flex flex-col justify-center items-center ">
      <div className="w-[98%] h-[90%] rounded-lg py-2 ">
        <h3 className="text-2xl text-center heading-font text-secondary ">
          GET BOOTH QUOTE
        </h3>
      </div>
      <form
        className="gap-6 w-full mt-2 pt-4 flex flex-col "
        onSubmit={handleSubmit}
      >
        <Input
          placeholder="Your Name"
          className="w-full shadow-two placeholder:black py-2 border-0"
          type="name"
          onChange={handleChange}
          required
          name="name"
        />
        <Input
          placeholder="Your Email"
          className="w-full shadow-two placeholder:black py-2 border-0"
          type="email"
          onChange={handleChange}
          required
          name="email"
        />
        {/* <Input
            placeholder="Phone Number"
            className="w-full shadow-two placeholder:black py-2 border-0"
            type="email"
            onChange={handleChange}
            required
            name="email"
      /> */}
        <PhoneInput
          country={countryCode}
          value={formData.phoneNumber}
          onChange={handlePhoneChange}
        />
        <Input
          placeholder="Event Name"
          className="w-full hidden shadow-two py-2 border-0 "
          type="eventName"
          onChange={handleChange}
          required
          name="eventName"
        />
        <Input
          placeholder="Choose File"
          className="w-full shadow-two placeholder:black py-2 border-0 "
          type="file"
          onChange={handleChange}
          required
          name="file"
        />
        <Input
          placeholder="Your Country Name"
          className="w-full shadow-two placeholder:black py-2 border-0 "
          type="country"
          onChange={handleChange}
          required
          name="country"
        />
        <Input
          placeholder="Booth Size"
          className="w-full shadow-two placeholder:black py-2 border-0"
          type="boothSize"
          onChange={handleChange}
          required
          name="boothSize"
        />
        <Textarea
          placeholder="Tell us about your requirements"
          className="w-full shadow-two placeholder:black py-2 border-0"
          rows={3}
          type="message"
          onChange={handleChange}
          required
          name="message"
        />
        <Button
          type="submit"
          className=" bg-primary hover:bg-primary hover:text-secondary text-white shadow-one font-bold "
        >
          Sumbit Enquuiry
        </Button>
      </form>
    </div>
  );
};
export default BlogForm;
