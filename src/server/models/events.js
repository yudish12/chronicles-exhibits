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
    redirect: {
      type: String,
      default: null,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
    },
    isDraft: {
      type: String,
      default: "true",
    },
  },
  { timestamps: true }
);

eventSchema.pre("save", function (next) {
  if (this.start_date) {
    this.start_date = new Date(this.start_date);
  }
  if (this.end_date) {
    this.end_date = new Date(this.end_date);
  }
  next();
});

eventSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.start_date) {
    update.start_date = new Date(update.start_date);
  }
  if (update.end_date) {
    update.end_date = new Date(update.end_date);
  }
  next();
});

eventSchema.index({ slug: 1 }, { unique: true });
eventSchema.index({ createdAt: -1 });

const events =
  mongoose?.models?.events || mongoose.model("events", eventSchema);

export default events;
