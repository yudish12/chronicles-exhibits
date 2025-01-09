import {
  boothsizePageFields,
  FAQPageFields,
  homePageFields,
  locationPageFields,
  PrivacyPolicyPageFields,
} from "@/lib/config";
import * as jwtFuncs from "./jwt";

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

export {
  jwtFuncs,
  convertHumanReadableText,
  getActionSuccessResponse,
  getActionFailureResponse,
  getPageFieldsByName,
};
