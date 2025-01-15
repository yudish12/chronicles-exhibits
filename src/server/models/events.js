import mongoose from "mongoose";
// make all fields required
const eventSchema = new mongoose.Schema(
  {
    event_name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    slug: {
      type: String, // regex : spaces not allowed , only small case allowed
    },
    body: {
      type: String,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    booth_title: {
      type: String,
    },
    booth_description: {
      type: String,
    },
    icon_alt_text: {
      type: String,
    },
    meta_title: {
      type: String,
    },
    meta_description: {
      type: String,
    },
    meta_keywords: [String],
    icon: {
      type: String,
      default: "/event-sample.png",
    },
    address: {
      type: String,
      default: "",
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  { timestamps: true }
);

eventSchema.index({ slug: 1 }, { unique: true });
eventSchema.index({ createdAt: -1 });

const events = mongoose.models.events || mongoose.model("events", eventSchema);

export default events;
