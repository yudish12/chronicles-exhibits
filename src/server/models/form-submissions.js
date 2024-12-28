import { emailRegex, phoneRegex } from "@/utils/constants/regex";
import mongoose from "mongoose";

const formSubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      match: [emailRegex, "Please fill a valid email address"],
      // required: true,
    },
    phoneNumber: {
      type: String,
      // required: true,
      // match: [phoneRegex, "Please fill a valid phone number"],
    },
    country : {
      type: String
    },
    eventName: {
      type: String,
    },
    eventCity: {
      type: String,
    },
    eventDate : {
      type : Date
    },
    file: {
      type: String,
    },
    message: {
      type: String,
    },
    page_source: {
      type: String,
      // required: true,
    },
    company: {
      type: String,
    },
    boothSize: {
      type: String,
    },
    exhibitionName: {
      type: String,
    },
    url : {
      type:String
    },
    callDate : {
      type : Date
    }, 
    callTime : {
      type: String
    }, 
  rentalQuotation: { type: Boolean, default: false },
  purchaseRequest: { type: Boolean, default: false },
  customizationRequest: { type: Boolean, default: false },
    budget: {
      type: String
    },
  },
  { timestamps: true }
);

const FormSubmission = mongoose.models.FormSubmission || mongoose.model('FormSubmission', formSubmissionSchema);
export default FormSubmission;
