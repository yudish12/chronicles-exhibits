import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    fields: {
      type: Object,
      required: true,
    },
    slug: String,
    meta_title: {
      type: String,
    },
    meta_description: {
      type: String,
    },
    meta_keywords: [String],
  },
  { timestamps: true }
);

pageSchema.index({ name: 1 }, { unique: true });

const pages = mongoose.models.pages || mongoose.model("pages", pageSchema);

export default pages;
