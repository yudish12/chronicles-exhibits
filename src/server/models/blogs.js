import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
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
    meta_keywords: [String],
    image: {
      // logo is image
      type: String,
    },
    blog_count: {
      type: Number,
    },
    isDraft : {
      type : String , 
      default : "true"
    }
  },
  { timestamps: true }
);

blogSchema.index({ slug: 1 }, { unique: true });
blogSchema.index({ createdAt: -1 });

const Blog = mongoose.models.blogs || mongoose.model("blogs", blogSchema); // make this blog and change everywhere

export default Blog;
