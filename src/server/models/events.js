import mongoose from "mongoose";
// make all fields required
const eventSchema = new mongoose.Schema(
  {
    event_name: {
      type: String,
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
    },
    end_date: {
      type: Date,
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
    isDraft : {
      type : String , 
      default : "false"
    }
  },
  { timestamps: true }
);

eventSchema.index({ slug: 1 }, { unique: true });
eventSchema.index({ createdAt: -1 });

const events = mongoose.models.events || mongoose.model("events", eventSchema);

export default events;
