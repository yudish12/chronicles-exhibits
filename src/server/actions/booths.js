"use server";

import dbConnect from "@/config/db-connect";
import Booth from "../models/booths";
import mongoose from "mongoose";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";

await dbConnect();

export const getAllData = async (skip, limit) => {
  try {
    let query = Booth.find().sort({ _id: 1 });

    if (skip) {
      query = query.skip(skip);
    }
    if (limit) {
      query = query.limit(limit);
    }

    const data = await query.populate("booth_size").lean();
    const count = await Booth.countDocuments();
    return getActionSuccessResponse(data, count);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};

export const getAllDataBySearch = async (searchValue) => {
  try {
    const data = await Booth.find({
      booth_code: { $regex: searchValue, $options: "i" },
    }).lean();
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
    if (!data.booth_code) {
      return getActionFailureResponse("booth_code is required", "booth_code");
    }
    if (!data.slug) {
      return getActionFailureResponse("slug is required", "slug");
    }
    if (!data.thumbnail_image) {
      return getActionFailureResponse(
        "thumbnail_image is required",
        "thumbnail_image"
      );
    }
    if (!data.image_alt_text) {
      return getActionFailureResponse(
        "image_alt_text is required",
        "image_alt_text"
      );
    }
    if (!data.packge_title) {
      return getActionFailureResponse(
        "packge_title is required",
        "packge_title"
      );
    }
    if (!data.packge_description) {
      return getActionFailureResponse(
        "packge_description is required",
        "packge_description"
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
    if (!data.all_images || !Array.isArray(data.all_images)) {
      return getActionFailureResponse("all_images is required", "all_images");
    }
    if (!data.booth_size || !data.booth_size._id) {
      return getActionFailureResponse("booth_size is required", "booth_size");
    }
    // Use findByIdAndUpdate instead of updateOne to get the updated document
    const resp = await Booth.findByIdAndUpdate(id, data, {
      new: true, // Return the updated document
      runValidators: true,
    }).lean();

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
  console.log(data);
  try {
    if (!data.booth_code) {
      return getActionFailureResponse("Booth code is required", "booth_code");
    }

    if (!data.slug) {
      return getActionFailureResponse("Slug is required", "slug");
    }

    if (!data.thumbnail_image) {
      return getActionFailureResponse(
        "Thumbnail image is required",
        "thumbnail_image"
      );
    }

    if (!data.image_alt_text) {
      return getActionFailureResponse(
        "Image alt text is required",
        "image_alt_text"
      );
    }

    if (!data.packge_title) {
      return getActionFailureResponse(
        "Package title is required",
        "packge_title"
      );
    }

    if (!data.packge_description) {
      return getActionFailureResponse(
        "Package description is required",
        "packge_description"
      );
    }

    if (!data.meta_title) {
      return getActionFailureResponse("Meta title is required", "meta_title");
    }

    if (!data.meta_description) {
      return getActionFailureResponse(
        "Meta description is required",
        "meta_description"
      );
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

export const getDataByCode = async (boothCode) => {
  try {
    const data = await Booth.findOne({ booth_code: boothCode }).lean();
    return getActionSuccessResponse(data);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};

export const findSingleBooth = async (query) => {
  try {
    const data = await Booth.findOne(query).lean();
    return getActionSuccessResponse(data);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};

export const getBoothsBySize = async (boothSize) => {
  try {
    const data = await Booth.find({ booth_size: boothSize }).lean();
    return getActionSuccessResponse(data);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};
