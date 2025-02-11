import React from "react";
import Image from "next/image";


const ContactCard= ({
  icon,
  title,
  content,
  bgColor,
  textColor,
  fullWidth = false,
}) => {
  return (
    <div
      className={`${bgColor} ${
        fullWidth ? "w-full" : ""
      } p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105`}
    >
      <div className="flex items-center space-x-4">
        <div className="bg-white p-3 rounded-full">
          <Image
loading="eager"
            src={icon || "/placeholder.svg"}
            alt={title}
            width={40}
            height={40}
            className="object-contain"
          />
        </div>
        <div>
          <h3 className={`text-lg font-semibold ${textColor}`}>{title}</h3>
          <p className="text-base text-gray-700 font-medium mt-1">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
