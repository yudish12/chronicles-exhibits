"use client";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const EnquiryForm = () => {
  const [countryCode, setCountryCode] = useState("us");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    boothSize: "",
    eventName: "",
    message: "",
  });

  // Fetch user's country code based on IP
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Enquiry Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter Your Name"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          onChange={handleChange}
          required
        />
        <PhoneInput
          country={countryCode}
          value={formData.phoneNumber}
          onChange={handlePhoneChange}
          inputStyle={{ width: "100%", marginBottom: "10px" }}
        />
        <input
          type="text"
          name="boothSize"
          placeholder="Booth Size"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="eventName"
          placeholder="Enter Event Name"
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          onChange={handleChange}
          rows="4"
          required
        ></textarea>
        <button
          type="submit"
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        >
          Get Quote
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;
