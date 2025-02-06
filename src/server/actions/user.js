"use server";

import dbConnect from "@/config/db-connect";
import mongoose from "mongoose";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";
import User from "../models/user";

export const getAllUsers = async (skip , limit , projection) =>
{
    try{
    let query = User.find({isAdmin : false}).lean();
    if (skip) {
      query = query.skip(skip);
    }

    if (limit) {
      query = query.limit(limit);
    }

    if (projection) {
      query = query.select(projection);
    }
    query = query.sort({ name: 1 });

    const data = await query.lean();
    const count = await User.countDocuments();
    return getActionSuccessResponse(data, count);
}
catch (error) {
        return getActionFailureResponse(error, "toast");
}
}

export const updateData = async (id, data) => {
    try {
      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return getActionFailureResponse("Invalid id format", "toast");
      }
  
      if (!data || typeof data !== "object") {
        return getActionFailureResponse("Invalid data format", "toast");
      }
  
      const resp = await User.updateOne({ _id: id }, data, {
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
      const resp = await User.deleteOne({ _id: id });
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
      
      if (!data.email) {
        return getActionFailureResponse("Continent is required", "description");
      }
      if (!data.password) {
        return getActionFailureResponse("City is required", "description");
      }
      const resp = await User.create(data);
      return getActionSuccessResponse(resp);
    } catch (error) {
      getActionFailureResponse(error.message, "toast");
    }
  };
  
  export const findSingleUser = async (query) => {
    try {
      const data = await User.findOne(query).lean();
      console.log("user data " , data)
      return getActionSuccessResponse(data);
    } catch (error) {
      return getActionFailureResponse(error, "toast");
    }
  };