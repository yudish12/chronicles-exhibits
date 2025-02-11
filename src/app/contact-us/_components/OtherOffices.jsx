import React from "react"
import Image from "next/image"

const OfficeCard = ({ title, address, email, phone }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Image
loading="eager" src="/Location 2.svg" alt="Location" width={24} height={24} className="mt-1" />
            <p className="text-sm text-gray-600">{address}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Image
loading="eager" src="/Envelope.svg" alt="Email" width={24} height={24} />
            <p className="text-sm text-gray-600">{email}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Image
loading="eager" src="/Phone 2.svg" alt="Phone" width={24} height={24} />
            <p className="text-sm text-gray-600">{phone}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

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
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">OTHER OFFICES</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
  )
}

export default OtherOffices

