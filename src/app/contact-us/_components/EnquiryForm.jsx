"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import InputFile from "@/components/ui/input-file";
import { contactUsForm } from "@/server/actions/forms";
import { toast } from "sonner";

const EnquiryForm = () => {
  const [files, setFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phoneNumber: "",
    budget: "",
    message: ""
  });

  const { name, email, phoneNumber, message, budget } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onFileChange = (files) => {
    console.log(files)
    setFiles(files);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    try {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append("files", file);
      });

      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phoneNumber);
      formData.append("message", message);
      formData.append("budget", budget);

      const resp = await contactUsForm(formData);

      if (!resp.success) {
        toast.error("Error submitting form. Please try again later.");
        return;
      }

      toast.success("Enquiry submitted successfully.");
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        eventName: "",
        eventCity: "",
        file: "",
        message: "",
        url: "",
      });
      setFiles([]);

    } catch (error) {
      console.log(error);
      toast.error("Failed to submit form. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white shadow-lg flex flex-col justify-center items-center py-10 px-6 sm:px-12 lg:px-16 rounded-lg max-w-4xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 leading-tight">
          ENQUIRE FOR THE BEST EXHIBIT DISPLAYS IN USA!
        </h1>
        <p className="text-gray-600 mt-4">
          Looking for a brilliant partner for trade show booth design and
          construction? There is no need to look further, put your query here
          now!
        </p>
      </div>

      {/* Form Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
        <Input
          value={formData.name}
          onChange={handleChange}
          required
          name="name"
          placeholder="Enter your name"
          className="bg-white border border-gray-300 placeholder:text-gray-500 text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
        />
        <Input
          value={formData.email}
          onChange={handleChange}
          required
          name="email"
          placeholder="Email ID"
          className="bg-white border border-gray-300 placeholder:text-gray-500 text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
        />
        <Input
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          name="phoneNumber"
          placeholder="Phone Number"
          className="bg-white border border-gray-300 placeholder:text-gray-500 text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
        />
        <Input
          value={formData.budget}
          onChange={handleChange}
          required
          name="budget"
          placeholder="Budget"
          className="bg-white border border-gray-300 placeholder:text-gray-500 text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
        />
        <textarea
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          name="message"
          placeholder="Additional information that you would like to add..."
          className="col-span-1 sm:col-span-2 bg-white border border-gray-300 placeholder:text-gray-500 text-gray-800 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
        ></textarea>
        <InputFile value={files} onChange={onFileChange} />
      </div>

      {/* Submit Button */}
      <div className="mt-8">
        <Button onClick={handleSubmit} className="bg-secondary text-white font-bold text-lg px-6 py-3 rounded-lg hover:bg-[#B0CB1F] hover:text-secondary transition-all"> 
          Submit your design
          {loading && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>}
        </Button>
      </div>
    </div>
  );
};

export default EnquiryForm;
