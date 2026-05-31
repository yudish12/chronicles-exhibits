import React from "react";
import Image from "next/image";

const OfficeCard = ({ title, address, email, phone }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Image
              loading="eager"
              src="/Location 2.svg"
              alt="Location"
              width={24}
              height={24}
              className="mt-1"
            />
            <p className="text-sm text-gray-600">{address}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Image
              loading="eager"
              src="/Envelope.svg"
              alt="Email"
              width={24}
              height={24}
            />
            <p className="text-sm text-gray-600">{email}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Image
              loading="eager"
              src="/Phone 2.svg"
              alt="Phone"
              width={24}
              height={24}
            />
            <p className="text-sm text-gray-600">{phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const OtherOffices = ({ offices }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          OTHER OFFICES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {offices.map((office, index) => (
            <OfficeCard
              key={index}
              title={office.title}
              address={office.address}
              email={office.email}
              phone={office.phone}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherOffices;
