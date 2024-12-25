"use client"
import { useState } from 'react';
import { submitBoothCodeForm } from '@/server/actions/forms';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";export default function BoothEnquiryForm() {
  const [formData, setFormData] = useState({
    rentalQuotation: false,
    purchaseRequest: false,
    customizationRequest: false,
    contactPerson: '',
    phoneNumber: '',
    email: '',
    country: '',
    eventName: '',
    eventCity: '',
    message: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    const resp = await submitBoothCodeForm(formData, "home");
    console.log(resp);
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      url: window.location.href,
    }));
  }, []);


  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF7F1] to-[#FFFFFF] py-10 px-4">
      <div className="max-w-xl w-full">
        <h2 className="text-center text-2xl font-semibold mb-6 text-secondary">Booth Enquiry</h2>

        <div className="flex justify-between mb-4">
          <label className="flex items-center space-x-2">
            <Input
              type="checkbox"
              name="rentalQuotation"
              checked={formData.rentalQuotation}
              className="h-4 w-4 border-gray-300 rounded"
              onChange={handleChange}
            />
            <span className="text-secondary">Rental Quotation</span>
          </label>
          <label className="flex items-center space-x-2">
            <Input
              type="checkbox"
              name="purchaseRequest"
              checked={formData.purchaseRequest}
              className="h-4 w-4 border-secondary rounded text-secondary"
              onChange={handleChange}
            />
            <span className="text-secondary">Purchase Request</span>
          </label>
          <label className="flex items-center space-x-2">
            <Input
              type="checkbox"
              name="customizationRequest"
              checked={formData.customizationRequest}
              className="h-4 w-4 border-gray-300 rounded text-purple-600 focus:ring-2 focus:ring-purple-500"
              onChange={handleChange}
            />
            <span className="text-secondary">Customization Request</span>
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
          <Input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            placeholder="Contact Person"
            className="w-full border border-secondary rounded-lg shadow-one px-3 py-2"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            placeholder="Phone/Mobile Number"
            className="w-full border border-secondary rounded-lg shadow-one px-3 py-2"
            onChange={handleChange}
          />
          <Input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email Address"
            className="w-full border border-secondary rounded-lg shadow-one px-3 py-2"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="country"
            value={formData.country}
            placeholder="Country"
            className="w-full border border-secondary rounded-lg shadow-one px-3 py-2"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="eventName"
            value={formData.eventName}
            placeholder="Event Name"
            className="w-full border border-secondary rounded-lg shadow-one px-3 py-2"
            onChange={handleChange}
          />
          <Input
            type="text"
            name="eventCity"
            value={formData.eventCity}
            placeholder="Event City"
            className="w-full border border-secondary rounded-lg shadow-one px-3 py-2"
            onChange={handleChange}
          />
        </div>

        <Textarea
          name="message"
          value={formData.message}
          placeholder="Description/Message/Customizations"
          className="w-full border border-secondary rounded-lg shadow-one px-3 py-2"
          onChange={handleChange}
          rows="4"
        />
      </div>
      <Button
        className="bg-transparent border-2 border-secondary text-secondary hover:text-white font-semibold py-2 mt-2 rounded hover:bg-secondary"
        onClick={handleSubmit}
      >
        Get Quote
      </Button>
    </div>
  );
}
