import React from "react";
import Image from "next/image";


const OfficeCard = ({ title, address, email, phone }) => {
  return (
    <div className="bg-white shadow-md p-6 rounded-lg border border-gray-300 max-w-sm mx-auto">
      {/* Title */}
      <h3 className="text-lg font-bold text-gray-800 mb-4">{title}</h3>
      
      {/* Content */}
      <div className="flex flex-col gap-y-4">
        {/* Address */}
        <div className="flex items-start gap-x-3">
          <Image src="/Location 2.svg" alt="Location" width={24} height={24} />
          <p className="text-base text-gray-600 leading-5">{address}</p>
        </div>
        
        {/* Email */}
        <div className="flex items-center gap-x-3">
          <Image src="/Envelope.svg" alt="Email" width={24} height={24} />
          <p className="text-base text-gray-600 leading-5">{email}</p>
        </div>
        
        {/* Phone */}
        <div className="flex items-center gap-x-3">
          <Image src="/Phone 2.svg" alt="Phone" width={24} height={24} />
          <p className="text-base text-gray-600 leading-5">{phone}</p>
        </div>
      </div>
    </div>
  );
};


const OtherOffices = () => {
  const offices = [
    {
      title: "Dubai Office",
      address: "Street 5 Lootah Warehouses, 11th St - Mina Jebel Ali - Dubai",
      email: "info@chronicleexhibits.ae",
      phone: "+971 5434-74-645",
    },
    {
      title: "Europe Office",
      address: "Street 5 Lootah Warehouses, 11th St - Mina Jebel Ali - Dubai",
      email: "info@chronicleexhibits.eu",
      phone: "+49 (1) 5217 473-031",
    },
    {
      title: "Dubai Warehouse",
      address: "Street 5 Lootah Warehouses, 11th St - Mina Jebel Ali - Dubai",
      email: "info@chronicleexhibits.ae",
      phone: "+971 5434-74-645",
    },
    {
      title: "India Office",
      address: "E-340, East of Kailash, New Delhi - 110065",
      email: "info@chronicleexhibits.in",
      phone: "+91-987-037-0977",
    },
  ];
  return (
    <div className="py-16 bg-background ">
      <h2 className="text-center text-xl font-bold py-4">OTHER OFFICES</h2>
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-20 py-2 ">
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
  );
};

export default OtherOffices;
