const mongoose = require("mongoose");

const FieldSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["text", "textarea", "upload", "body"],
    required: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    default: "",
  },
});

const LocationSchema = new mongoose.Schema({
  city_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cities",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fields: {
    type: [FieldSchema],
    required: true,
  },
  meta_description: {
    type: String,
    default: "",
  },
  meta_keywords: {
    type: [String],
    default: [],
  },
  meta_title: {
    type: String,
    default: "",
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    required: true,
  },
});

const Locations =
  mongoose.models.Location || mongoose.model("Location", LocationSchema);

export default Locations;
