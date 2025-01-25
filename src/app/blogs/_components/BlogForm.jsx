"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitBlogForm } from "@/server/actions/forms";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import InputFile from "@/components/ui/input-file";
import { toast } from "sonner";
import { usePathname } from "next/navigation";
import { getPageNameAndUrl } from "@/utils";
import { emailRegex , phoneRegex } from "@/utils/constants/regex";
const BlogForm = ({source}) => {
  const [countryCode, setCountryCode] = useState("us");
  const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    file: [],
    boothSize: "",
    country: "",
    message: "",
    url: window.location.origin+"/"+source,
  });
  const path = usePathname();
  const obj = getPageNameAndUrl(path);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handlePhoneChange = (value) => {
    // Ensure the value starts with "+"
    const formattedValue = value.startsWith("+") ? value : `+${value}`;
    setFormData({ ...formData, phoneNumber: formattedValue });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      setLoading(false);
      return;
    }
  
    // Validate phone number
    const digitCount = formData.phoneNumber.length;
    if (!phoneRegex.test(formData.phoneNumber) || digitCount < 11) {
      toast.error("Please enter a valid phone number.");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      // e.preventDefault();
      console.log(formData)
      const ApiData = new FormData();
      ApiData.append("name", formData.name);
      ApiData.append("email", formData.email);
      ApiData.append("phone", formData.phoneNumber);
      ApiData.append("country", formData.country);
      ApiData.append("url",formData.url);
      ApiData.append("message", formData.message);
      ApiData.append("boothSize", formData.boothSize);
      formData.file.forEach((file) => {
        ApiData.append("files", file);
      });
      console.log("form data" , formData)
      console.log("Form Data Submitted:", formData);
      const resp = await submitBlogForm(ApiData, `${source}`);
      console.log(resp);
      toast.success("Enquiry submitted successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit form. Please try again later.");
    }finally {
      setLoading(false);
    }
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
    <div className="mt-6 lg:max-w-[350px] 2xl:max-w-[420px] w-full mx-auto space-y-4 bg-white shadow-one p-10 py-4  rounded-lg flex flex-col justify-center items-center ">
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
          disabled={loading}
          onChange={handleChange}
          required
          name="name"
        />
        <Input
          placeholder="Your Email"
          className="w-full shadow-two placeholder:black py-2 border-0"
          type="email"
          disabled={loading}
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
          disabled={loading}
          onChange={handlePhoneChange}
        />
        <InputFile className={"block"} value={formData.file} onChange={(files)=> setFormData({ ...formData, file: files })} />
        <Input
          placeholder="Your Country Name"
          disabled={loading}
          className="w-full shadow-two placeholder:black py-2 border-0 "
          type="country"
          onChange={handleChange}
          required
          name="country"
        />
        <Input
          placeholder="Booth Size"
          disabled={loading}
          className="w-full shadow-two placeholder:black py-2 border-0"
          type="boothSize"
          onChange={handleChange}
          required
          name="boothSize"
        />
        <Textarea
          placeholder="Tell us about your requirements"
          disabled={loading}
          className="w-full shadow-two placeholder:black py-2 border-0"
          rows={3}
          type="message"
          onChange={handleChange}
          required
          name="message"
        />
        <Button
          type="submit"
          disabled={loading}
          className=" bg-primary hover:bg-primary hover:text-secondary text-white shadow-one font-bold "
        >
          Sumbit Enquuiry
          {loading && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>}
        </Button>
      </form>
    </div>
  );
};
export default BlogForm;
