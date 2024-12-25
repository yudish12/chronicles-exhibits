"use server";

import { EmailService } from "../services/mailer/email-service";
import FormSubmission from "../models/form-submissions";
export const submitCallForm = async (fields, page_source) => {
  try{
    const schemaKeys = {
      name: "",
      email: "",
      phoneNumber: "",
      eventName: "",
      event_city: "",
      file: "",
      message: "",
      page_source: "",
      company_name: "",
      boothSize: "",
      exhibition_name: "",
      callDate : "",
      callTime : ""
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
}catch(error){
  console.error("Error submitting form:", error);
}
}
export const submitScheduleCallForm = async (fields, page_source) => {
  
  try{
    const schemaKeys = {
      name: "",
      email: "",
      phoneNumber: "",
      eventName: "",
      event_city: "",
      file: "",
      message: "",
      page_source: "",
      company_name: "",
      boothSize: "",
      exhibition_name: "",
      callDate : "",
      callTime : ""
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
}catch(error){
  console.error("Error submitting form:", error);
}
};
export const submitBoothForm = async (fields, page_source) => {
  try{
    const schemaKeys = {
      name: "",
      email: "",
      phoneNumber: "",
      eventName: "",
      event_city: "",
      file: "",
      message: "",
      page_source: "",
      company: "",
      boothSize: "",
      exhibition_name: "",
      callDate : "",
      callTime : "",
      country: ""
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
}catch(error){
  console.error("Error submitting form:", error);
}
}
