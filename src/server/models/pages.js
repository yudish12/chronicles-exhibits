import mongoose from "mongoose";

const pageSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
  },
  fields: {
    type: Object,
    required: true,
  },
  meta_title: {
    type: String,
  },
  meta_description: {
    type: String,
  },
  meta_keywords: [String],
});

const pages = mongoose.models.pages || mongoose.model("pages", pageSchema);

export default pages;
