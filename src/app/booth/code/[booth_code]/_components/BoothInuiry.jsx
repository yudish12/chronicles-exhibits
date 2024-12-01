import React from 'react';
import { Button } from '@/components/ui/button';
const BoothEnquiry = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-[#FFF7F1] to-[#FFFFFF] py-10 px-4">
      <div className="max-w-xl w-full">
        <h2 className="text-center text-2xl font-semibold mb-6 text-secondary">Booth Enquiry</h2>

        <div className="flex justify-between mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded "
            />
            <span className='text-secondary'>Rental Quotation</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 border-secondary rounded text-secondary "
            />
            <span className='text-secondary'>Purchase Request</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 border-gray-300 rounded text-purple-600 focus:ring-2 focus:ring-purple-500"
            />
            <span className='text-secondary'>Customization Request</span>
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Contact Person"
            className="w-full border border-secondary  rounded-lg shadow-one px-3 py-2 "
          />
          <input
            type="text"
            placeholder="Phone/Mobile Number"
            className="w-full border border-secondary  rounded-lg shadow-one px-3 py-2 "
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-secondary  rounded-lg shadow-one px-3 py-2 "
          />
          <input
            type="text"
            placeholder="Country"
            className="w-full border border-secondary  rounded-lg shadow-one px-3 py-2 "
          />
          <input
            type="text"
            placeholder="Event Name"
            className="w-full border border-secondary  rounded-lg shadow-one px-3 py-2 "
          />
          <input
            type="text"
            placeholder="Event City"
            className="w-full border border-secondary  rounded-lg shadow-one px-3 py-2 "
          />
        </div>

        <textarea
          placeholder="Description/Message/Customizations"
          className="w-full border border-secondary  rounded-lg shadow-one px-3 py-2 "
          rows="4"
        ></textarea>
      </div>
      <Button
        className=" bg-transparent border-2 border-secondary text-secondary hover:text-white font-semibold py-2 mt-2 rounded hover:bg-secondary "
        >
          Get Quote
        </Button>
    </div>
  );
};

export default BoothEnquiry;
