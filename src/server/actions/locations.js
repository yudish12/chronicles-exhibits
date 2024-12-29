"use server";

import dbConnect from "@/config/db-connect";
import Locations from "../models/locations";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";
import mongoose from "mongoose";
import Cities from "../models/cities";

await dbConnect();

export const getAllData = async () => {
  try {
    const data = await Locations.find().lean();
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

    const resp = await Locations.updateOne({ _id: id }, data, {
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

export const deleteData = async (id) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return getActionFailureResponse("Invalid id format", "toast");
    }
    const resp = await Locations.deleteOne({ _id: id });
    if (!resp) {
      return getActionFailureResponse("Document not found", "toast");
    }
    return getActionSuccessResponse(resp);
  } catch (error) {
    getActionFailureResponse(error.message, "toast");
  }
};
export const addData = async (data) => {
  try {
    // if (!data.name) {
    //   return getActionFailureResponse("Name is required", "name");
    // }
    if (!data.continent) {
      return getActionFailureResponse("Continent is required", "description");
    }
    if (!data.city) {
      return getActionFailureResponse("City is required", "description");
    }

    const resp = await Locations.create(data);
    return getActionSuccessResponse(resp);
  } catch (error) {
    getActionFailureResponse(error.message, "toast");
  }
};

export const getCities = async (skip, limit) => {
  try {
    let query = Cities.find()
    if(skip){
      query = query.skip(skip)
    }
    if(limit){
      query = query.limit(limit)
    }
    const count = await Cities.countDocuments();
    const data = await query.lean();
    return getActionSuccessResponse(data , count);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};

export const addCity = async (data) => {
  try {
    if (!data.name) {
      return getActionFailureResponse("Name is required", "name");
    }

    const resp = await Cities.create(data);
    return getActionSuccessResponse(resp);
  } catch (error) {
    getActionFailureResponse(error.message, "toast");
  }
};

export const deleteCity = async (id) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return getActionFailureResponse("Invalid id format", "toast");
    }
    const resp = await Cities.deleteOne({ _id: id });
    if (!resp) {
      return getActionFailureResponse("Document not found", "toast");
    }
    return getActionSuccessResponse(resp);
  } catch (error) {
    getActionFailureResponse(error.message, "toast");
  }
};

export const updateCity = async (id, data) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return getActionFailureResponse("Invalid id format", "toast");
    }

    if (!data || typeof data !== "object") {
      return getActionFailureResponse("Invalid data format", "toast");
    }

    const resp = await Cities.updateOne({ _id: id }, data, {
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

export const bulkInsertCities = async (data) => {
  try {
    if (!data || typeof data !== "object") {
      return getActionFailureResponse("Invalid data format", "toast");
    }
    data.forEach((item) => {
      const resp = Cities.create({ name: item });
    });
  } catch (error) {
    console.error("Error updating data:", error);
    return getActionFailureResponse(error.message, "toast");
  }
};
