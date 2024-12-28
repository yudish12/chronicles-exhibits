"use server";

import { EmailService } from "../services/mailer/email-service";
import FormSubmission from "../models/form-submissions";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";
import { findBlogById } from "./blogs";
export const submitCallForm = async (fields, page_source) => {
  try {
    const schemaKeys = {
      name: "",
      company :"",
      email: "",
      phoneNumber: "",
      eventName: "",
      eventCity: "",
      file: "",
      message: "",
      page_source: "",
      budget: "",
      company: "",
      boothSize: "",
      exhibition_name: "",
      callDate: "",
      callTime: "",
    };
    const normalizedFields = { ...schemaKeys, ...fields, page_source };
    const formSubmission = new FormSubmission(normalizedFields);
    await formSubmission.save();
    const email = new EmailService("home", "get-quote");
    const resp = await email.send(
      fields,
      `Get a Quote form filled from page: ${page_source}`
    );
    return resp;
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
export const submitScheduleCallForm = async (fields, page_source) => {
  try {
    const schemaKeys = {
      name: "",
      email: "",
      phoneNumber: "",
      eventName: "",
      eventCity: "",
      file: "",
      message: "",
      page_source: "",
      company_name: "",
      boothSize: "",
      exhibition_name: "",
      callDate: "",
      callTime: "",
      country : ""
    };
    const normalizedFields = { ...schemaKeys, ...fields, page_source };
    const formSubmission = new FormSubmission(normalizedFields);
    await formSubmission.save();
    const email = new EmailService("home", "schedule-call");

    const resp = await email.send(
      fields,
      `Get a Quote form filled from page: ${page_source}`
    );
    return resp;
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
export const submitGetFreeDesignForm = async (fields, page_source) => {
  try {
    const schemaKeys = {
      name: "",
      email: "",
      phoneNumber: "",
      eventName: "",
      eventCity: "",
      country:"",
      company: "",
      file: "",
      message: "",
      page_source: "",
      company_name: "",
      boothSize: "",
      exhibition_name: "",
      callDate: "",
      callTime: "",
      budget: ""
    };
    const normalizedFields = { ...schemaKeys, ...fields, page_source };
    const formSubmission = new FormSubmission(normalizedFields);
    await formSubmission.save();
    const email = new EmailService("home", "free-design");

    const resp = await email.send(
      fields,
      `Get a Quote form filled from page: ${page_source}`
    );
    return resp;
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
export const submitBoothForm = async (fields, page_source) => {
  try {
    const schemaKeys = {
      name: "",
      email: "",
      phoneNumber: "",
      eventName: "",
      eventCity: "",
      file: "",
      message: "",
      page_source: "",
      company: "",
      boothSize: "",
      exhibition_name: "",
      callDate: "",
      callTime: "",
      country: "",
      budget: "",
      eventDate : ""
    };
    const normalizedFields = { ...schemaKeys, ...fields, page_source };
    const formSubmission = new FormSubmission(normalizedFields);
    await formSubmission.save();
    const email = new EmailService("home", "booth-enquiry");
    const resp = await email.send(
      fields,
      `Get a Quote form filled from page: ${page_source}`
    );
    return resp;
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

export const submitBlogForm = async (fields, page_source) => {
  try {
    const schemaKeys = {
      name: "",
      email: "",
      phoneNumber: "",
      eventName: "",
      eventCity: "",
      file: "",
      message: "",
      page_source: "",
      company: "",
      boothSize: "",
      exhibition_name: "",
      callDate: "",
      callTime: "",
      country: "",
    };
    const normalizedFields = { ...schemaKeys, ...fields, page_source };
    const formSubmission = new FormSubmission(normalizedFields);
    await formSubmission.save();
    const email = new EmailService("blog", "blog-enquiry");
    const resp = await email.send(
      fields,
      `Get a Quote form filled from page: ${page_source}`
    );
    return resp;
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};
export const submitBoothCodeForm = async (fields, page_source) => {
  console.log("function hit ");
  try {
    const schemaKeys = {
      name: "",
      email: "",
      phoneNumber: "",
      eventName: "",
      eventCity: "",
      file: "",
      message: "",
      page_source: "",
      company: "",
      boothSize: "",
      exhibition_name: "",
      callDate: "",
      callTime: "",
      country: "",
      rentalQuotation: "",
      purchaseRequest: "",
      custromizationRequest: "",
    };
    const normalizedFields = { ...schemaKeys, ...fields, page_source };
    const formSubmission = new FormSubmission(normalizedFields);
    await formSubmission.save();
    const email = new EmailService("booth", "blog-enquiry");
    const resp = await email.send(
      fields,
      `Get a Quote form filled from page: ${page_source}`
    );
    return resp;
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

export const getAllForms = async () => {
  try {
    const data = await FormSubmission.find({});
    return getActionSuccessResponse(data);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};
export const deleteForm = async (id) => {
  try {
    const data = await FormSubmission.findByIdAndDelete(id);
    return getActionSuccessResponse(data);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};
