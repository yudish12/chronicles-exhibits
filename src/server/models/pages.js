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
});
