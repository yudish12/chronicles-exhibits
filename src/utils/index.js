import {
  boothsizePageFields,
  FAQPageFields,
  homePageFields,
  locationPageFields,
  PrivacyPolicyPageFields,
  servicePageFields,
} from "@/lib/config";
import * as jwtFuncs from "./jwt";
const validateBlogAddData = (data) => {
  console.log("data" , data)
  const requiredFields = [
    { key: "title", message: "Title is required" },
    { key: "body", message: "Body is required" },
    { key: "image", message: "Image is required" },
    { key: "slug", message: "Slug is required" },
    { key: "blog_count", message: "Blog count is required" },
    { key: "image_alt_text", message: "Image alt text is required" },
    { key: "meta_title", message: "Meta title is required" },
    { key: "meta_description", message: "Meta description is required" },
    { key: "meta_keywords", message: "Meta keywords are required", isArray: true },
  ];

  for (const field of requiredFields) {
    if (
      !data[field.key] || 
      (field.isArray && (!Array.isArray(data[field.key]) || data[field.key].length === 0)) // Ensure it's a non-empty array
    ) {
      return getActionFailureResponse(field.message, field.key);
    }
  }


  // if (data.isDraft === undefined || data.isDraft === null) {
  //   return getActionFailureResponse("Blog status is required", "isDraft");
  // }

  return null; // No errors
};
const validateEventData = (data) => {

  const requiredFields = [
    { key: "event_name", message: "Event name is required" },
    { key: "start_date", message: "Start date is required" },
    { key: "end_date", message: "End date is required" },
    { key: "country", message: "Country is required" },
    { key: "city", message: "City is required" },
    { key: "icon", message: "Icon is required" },
    { key: "body", message: "Body is required" },
    { key: "address", message: "Address is required" },
    { key: "icon_alt_text", message: "Icon alt text is required" },
    { key: "meta_title", message: "Meta title is required" },
    { key: "meta_description", message: "Meta description is required" },
    { key: "meta_keywords", message: "Meta keywords are required", isArray: true },
    {key : "slug", message : "Slug is required "},
    { key: "email", message: "Email is required" },
    { key: "website", message: "Website is required" }
  ];

  for (const field of requiredFields) {
    if( !data[field.key] || 
    field.isArray && (!Array.isArray(data[field.key]) || data[field.key].length === 0)) {
      return getActionFailureResponse(field.message, field.key);
    }
  }

  if (!isValidEmail(data.email)) {
    return getActionFailureResponse("Invalid email", "email");
  }

  if (!isValidWebsite(data.website)) {
    return getActionFailureResponse("Invalid website", "website");
  }

  return null; // No errors
};
const getActionSuccessResponse = (data, count) => {
  return {
    success: true,
    data: JSON.parse(JSON.stringify(data)),
    count: count ?? "not-requested",
  };
};

const getActionFailureResponse = (error, type) => {
  return {
    success: false,
    err: error?.message || error,
    type,
  };
};
const convertHumanReadableText = (text) =>
  text
    ?.split("_")
    ?.map((e) => e[0].toUpperCase() + e.slice(1))
    ?.join(" ");

const getPageFieldsByName = (pageName) => {
  switch (pageName) {
    case "home":
      return homePageFields;
    case "location":
      return locationPageFields;
    case "booth-size":
      return boothsizePageFields;
    case "faq":
      return FAQPageFields;
    case "privacy-policy":
      return PrivacyPolicyPageFields;
    case "service":
      return servicePageFields;
    default:
      return [];
  }
};

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const websiteRegex =
  /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;

export const isValidEmail = (email) => {
  return emailRegex.test(email);
};

export const isValidWebsite = (website) => {
  return websiteRegex.test(website);
};

export const getPageNameAndUrl = (pathname) => {
  const domain = "https://chronicleexhibits.com";

  // Ensure pathname is a string and handle empty or undefined cases
  if (!pathname || typeof pathname !== 'string') {
    return { name: "Unknown", url: domain };
  }

  // Handle root path "/"
  if (pathname === "/") {
    return { name: "Home", url: domain };
  }

  // Remove leading and trailing slashes to prevent empty segments
  const cleanPath = pathname.replace(/^\/|\/$/g, "");

  // Handle empty string after cleaning
  if (!cleanPath) {
    return { name: "Home", url: domain };
  }

  // Split the path by slashes and hyphens to format it correctly
  const parts = cleanPath.split("/").map(segment => 
    segment.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );

  const name = parts.join(" > "); // Using " > " to show hierarchy

  return { name, url: `${domain}/${cleanPath}` };
};


export {
  jwtFuncs,
  convertHumanReadableText,
  getActionSuccessResponse,
  getActionFailureResponse,
  getPageFieldsByName,
  validateBlogAddData,
  validateEventData
};
