"use server";

import dbConnect from "@/config/db-connect";
import User from "../models/blogs";
import mongoose from "mongoose";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";

await dbConnect();

export const getAllBlogs = async () => {
  try {
    const data = await User.find().sort({ createdAt : -1}).lean();
    return getActionSuccessResponse(data);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};
// src/server/actions/booths.js

export const updateData = async (id, data) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return getActionFailureResponse("Invalid id format", "toast");
    }

    if (!data || typeof data !== "object") {
      return getActionFailureResponse("Invalid data format", "toast");
    }

    // Use findByIdAndUpdate instead of updateOne to get the updated document
    const resp = await User.findByIdAndUpdate(
      id,
      {
        title: data.title,
        short_description: data.short_description,
        long_description: data.long_description,
        image: data.image,
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
    if (!data.title) {
      return getActionFailureResponse("title is required", "title");
    }

    if (!data.short_description) {
      return getActionFailureResponse("short description is required", "short_description");
    }

    if (!data.long_description) {
      return getActionFailureResponse("long description is required", "long_description");
    }

    if (!data.image) {
      return getActionFailureResponse("image is required", "image");
    }

    const resp = await User.create(data);

    console.log("====add data resp===",resp);
    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error in addData:", error.message);
    getActionFailureResponse(error.message, "toast");
  }
};

export const deleteData = async (id) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return getActionFailureResponse("Invalid id format", "toast");
    }

    const resp = await User.deleteOne({ _id: id });

    if (!resp) {
      return getActionFailureResponse("Document not found", "toast");
    }

    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error deleting data:", error);
    return getActionFailureResponse(error.message, "toast");
  }
};
