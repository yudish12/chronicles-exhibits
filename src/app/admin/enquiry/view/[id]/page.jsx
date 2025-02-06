// app/enquiries/[id]/page.jsx
import { getEnquiryById } from '@/server/actions/forms';
import React from 'react';

const Page = async ({ params }) => {
  const { id } = params;
  const enquiry = (await getEnquiryById(id)).data;
  console.log(enquiry);

  if (!enquiry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold">Enquiry not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-auto  bg-gray-100 py-4">
      {/* Responsive container */}
      <div className="mx-auto px-4">
        <div className="bg-white p-8 rounded-lg shadow">
          <h1 className="text-3xl font-bold mb-6 text-center">Enquiry Details</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* ID */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">ID</label>
              <div className="p-2 border rounded">{enquiry._id}</div>
            </div>
            {/* Name */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Name</label>
              <div className="p-2 border rounded">{enquiry.name}</div>
            </div>
            {/* Email */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Email</label>
              <div className="p-2 border rounded">{enquiry.email}</div>
            </div>
            {/* Phone */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Phone</label>
              <div className="p-2 border rounded">{enquiry.phone}</div>
            </div>
            {/* Country */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Country</label>
              <div className="p-2 border rounded">{enquiry.country}</div>
            </div>
            {/* Event Name */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Event Name</label>
              <div className="p-2 border rounded">{enquiry.eventName || 'N/A'}</div>
            </div>
            {/* Event City */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Event City</label>
              <div className="p-2 border rounded">{enquiry.eventCity || 'N/A'}</div>
            </div>
            {/* File */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">File</label>
              <div className="p-2 border rounded">{enquiry.file || 'N/A'}</div>
            </div>
            {/* Message - full width */}
            <div className="flex flex-col sm:col-span-2">
              <label className="font-semibold mb-1">Message</label>
              <div className="p-2 border rounded whitespace-pre-wrap">{enquiry.message}</div>
            </div>
            {/* Page Source */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Page Source</label>
              <div className="p-2 border rounded">{enquiry.page_source}</div>
            </div>
            {/* Booth Size */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Booth Size</label>
              <div className="p-2 border rounded">{enquiry.boothSize || 'N/A'}</div>
            </div>
            {/* URL - full width */}
            <div className="flex flex-col sm:col-span-2">
              <label className="font-semibold mb-1">URL</label>
              <div className="p-2 border rounded">
                {enquiry.url ? (
                  <a
                    href={enquiry.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {enquiry.url}
                  </a>
                ) : (
                  'N/A'
                )}
              </div>
            </div>
            {/* Call Date */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Call Date</label>
              <div className="p-2 border rounded">
                {enquiry.callDate
                  ? new Date(enquiry.callDate).toLocaleDateString()
                  : 'N/A'}
              </div>
            </div>
            {/* Call Time */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Call Time</label>
              <div className="p-2 border rounded">{enquiry.callTime || 'N/A'}</div>
            </div>
            {/* Rental Quotation */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Rental Quotation</label>
              <div className="p-2 border rounded">
                {enquiry.rentalQuotation ? 'Yes' : 'No'}
              </div>
            </div>
            {/* Purchase Request */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Purchase Request</label>
              <div className="p-2 border rounded">
                {enquiry.purchaseRequest ? 'Yes' : 'No'}
              </div>
            </div>
            {/* Customization Request */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Customization Request</label>
              <div className="p-2 border rounded">
                {enquiry.customizationRequest ? 'Yes' : 'No'}
              </div>
            </div>
            {/* Created At */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Created At</label>
              <div className="p-2 border rounded">
                {enquiry.createdAt
                  ? new Date(enquiry.createdAt).toLocaleString()
                  : 'N/A'}
              </div>
            </div>
            {/* Updated At */}
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Updated At</label>
              <div className="p-2 border rounded">
                {enquiry.updatedAt
                  ? new Date(enquiry.updatedAt).toLocaleString()
                  : 'N/A'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
