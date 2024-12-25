"use server";

import dbConnect from "@/config/db-connect";
import Pages from "../models/pages";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";
import mongoose from "mongoose";

await dbConnect();

export const getAllPages = async () => {
  try {
    const data = await Pages.find().lean();
    return getActionSuccessResponse(data);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};
export const getSinglePage = async (query) => {
  try {
    const data = await Pages.findOne(query).lean();
    return getActionSuccessResponse(data);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};

export const updateData = async (id, data) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return getActionFailureResponse("Invalid id format", "toast");
    }

    if (!data || typeof data !== "object") {
      return getActionFailureResponse("Invalid data format", "toast");
    }

    // Use findByIdAndUpdate instead of updateOne to get the updated document
    const resp = await Pages.findByIdAndUpdate(id, data, {
      new: true, // Return the updated document
      runValidators: true,
    });

    if (!resp) {
      return getActionFailureResponse("Document not found", "toast");
    }

    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error updating data:", error);
    return getActionFailureResponse(error.message, "toast");
  }
};

export const deleteData = async (id) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return getActionFailureResponse("Invalid id format", "toast");
    }

    const resp = await Pages.deleteOne({ _id: id });

    if (!resp) {
      return getActionFailureResponse("Document not found", "toast");
    }

    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error deleting data:", error);
    return getActionFailureResponse(error.message, "toast");
  }
};

export const addData = async (data) => {
  try {
    if (!data.name) {
      return getActionFailureResponse("name is required", "name");
    }

    if (!data.slug) {
      return getActionFailureResponse("slug is required", "slug");
    }

    if (!data.fields) {
      return getActionFailureResponse("fields is required", "fields");
    }

    const resp = await Pages.create(data);
    return getActionSuccessResponse(resp);
  } catch (error) {
    getActionFailureResponse(error.message, "toast");
  }
};
