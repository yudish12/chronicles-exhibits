"use server";

import dbConnect from "@/config/db-connect";
import Booth from "../models/booths";
import mongoose from "mongoose";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";

await dbConnect();

export const getAllData = async () => {
  try {
    const data = await Booth.find().lean();
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
    const resp = await Booth.findByIdAndUpdate(
      id,
      {
        name: data.name,
        description: data.description,
        code: data.code,
        boothSize: data.boothSize,
        main_image: data.main_image,
        images: data.images,
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
    if (!data.name) {
      return getActionFailureResponse("Name is required", "name");
    }

    if (!data.description) {
      return getActionFailureResponse("Description is required", "description");
    }

    if (!data.boothSize) {
      return getActionFailureResponse("Booth size is required", "boothSize");
    }

    if (!data.code) {
      return getActionFailureResponse("Code is required", "code");
    }

    if (!data.main_image) {
      return getActionFailureResponse("Main image is required", "main_image");
    }

    const resp = await Booth.create(data);

    console.log(resp);
    return getActionSuccessResponse(resp);
  } catch (error) {
    getActionFailureResponse(error.message, "toast");
  }
};

export const deleteData = async (id) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return getActionFailureResponse("Invalid id format", "toast");
    }

    const resp = await Booth.deleteOne({ _id: id });

    if (!resp) {
      return getActionFailureResponse("Document not found", "toast");
    }

    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error deleting data:", error);
    return getActionFailureResponse(error.message, "toast");
  }
};
