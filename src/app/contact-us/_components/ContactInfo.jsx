import React from "react";
import Image from "next/image";


const ContactCard = ({ icon, title, content }) => {
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg transition-all duration-300 hover:shadow-lg shadow-md">
      <div className="bg-secondary bg-opacity-10 p-3 rounded-full">
        <Image
          src={icon || "/placeholder.svg"}
          alt={title}
          width={24}
          height={24}
          className="object-contain"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{content}</p>
      </div>
    </div>
  );
};

const ContactInfo = ({ fields }) => {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Reach Out To Us</h2>
      <div className="space-y-4">
        <ContactCard
          icon="/Phone.png"
          title="Phone"
          content={fields[1].value}
        />
        <ContactCard
          icon="/Envelope.png"
          title="Email"
          content={fields[2].value}
        />
        <ContactCard
          icon="/Location.png"
          title="US Office Address"
          content={fields[3].value}
        />
      </div>
    </div>
  );
};

export default ContactInfo;
