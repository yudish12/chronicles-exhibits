import React from "react";
import Image from "next/image";
import Link from "next/link";

const ContactCard = ({ icon, title, content, link , isExternal  }) => {
  const CardContent =  (
    <div className="flex items-center space-x-4 mb-4 bg-white p-4 rounded-lg transition-all duration-300 hover:shadow-lg shadow-md">
      <div className="bg-secondary bg-opacity-10 p-3 rounded-full">
        <Image
loading="eager"
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
  if (!link) {
    return CardContent; // Prevent Link error if no link is provided
  }
  return isExternal ? (<a href={link} target="_blank" rel="noopener noreferrer">
    {CardContent}
  </a> ) : (
     <Link href={link}>{CardContent}</Link>
  )
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
          link={`tel:${fields[1]?.value}`}
          isExternal
        />
        <ContactCard
          icon="/Envelope.png"
          title="Email"
          content={fields[2]?.value}
          link={`mailto:${fields[2]?.value}`}
          isExternal
        />
        <ContactCard
          icon="/Location.png"
          title="US Office Address"
          content={fields[3]?.value}
          link={fields[3]?.value ? `https://www.google.com/maps/search/?q=${encodeURIComponent(fields[3].value)}` : undefined}
          isExternal
        />
      </div>
    </div>
  );
};

export default ContactInfo;