import { emailRegex, phoneRegex } from "@/utils/constants/regex";
import mongoose from "mongoose";

const formSubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: [emailRegex, "Please fill a valid email address"],
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
      match: [phoneRegex, "Please fill a valid phone number"],
    },
    event_name: {
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
      required: true,
    },
    company_name: {
      type: String,
    },
    booth_size: {
      type: String,
    },
    exhibition_name: {
      type: String,
    },
  },
  { timestamps: true }
);

const formsubmissions =
  models.formSubmissions || model("formsubmissions", formSubmissionSchema);

export default formsubmissions;
