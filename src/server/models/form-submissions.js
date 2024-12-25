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
    event_city: {
      type: String,
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
    }
  },
  { timestamps: true }
);

const FormSubmission = mongoose.models.FormSubmission || mongoose.model('FormSubmission', formSubmissionSchema);
export default FormSubmission;
