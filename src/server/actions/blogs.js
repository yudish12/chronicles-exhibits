"use server";

import dbConnect from "@/config/db-connect";
import Blog from "../models/blogs";
import mongoose from "mongoose";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";

// await dbConnect();

export const getAllBlogs = async (skip, limit, projection) => {
  try {
    await dbConnect();

    let query = Blog.find().sort({ _id: -1 });
    if (skip) {
      query = query.skip(skip);
    }

    if (limit) {
      query = query.limit(limit);
    }

    if (projection) {
      query = query.select(projection);
    }

    const data = await query.lean();
    const count = await Blog.countDocuments();

    return getActionSuccessResponse(data, count);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};

export const getAllDataBySearch = async (searchValue) => {
  try {
    const data = await Blog.find({
      title: { $regex: searchValue, $options: "i" },
    }).lean();
    return getActionSuccessResponse(data);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};
// src/server/actions/booths.js

export const updateData = async (id, data) => {
  try {
    await dbConnect();
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return getActionFailureResponse("Invalid id format", "toast");
    }

    if (!data || typeof data !== "object") {
      return getActionFailureResponse("Invalid data format", "toast");
    }

    if (!data.title) {
      return getActionFailureResponse("title is required", "title");
    }
    if (!data.body) {
      return getActionFailureResponse("body is required", "body");
    }
    if (!data.image) {
      return getActionFailureResponse("image is required", "image");
    }

    if (!data.slug) {
      return getActionFailureResponse("slug is required", "slug");
    }
    if (!data.blog_count) {
      return getActionFailureResponse("blog_count is required", "blog_count");
    }
    if (!data.title) {
      return getActionFailureResponse("title is required", "title");
    }
    if (!data.image_alt_text) {
      return getActionFailureResponse(
        "image_alt_text is required",
        "image_alt_text"
      );
    }
    if (!data.meta_title) {
      return getActionFailureResponse("meta_title is required", "meta_title");
    }
    if (!data.meta_description) {
      return getActionFailureResponse(
        "meta_description is required",
        "meta_description"
      );
    }
    if (!data.meta_keywords || !Array.isArray(data.meta_keywords)) {
      return getActionFailureResponse(
        "meta_keywords is required",
        "meta_keywords"
      );
    }

    // Use findByIdAndUpdate instead of updateOne to get the updated document
    const resp = await Blog.findByIdAndUpdate(
      id,
      {
        title: data.title,
        short_description: data.short_description,
        long_description: data.long_description,
        image: data.image,
        body: data.body,
        meta_title: data.meta_title,
        meta_description: data.meta_description,
        meta_keywords: data.meta_keywords,
        image_alt_text: data.image_alt_text,
        slug: data.slug,
        blog_count: data.blog_count,
      },
      {
        new: true, // Return the updated document
        runValidators: true,
      }
    ).lean();

    if (!resp) {
      return getActionFailureResponse("Document not found", "toast");
    }

    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error updating data:", error);
    return getActionFailureResponse(error.message, "toast");
  }
};

export const addData = async (data) => {
  try {
    await dbConnect();
    if (!data.title) {
      return getActionFailureResponse("title is required", "title");
    }
    if (!data.body) {
      return getActionFailureResponse("body is required", "body");
    }
    if (!data.image) {
      return getActionFailureResponse("image is required", "image");
    }

    if (!data.slug) {
      return getActionFailureResponse("slug is required", "slug");
    }
    if (!data.blog_count) {
      return getActionFailureResponse("blog_count is required", "blog_count");
    }
    if (!data.title) {
      return getActionFailureResponse("title is required", "title");
    }
    if (!data.image_alt_text) {
      return getActionFailureResponse(
        "image_alt_text is required",
        "image_alt_text"
      );
    }
    if (!data.meta_title) {
      return getActionFailureResponse("meta_title is required", "meta_title");
    }
    if (!data.meta_description) {
      return getActionFailureResponse(
        "meta_description is required",
        "meta_description"
      );
    }
    if (!data.meta_keywords || !Array.isArray(data.meta_keywords)) {
      return getActionFailureResponse(
        "meta_keywords is required",
        "meta_keywords"
      );
    }

    const resp = await Blog.create(data);

    console.log("====add data resp===", resp);
    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error in addData:", error.message);
    getActionFailureResponse(error.message, "toast");
  }
};
export const findBlogById = async (id) => {
  try {
    await dbConnect();
    const resp = await Blog.find({ _id: id });
    if (!resp) {
      return getActionFailureResponse("Document not found", "toast");
    }
    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error deleting data:", error);
    return getActionFailureResponse(error.message, "toast");
  }
};
export const deleteData = async (id) => {
  try {
    await dbConnect();
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return getActionFailureResponse("Invalid id format", "toast");
    }

    const resp = await Blog.deleteOne({ _id: id });

    if (!resp) {
      return getActionFailureResponse("Document not found", "toast");
    }

    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error deleting data:", error);
    return getActionFailureResponse(error.message, "toast");
  }
};

export const getSingleBlog = async (query) => {
  try {
    const resp = await Blog.findOne(query);
    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error deleting data:", error);
    return getActionFailureResponse(error.message, "toast");
  }
};
