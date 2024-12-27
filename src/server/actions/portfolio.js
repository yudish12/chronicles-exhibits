"use server";

import dbConnect from "@/config/db-connect";
import Portfolio from "../models/portfolio";
import mongoose from "mongoose";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";

await dbConnect();
export const findPortfolioById = async (id) => {
  try {
    const data = await Portfolio.find({ _id: id }).lean();
    return getActionSuccessResponse(data);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};
export const getAllPortfolios = async (limit, skip) => {
  try {
    let query = Portfolio.find().sort({ createdAt: -1 }).lean();
    if (limit) query = await query.limit(limit);
    if (skip) query = await query.skip(skip);
    const data = await query;
    return getActionSuccessResponse(data);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};

export const updateAllPortfolios = async (id, data) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return getActionFailureResponse("Invalid id format", "toast");
    }
    if (!data || typeof data !== "object") {
      return getActionFailureResponse("Invalid data format", "toast");
    }
    const resp = await Portfolio.findByIdAndUpdate(
      id,
      {
        image: data.image,
        image_alt_text: data.image_alt_text,
        // description : data.description
      },
      {
        new: true,
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

export const addPortfolio = async (data) => {
  try {
    if (!data.image) {
      return getActionFailureResponse("Image is required", "image");
    }
    if (!data.image_alt_text) {
      return getActionFailureResponse("alt text is required", "image_alt_text");
    }
    // if(!data.description){
    //     return getActionFailureResponse("Description is required", "description");
    // }
    const resp = await Portfolio.create(data);
    return getActionSuccessResponse(resp);
  } catch (error) {
    getActionFailureResponse(error.message, "toast");
  }
};

export const deletePortfolio = async (id) => {
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return getActionFailureResponse("Invalid id format", "toast");
  }
  const response = await Portfolio.findByIdAndDelete(id);
  if (!response) {
    return getActionFailureResponse("Portfolio not found ", "toast");
  }
  return getActionSuccessResponse(response);
};

export const addMultiImages = async (data) => {
  try {
    if (!data || typeof data !== "object") {
      return getActionFailureResponse("Invalid data format", "toast");
    }
    data[0].forEach((item) => {
      const resp = Portfolio.create({ image: item, image_alt_text: "testing" });
    });
  } catch (error) {
    getActionFailureResponse(error.message, "toast");
  }
};
