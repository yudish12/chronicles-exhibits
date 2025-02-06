"use server";

import { EmailService } from "../services/mailer/email-service";
import FormSubmission from "../models/form-submissions";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";
import dbConnect from "@/config/db-connect";
export const submitCallForm = async (formData, page_source) => {
  try {
    const schemaKeys = {
      name: "",
      company: "",
      email: "",
      phone: "",
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
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");
    const budget = formData.get("budget");
    const fileData = formData.getAll("files"); 
    if(!name || !email || !phone || !message || !budget) {
      return { error: "Please fill all the fields" };
    }
    const company = formData.get("company");
    const eventName = formData.get("eventName");
    const eventCity = formData.get("eventCity");
    const boothSize = formData.get("boothSize");
    const url = formData.get("url");
    const normalizedFields = { ...schemaKeys, name, email, phone, message, budget, company, eventName, eventCity, boothSize, page_source };
    const formSubmission = new FormSubmission(normalizedFields);
    await formSubmission.save();
    const mail = new EmailService(page_source, "get-quote");
    const file = fileData[0];
    const fileName = file?.name || "No file uploaded";
    console.log(file , "FILE==")
    const resp = mail.send(
      {name, email, phone, message, url, budget, company, eventName, eventCity, boothSize ,file:fileName },
      `Get a Quote form filled from page: ${page_source}`,
      fileData
    );
    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error submitting form:", error);
    return getActionFailureResponse(error);
  }
};
export const submitScheduleCallForm = async (fields, page_source) => {
  try {
    const schemaKeys = {
      name: "",
      email: "",
      phone: "",
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
    const email = new EmailService(page_source, "schedule-call");

    const resp = email.send(
      fields,
      `Get a Quote form filled from page: ${page_source}`
    );
    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error submitting form:", error);
    return getActionFailureResponse(error);
  }
};
export const submitGetFreeDesignForm = async (formData, page_source) => {
  try {
    const schemaKeys = {
      name: "",
      email: "",
      phone: "",
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
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");
    const budget = formData.get("budget");
    const fileData = formData.getAll("files");
    
    const company = formData.get("company");
    const eventName = formData.get("eventName");
    const eventCity = formData.get("eventCity");
    const boothSize = formData.get("boothSize");
    const country = formData.get("country");
    const url = formData.get("url");
    const normalizedFields = { ...schemaKeys, name, email, phone, message, budget, company, eventName, eventCity, boothSize, country, page_source };
    const fields = { name, email,url, phone, message, budget, company, eventName, eventCity, boothSize, country };
   
    const formSubmission = new FormSubmission(normalizedFields);
    await formSubmission.save()
    const mail = new EmailService(page_source, "free-design");

    const resp = mail.send(
      fields,
      `Get a Quote form filled from page: ${page_source}`,
      fileData
    );
    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error submitting form:", error);
    return getActionFailureResponse(error);
  }
};
export const submitBoothForm = async (formdata, page_source) => {
  try {
    const schemaKeys = {
      name: "", //
      email: "", //
      phone: "",//
      eventName: "",//
      eventCity: "",//
      file: "",//
      message: "",//
      page_source: "",
      company: "",//
      boothSize: "",//
      exhibition_name: "",
      callDate: "",
      callTime: "",
      country: "",//
      budget: "",//
      eventDate: "",//
    };
    const name = formdata.get("name");
    const url = formdata.get("url");
    const email = formdata.get("email");
    const phone = formdata.get("phone");
    const message = formdata.get("message");
    const budget = formdata.get("budget");
    
    const fileData = formdata.getAll("files"); 
    if(!name || !email || !phone) {
      return { error: "Please fill all the fields" };
    }
    const company = formdata.get("company");
    const eventName = formdata.get("eventName");
    const eventCity = formdata.get("eventCity");
    const boothSize = formdata.get("boothSize");
    const country = formdata.get("country");
    const eventDate = formdata.get("eventDate");

    const normalizedFields = { ...schemaKeys, name, email, phone, message, budget, company, eventName, eventCity, boothSize, country, eventDate, page_source:eventName };
    const fields = { name, email, url, phone, message, budget, company, eventName, eventCity, boothSize, country, eventDate };
    const formSubmission = new FormSubmission(normalizedFields);
    await formSubmission.save();
    const mail = new EmailService("home", "booth-enquiry");
    const resp = mail.send(
      fields,
      `Get a Quote form filled from page: ${eventName}`,
      fileData
    );
    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error submitting form:", error);
    return getActionFailureResponse(error);
  }
};

export const submitBlogForm = async (formData, page_source) => {
  try {
    const schemaKeys = {
      name: "",
      email: "",
      phone: "",
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

    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const message = formData.get("message");
    const country = formData.get("country");
    const url = formData.get("url");
    const boothSize = formData.get("boothSize");
    const fileData = formData.getAll("files"); 

    const fields = { name, email, phone, message, url, boothSize,country };

    const normalizedFields = { ...schemaKeys, ...fields, page_source };
    const formSubmission = new FormSubmission(normalizedFields);
    await formSubmission.save();
    const mail = new EmailService(page_source, "blog-enquiry");
    const resp = mail.send(
      fields,
      `Get a Quote form filled from page: ${page_source}`,
      fileData
    );
    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error submitting form:", error);
    return getActionFailureResponse(error);
  }
};
export const submitBoothCodeForm = async (fields, page_source) => {
  console.log("function hit ");
  try {
    const schemaKeys = {
      name: "",
      email: "",
      phone: "",
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
    const resp = email.send(
      fields,
      `Get a Quote form filled from page: ${page_source}`
    );
    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error submitting form:", error);
    return getActionFailureResponse(error);
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
      phone: "",
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
    const resp = email.send(
      { name, email, phone, websiteUrl },
      `Website form for event ${page_source} filled from page: ${page_source}`
    );
    return getActionSuccessResponse({ name, email, phone, websiteUrl });
  } catch (error) {
    console.log(error);
    return getActionFailureResponse(error);
  }
}

export async function contactUsForm(formData, page_source) {
 
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const url = formData.get("url");
    const message = formData.get("message");
    const budget = formData.get("budget");
    const fileData = formData.getAll("files"); 
    if(!name || !email || !phone || !message || !budget) {
      return { error: "Please fill all the fields" };
    }

    for(const file of fileData){
      console.log(file)
    }

    const schemaKeys = {
      name: "",
      email: "",
      phone: "",
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
      message,
      budget,
    };
    const formSubmission = new FormSubmission(normalizedFields);
    await formSubmission.save();
    const mail = new EmailService(page_source ?? "contact-us", "contact-us");
    const resp = mail.send(
      { name, email, phone, message, budget, url },
      `Get a Quote form filled from page: ${page_source ?? "contact-us"}`,
      fileData
    );
    console.log(resp)
    return getActionSuccessResponse({ name, email, phone, message, budget });

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

export const getEnquiryById = async (id) => {
  await dbConnect();
  try {
    const enquiry = await FormSubmission.findById(id);
    return getActionSuccessResponse(enquiry);
  } catch (error) {
    return getActionFailureResponse(error);
  }
}