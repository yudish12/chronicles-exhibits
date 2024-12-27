"use server";

import dbConnect from "@/config/db-connect";
import Pages from "../models/pages";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";
import mongoose from "mongoose";
import { boothsizePageFields } from "@/lib/config";
import pages from "../models/pages";

await dbConnect();

export const getAllPages = async () => {
  try {
    const data = await Pages.find().sort({ createdAt: -1 }).lean();
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

export const updateData = async (name, data) => {
  try {
    if (!name) {
      return getActionFailureResponse("Invalid id format", "toast");
    }

    if (!data || typeof data !== "object") {
      return getActionFailureResponse("Invalid data format", "toast");
    }

    if (!data.meta_title || !data.meta_description || !data.meta_keywords) {
      return getActionFailureResponse("Invalid seo data format", "toast");
    }

    if (!data.fields) {
      return getActionFailureResponse("Invalid fields data format", "toast");
    }

    Object.keys(data.fields).forEach((key) => {
      if (!boothsizePageFields.includes(key)) {
        return getActionFailureResponse("Invalid field key", "toast");
      }
    });

    Object.values(data.fields).forEach((value) => {
      if (!value) {
        return getActionFailureResponse("Invalid field value", "toast");
      }
    });

    const resp = await pages
      .updateOne({ name: name }, data, {
        new: true, // Return the updated document
        runValidators: true, // Run validation
        upsert: true, // Create a new document if it doesn't exist
        setDefaultsOnInsert: true, // Set default values on insert
      })
      .lean();

    if (!resp) {
      return getActionFailureResponse("Document not found", "toast");
    }
    console.log("resp", resp);
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
