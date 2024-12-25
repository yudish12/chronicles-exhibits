"use server";

import { EmailService } from "../services/mailer/email-service";

export const submitCallForm = async (fields, page_source) => {
  const email = new EmailService("home", "get-quote");
  const resp = await email.send(
    fields,
    `Get a Quote form filled from page: ${page_source}`
  );
  return resp;
};
export const submitScheduleCallForm = async (fields, page_source) => {
  const email = new EmailService("home", "schedule-call");
  const resp = await email.send(
    fields,
    `Get a Quote form filled from page: ${page_source}`
  );
  return resp;
};
export const submitBoothForm = async (fields, page_source) => {
  const email = new EmailService("home", "booth-enquiry");
  const resp = await email.send(
    fields,
    `Get a Quote form filled from page: ${page_source}`
  );
  return resp;
};
