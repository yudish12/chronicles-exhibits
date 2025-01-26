"use client";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { submitScheduleCallForm } from "@/server/actions/forms";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { getPageNameAndUrl } from "@/utils";
import { emailRegex , phoneRegex } from "@/utils/constants/regex";
const ScheduleCallForm = ({ setOpen }) => {
  const [countryCode, setCountryCode] = useState("us");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const path = usePathname();
  const {name, url} = getPageNameAndUrl(path);
  const [formData, setFormData] = useState({
    country: "",
    email: "",
    phone: "",
    callDate: "",
    callTime: "",
    timeZone: "",
    message: "",
    url: url,
    name: "",
  });

  const generateTimeSlots = () => {
    const timeSlots = [];
    for (let i = 1; i < 24; i += 2) {
      const start = i.toString().padStart(2, "0") + ".00";
      const end = ((i + 2) % 24).toString().padStart(2, "0") + ".00";
      timeSlots.push(`${start} - ${end}`);
    }
    return timeSlots;
  };

  useEffect(() => {
    const fetchCountryCode = async () => {
      try {
        const response = await fetch("https://api.country.is");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.country &&
      formData.phone &&
      formData.callDate &&
      formData.callTime
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {email , phone} = formData;
    if(!emailRegex.test(email)){
      toast.error("Please enter a valid email address.")
      return false 
    }
    const digitCount = formData.phone.length; // Count only digits
    if (!phoneRegex.test(formData.phone) || digitCount < 11) {
      toast.error("Please enter a valid phone number with at least 10 digits.");
      setLoading(false);
      return;
    }
    if (!isFormValid()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const resp = await submitScheduleCallForm(formData, name);

      if (!resp.success) {
        toast.error("Failed to submit form. Please try again later.");
        return;
      }
      toast.success("Enquiry submitted successfully.");
      router.push("/thank-you");
      if (setOpen) {
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  const handlePhoneChange = (value) => {
    const formattedValue = value.startsWith("+") ? value : `+${value}`;
    setFormData({ ...formData, phone: formattedValue });
  };
  return (
    <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-lg">
      <h5 className="text-2xl sm:text-3xl font-semibold text-center text-secondary mb-6">
        Schedule a Call
      </h5>
      <form onSubmit={handleSubmit} className="grid gap-5 grid-cols-1 md:grid-cols-2">
        <Input
          className="border-[#CACACA] text-secondary placeholder:text-secondary/70"
          type="text"
          disabled={loading}
          placeholder="Enter Your Name"
          onChange={handleChange}
          required
          name="name"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          type="email"
          disabled={loading}
          placeholder="Enter Your Email"
          onChange={handleChange}
          required
          name="email"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          type="text"
          disabled={loading}
          placeholder="Enter Your Country"
          onChange={handleChange}
          required
          name="country"
        />
        <PhoneInput
          country={countryCode}
          disabled={loading}
          value={formData.phone}
          onChange={handlePhoneChange}
          inputStyle={{ width: "100%" }}
          inputClass="border-[#CACACA] text-secondary/70"
        />
        <Input
          className="border-[#CACACA] text-secondary/70 placeholder:text-secondary/70"
          type="date"
          disabled={loading}
          name="callDate"
          onChange={handleChange}
          required
          min={new Date().toISOString().split("T")[0]}
        />
        <Select
          name="callTime"
          disabled={loading}
          value={formData.callTime}
          onValueChange={(value) => {
            handleChange({ target: { name: "callTime", value } });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={"Best Time to Call"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {generateTimeSlots().map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <textarea
          rows={4}
          className="border p-2 border-[#CACACA] placeholder:text-secondary/70 rounded-lg col-span-1 md:col-span-2"
          placeholder="Message"
          name="message"
          disabled={loading}
          onChange={handleChange}
        />
        <Button
          disabled={loading}
          type="submit"
          className="w-full md:w-1/2 col-span-1 md:col-span-2 mx-auto bg-secondary text-white font-semibold py-3 rounded-md hover:bg-secondary-dark transition-all"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
          ) : (
            "Send Enquiry"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ScheduleCallForm;
