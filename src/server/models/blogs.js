import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    body: {
      type: String,
    },
    image_alt_text: {
      type: String,
    },
    meta_title: {
      type: String,
    },
    meta_description: {
      type: String,
    },
    image: {
      // logo is image
      type: String,
      required: true,
    },
    blog_count : {
      type : Number
    }
  },
  { timestamps: true }
);

const User = mongoose.models.blogs || mongoose.model("blogs", blogSchema); // make this blog and change everywhere

export default User;
