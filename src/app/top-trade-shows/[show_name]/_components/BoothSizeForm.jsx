"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { submitBoothForm } from "@/server/actions/forms";
const BoothSizeForm = ({ eventName, eventCity, date }) => {
  console.lo;
  const [countryCode, setCountryCode] = useState("us");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    budget: "",
    eventName: eventName,
    eventCity: eventCity,
    file: "",
    country: "",
    eventDate: date,
    email: "",
    phoneNumber: "",
    boothSize: "",
    message: "",
    url: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle phone number input
  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    const resp = await submitBoothForm(formData, "home");
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
    <div className="shadow-one h-max bg-white p-6 rounded-xl w-full">
      <p className="text-center text-secondary">
        Need exhibit displays for the ASI Show?Reach out to us for a hassle-free
        experience.
      </p>
      <h5 className="text-2xl mt-4 text-center font-semibold heading-font text-secondary">
        Enquiry Form
      </h5>
      <div className="mt-4 flex flex-col gap-5">
        <Input
          className="border-secondary/70 text-secondary placeholder:text-secondary/70"
          type="text"
          placeholder="Enter Your Name"
          onChange={handleChange}
          name="name"
        />
        <Input
          className="border-secondary/70 text-secondary placeholder:text-secondary/70"
          type="text"
          placeholder="Enter Your Company"
          onChange={handleChange}
          name="company"
        />
        <Input
          className="border-secondary/70 text-secondary/70 placeholder:text-secondary/70"
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
        />
        <Input
          className="border-secondary/70 text-secondary/70 placeholder:text-secondary/70"
          type="text"
          placeholder="Booth Size"
          onChange={handleChange}
          required
          name="boothSize"
        />
        <Input
          className="border-secondary/70 text-secondary placeholder:text-secondary/70"
          type="text"
          placeholder="Budget"
          onChange={handleChange}
          name="budget"
        />
        <Input
          className="border-secondary/70 text-secondary placeholder:text-secondary/70"
          type="text"
          placeholder="Country Name"
          onChange={handleChange}
          name="country"
        />
        <Input
          className="border-secondary/70 text-secondary placeholder:text-secondary/70"
          type="text"
          placeholder="Event Name"
          onChange={handleChange}
          name="eventName"
          style={{
            display: "none",
          }}
        />
        <Input
          className="border-secondary/70 text-secondary/70 placeholder:text-secondary/70"
          placeholder="Event Date"
          type="date"
          name="eventDate"
          onChange={handleChange}
          required
          min={new Date().toISOString().split("T")[0]}
          style={{
            display: "none",
          }}
        />
        <Input
          className="border-secondary/70 text-secondary placeholder:text-secondary/70"
          type="text"
          placeholder="Event City"
          onChange={handleChange}
          name="eventCity"
          style={{
            display: "none",
          }}
        />
        {/* <Input
            className="border-secondary/70 text-secondary/70 placeholder:text-secondary/70"
            type="number"
            placeholder="Enter Your Phone Number"

          /> */}
        <Input
          className="border-secondary/70 text-secondary placeholder:text-secondary/70"
          type="file"
          placeholder="Choose File"
          onChange={handleChange}
          name="file"
        />
        <Input
          className="border-secondary/70 text-secondary/70 placeholder:text-secondary/70"
          style={{ display: "none" }}
          placeholder="url"
          value={formData.url}
          type="text"
          name="url"
          readOnly
        />
        <textarea
          rows={4}
          className="border p-2 border-secondary/70 placeholder:text-secondary/70 rounded-lg"
          placeholder="Message"
          name="message"
          onChange={handleChange}
        />
        <Button
          className="w-1/3 mx-auto bg-transparent border-2 border-secondary text-secondary hover:text-white font-semibold py-2 rounded hover:bg-secondary "
          onClick={handleSubmit}
        >
          Send Enquiry
        </Button>
      </div>
    </div>
  );
};

export default BoothSizeForm;
