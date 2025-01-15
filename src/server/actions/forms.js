"use server";

import { EmailService } from "../services/mailer/email-service";
import FormSubmission from "../models/form-submissions";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";
import { findBlogById } from "./blogs";
export const submitCallForm = async (fields, page_source) => {
  try {
    const schemaKeys = {
      name: "",
      company: "",
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
      country: "",
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
      country: "",
      company: "",
      file: "",
      message: "",
      page_source: "",
      company_name: "",
      boothSize: "",
      exhibition_name: "",
      callDate: "",
      callTime: "",
      budget: "",
    };
    const normalizedFields = { ...schemaKeys, ...fields, page_source };
    const formSubmission = new FormSubmission(normalizedFields);
    await formSubmission.save().exec();
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
      eventDate: "",
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
      rentalQuotation: false,
      purchaseRequest: false,
      customizationRequest: false,
    };
    const normalizedFields = { ...schemaKeys, ...fields, page_source };
    const formSubmission = new FormSubmission(normalizedFields);
    await formSubmission.save();
    console.log(formSubmission);
    console.log("data saved ", normalizedFields, await formSubmission.save());
    const email = new EmailService("booth", "booth-code");
    const resp = await email.send(
      fields,
      `Get a Quote form filled from page: ${page_source}`
    );
    return resp;
  } catch (error) {
    console.error("Error submitting form:", error);
  }
};

export const getAllForms = async (skip, limit, projection) => {
  try {
    let query = FormSubmission.find().sort({ _id: -1 });
    if (skip) {
      query = query.skip(skip);
    }
    if (limit) {
      query = query.limit(limit);
    }
    if (projection) {
      query = query.select(projection);
    }
    const data = await query.lean();
    const count = await FormSubmission.countDocuments();
    return getActionSuccessResponse(data, count);
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

export async function eventWebsiteForm(
  name,
  email,
  phone,
  websiteUrl,
  page_source
) {
  if (!name || !email || !phone || !websiteUrl) {
    return { error: "All fields are required" };
  }

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
      rentalQuotation: false,
      purchaseRequest: false,
      customizationRequest: false,
    };
    const normalizedFields = {
      ...schemaKeys,
      name,
      email,
      phone,
      websiteUrl,
      page_source,
    };
    const formSubmission = new FormSubmission(normalizedFields);
    await formSubmission.save();
    const email = new EmailService(page_source, "booth-code");
    const resp = await email.send(
      { name, email, phone, websiteUrl },
      `Get a Quote form filled from page: ${page_source}`
    );
    return getActionSuccessResponse({ name, email, phone, websiteUrl });
  } catch (error) {
    console.log(error);
    return getActionFailureResponse(error);
  }
}

export const downloadFormSubmissions = async (start_date, end_date) => {
  try {
    const resp = await FormSubmission.find({
      createdAt: {
        $gte: new Date(start_date),
        $lte: new Date(end_date),
      },
    });

    return getActionSuccessResponse(resp);
  } catch (error) {
    console.log(error);
    return getActionFailureResponse(error);
  }
};
