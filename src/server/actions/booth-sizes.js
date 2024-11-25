"use server";

import dbConnect from "@/config/db-connect";
import BoothSize from "../models/booth-sizes";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";
import mongoose from "mongoose";

// await dbConnect();

export const getAllData = async () => {
  try {
    await dbConnect();
    const data = await BoothSize.find().lean();
    return getActionSuccessResponse(data);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};

export const updateData = async (id, data) => {
  try {
    await dbConnect();
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return getActionFailureResponse("Invalid id format", "toast");
    }

    if (!data || typeof data !== "object") {
      return getActionFailureResponse("Invalid data format", "toast");
    }

    const resp = await BoothSize.updateOne({ _id: id }, data, {
      new: true,
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

export const addData = async (data) => {
  try {
    await dbConnect();
    if (!data.name) {
      return getActionFailureResponse("Name is required", "name");
    }

    if (!data.description) {
      return getActionFailureResponse("Description is required", "description");
    }

    const resp = await BoothSize.create(data);
    return getActionSuccessResponse(resp);
  } catch (error) {
    getActionFailureResponse(error.message, "toast");
  }
};

export const deleteData = async (id) => {
  try {
    await dbConnect();
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return getActionFailureResponse("Invalid id format", "toast");
    }

    const resp = await BoothSize.deleteOne({ _id: id });

    if (!resp) {
      return getActionFailureResponse("Document not found", "toast");
    }

    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error deleting data:", error);
    return getActionFailureResponse(error.message, "toast");
  }
};
