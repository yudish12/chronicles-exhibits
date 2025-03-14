"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitBlogForm } from "@/server/actions/forms";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import InputFile from "@/components/ui/input-file";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { getPageNameAndUrl } from "@/utils";
import { emailRegex , phoneRegex } from "@/utils/constants/regex";
const BlogForm = ({source}) => {
  const [countryCode, setCountryCode] = useState("us");
  const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    file: [],
    boothSize: "",
    country: "",
    message: "",
    url: "",
  });
  const path = usePathname();
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handlePhoneChange = (value) => {
    // Ensure the value starts with "+"
    const formattedValue = value.startsWith("+") ? value : `+${value}`;
    setFormData({ ...formData, phone: formattedValue });
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
    const digitCount = formData.phone.length;
    if (!phoneRegex.test(formData.phone) || digitCount < 11) {
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
      ApiData.append("phone", formData.phone);
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
      router.push("/thank-you");
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
      url: window.location.origin+"/"+source,
    }));
  }, []);

  return (
    <div className="mt-6 lg:max-w-[350px] 2xl:max-w-[420px] w-full mx-auto space-y-4 bg-white p-6 shadow rounded-lg flex flex-col justify-center items-center ">
      <div className="w-[98%] h-[90%] rounded-lg py-2 ">
        <h3 className="text-2xl text-center heading-font text-secondary ">
          GET BOOTH QUOTE
        </h3>
      </div>
      <form
        className="gap-6 w-full mt-2 pt-4 flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col"
        onSubmit={handleSubmit}
      >
      <div>
        <Input
          placeholder="Your Name"
          className="border-[#CACACA] text-secondary placeholder:text-secondary/70"
          type="name"
          disabled={loading}
          onChange={handleChange}
          required
          name="name"
        />
        </div>
        <div>
        <Input
          placeholder="Your Email"
          className="border-[#CACACA] text-secondary placeholder:text-secondary/70"
          type="email"
          disabled={loading}
          onChange={handleChange}
          required
          name="email"
        />
        </div>
        {/* <Input
            placeholder="Phone Number"
            className="border-[#CACACA] text-secondary placeholder:text-secondary/70"
            type="email"
            onChange={handleChange}
            required
            name="email"
      /> */}
      <div>
        <PhoneInput
          country={countryCode}
          value={formData.phone}
          disabled={loading}
          onChange={handlePhoneChange}
        />
        </div>
        <div>
        <InputFile value={formData.file} onChange={(files)=> setFormData({ ...formData, file: files })} />
        </div>
        <div>
        <Input
          placeholder="Your Country Name"
          disabled={loading}
         className="border-[#CACACA] text-secondary placeholder:text-secondary/70"
          type="country"
          onChange={handleChange}
          required
          name="country"
        />
        </div>
        <div>
        <Input
          placeholder="Booth Size"
          disabled={loading}
          className="border-[#CACACA] text-secondary placeholder:text-secondary/70"
          type="boothSize"
          onChange={handleChange}
          required
          name="boothSize"
        />
        </div>
        <div className="col-span-2">
        <Textarea
          placeholder="Tell us about your requirements"
          disabled={loading}
          className="border-[#CACACA] text-secondary placeholder:text-secondary/70"
          rows={3}
          type="message"
          onChange={handleChange}
          required
          name="message"
        />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-1/3 mx-auto col-span-2 bg-primary text-secondary hover:text-black font-semibold py-2 rounded hover:bg-primary"
        >
          Sumbit Enquuiry
          {loading && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>}
        </Button>
      </form>
    </div>
  );
};
export default BlogForm;
