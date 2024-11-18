import mongoose from "mongoose";

const pageStringsSchema = new mongoose.Schema({
  page_slug: {
    type: String,
    required: true,
  },
  key: {
    type: String,
  },
  content: {
    type: JSON,
  },
});

const pagestrings =
  mongoose.models.pagestrings ||
  mongoose.model("pagestrings", pageStringsSchema);

export default pagestrings;
