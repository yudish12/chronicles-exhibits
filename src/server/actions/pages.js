"use server";

import dbConnect from "@/config/db-connect";
import Pages from "../models/pages";
import {
  getActionFailureResponse,
  getActionSuccessResponse,
  getPageFieldsByName,
} from "@/utils";
import mongoose from "mongoose";
import pages from "../models/pages";
import Locations from "../models/locations";
import { revalidatePath } from "next/cache";

await dbConnect();

export const getAllPages = async (skip, limit) => {
  try {
    let query = Pages.find().sort({ _id: -1 });
    if (skip) {
      query = query.skip(skip);
    }
    if (limit) {
      query = query.limit(limit);
    }
    const data = await query.lean();
    const count = await Pages.countDocuments();
    return getActionSuccessResponse(data, count);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};
export const getSinglePage = async (query, projection) => {
  try {
    let q = Pages.findOne(query)
    if(projection){
      q = q.select(projection)
    }
    const data = await q.lean();
    return getActionSuccessResponse(data);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};

export const updateData = async (name, data, islocation) => {
  console.log("update data" , data , "FIELDS",data.fields , islocation)
  if (islocation) {
    let isValid = true;

    const locationPageFields = getPageFieldsByName("location");
    console.log("LOCATION PAGE FIELDS ",locationPageFields);
    locationPageFields.forEach((field) => {
      const currentField = data.fields.find((f) => f.key === field.key);
      console.log("current field " , currentField)
      if (!currentField) {
        isValid = false;
        return;
      }
      // console.log("ISVALID 1"  , isValid)
      if (!currentField.type) {
        isValid = false;
        return;
      }
      // console.log("ISVALID 2"  , isValid)
      if (!currentField.value || typeof currentField.value !== "string") {
        isValid = false;
        return;
      }
      // console.log("ISVALID 3"  , isValid)
    });
    console.log("ISVALID" , isValid)
    if (!isValid) {
      return getActionFailureResponse("Invalid fields data format", "toast");
    }

    const locPageResp = await Locations.updateMany(
      {
        name: name,
      },
      data,
      { new: true }
    );
    revalidatePath(`/locations/${name}`);
    return getActionSuccessResponse(locPageResp);
  }

  const pageFields = getPageFieldsByName(name);
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

    let valid = true;

    console.log(103);

    pageFields.forEach((field, ind) => {
      const currentField = data.fields.find((f) => f.key === field.key);
      console.log(currentField, ind);
      if (!currentField) {
        valid = false;
        return;
      }
      if (!currentField.type) {
        valid = false;
        return;
      }
      if (!currentField.value) {
        valid = false;
        return;
      }
    });

    if (!valid) {
      return getActionFailureResponse("Invalid fields data format", "toast");
    }

    const resp = await pages
      .updateOne({ name: name }, data, {
        new: true, // Return the updated document
      })
      .lean();

    if (!resp) {
      return getActionFailureResponse("Document not found", "toast");
    }
    if(name === "home") revalidatePath("/");
    else revalidatePath(`/${name}`);
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
