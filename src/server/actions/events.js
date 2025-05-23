"use server";

import dbConnect from "@/config/db-connect";
import events from "../models/events";
import {
  getActionFailureResponse,
  getActionSuccessResponse,
  isValidEmail,
  isValidWebsite,
} from "@/utils";
import mongoose from "mongoose";
import Cities from "../models/cities";
await dbConnect();

export const getEventByCity = async (
  filter = {},
  city,
  skip,
  limit,
  projection
) => {
  try {
    console.log("city", city);
    let searchFilter = { ...filter };
    // Normalize the input city by removing spaces, hyphens, and converting to lowercase
    const normalizedCity = city.replace(/[\s-]+/g, "").toLowerCase();

    // Construct the query using $expr and $regex
    let query = events
      .find({
        ...searchFilter,
        $expr: {
          $regexMatch: {
            input: {
              $replaceAll: { input: "$city", find: " ", replacement: "" },
            },
            regex: normalizedCity,
            options: "i", // Case-insensitive match
          },
        },
      })
      .sort({ start_date: 1 });

    if (skip) {
      query = query.skip(skip);
    }

    if (limit) {
      query = query.limit(limit);
    }

    if (projection) {
      query = query.select(projection);
    }
    let eventsFetched = await query.lean();
    if (eventsFetched.length < 4) {
      const remainingCount = 4 - eventsFetched.length;
      const additionalEvents = await events.aggregate([
        { $match: { _id: { $nin: eventsFetched.map((e) => e._id) } } },
        { $sample: { size: remainingCount } },
      ]);
      eventsFetched = eventsFetched.concat(additionalEvents);
    }
    // Apply skip, limit, and projection if provided

    // Execute the query and get the total count
    // const data = await query.lean();
    // const count = await events.countDocuments({
    //   $expr: {
    //     $regexMatch: {
    //       input: { $replaceAll: { input: "$city", find: " ", replacement: "" } },
    //       regex: normalizedCity,
    //       options: "i",
    //     },
    //   },
    // });

    // let events = await events.find({city}).limit(4)
    console.log(eventsFetched);
    const count = eventsFetched.length;
    return getActionSuccessResponse(eventsFetched, count);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};

export const getAllData = async (
  skip,
  limit,
  projection,
  filter,
  admin = false
) => {
  try {
    let queryFilt = {};
    if (filter) {
      queryFilt = filter;
    }
    let query = events
      .find(queryFilt)
      .sort(admin ? { _id: -1 } : { start_date: 1 });
    if (skip) {
      query = query.skip(skip);
    }
    if (limit) {
      query = query.limit(limit);
    }
    if (projection) {
      query = query.select(projection);
    }
    const data = await query.lean();
    const count = await events.countDocuments();
    //   console.log("[]" , data)
    return getActionSuccessResponse(data, count);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};

export const getAllDataBySearch = async (searchValue) => {
  try {
    if (searchValue.toLowerCase() === "expired") {
      const data = await events.find({
        end_date: { $lte: new Date() },
      });
      return getActionSuccessResponse(data, "not-requested");
    }

    const data = await events
      .find({
        event_name: { $regex: searchValue, $options: "i" },
      })
      .lean();
    return getActionSuccessResponse(data);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};

export const findEventById = async ({ id }) => {
  try {
    const data = await events.find({ _id: id }).lean();
    return getActionSuccessResponse(data);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};

export const getAllLocations = async () => {
  try {
    const data = await Cities.find();
    //   console.log("==locations data==" , data)
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

    // Convert dates to proper Date objects
    if (data.start_date) {
      data.start_date = new Date(data.start_date);
    }
    if (data.end_date) {
      data.end_date = new Date(data.end_date);
    }

    if (String(data.isDraft) === "false") {
      const validationError = await validateEventData(data);
      if (validationError) return validationError;
    }

    data.slug = data.slug.replaceAll(" ", "-").toLowerCase();

    const updatedEvent = await events.findOneAndUpdate({ _id: id }, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return getActionFailureResponse("Document not found", "toast");
    }

    return getActionSuccessResponse(updatedEvent);
  } catch (error) {
    console.error("Error updating data:", error);
    return getActionFailureResponse(error.message, "toast");
  }
};

export const addData = async (data) => {
  try {
    let validationError = false;
    if (data.isDraft === "false")
      validationError = await validateEventData(data);
    console.log("validation error ", validationError);
    if (validationError) return validationError;

    data.slug = data.slug.replaceAll(" ", "-").toLowerCase();

    const resp = await events.create(data);

    return getActionSuccessResponse(resp);
  } catch (error) {
    console.log(error);
    getActionFailureResponse(error.message, "toast");
  }
};
export const deleteData = async (id) => {
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return getActionFailureResponse("Invalid id format", "toast");
    }

    const resp = await events.deleteOne({ _id: id });

    if (!resp) {
      return getActionFailureResponse("Document not found", "toast");
    }

    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error deleting data:", error);
    return getActionFailureResponse(error.message, "toast");
  }
};

export const getSingleEvent = async (filter) => {
  await dbConnect();
  try {
    const resp = await events.findOne(filter).lean();
    if (!resp) {
      return getActionFailureResponse("Document not found", "toast");
    }

    return getActionSuccessResponse(resp);
  } catch (error) {
    console.error("Error deleting data:", error);
    return getActionFailureResponse(error.message, "toast");
  }
};

const validateEventData = async (data) => {
  const requiredFields = [
    { key: "event_name", message: "Event name is required" },
    { key: "start_date", message: "Start date is required" },
    { key: "end_date", message: "End date is required" },
    { key: "country", message: "Country is required" },
    { key: "city", message: "City is required" },
    { key: "icon", message: "Icon is required" },
    { key: "body", message: "Body is required" },
    { key: "address", message: "Address is required" },
    { key: "icon_alt_text", message: "Icon alt text is required" },
    { key: "meta_title", message: "Meta title is required" },
    { key: "meta_description", message: "Meta description is required" },
    {
      key: "meta_keywords",
      message: "Meta keywords are required",
      isArray: true,
    },
    { key: "slug", message: "Slug is required " },
    { key: "email", message: "Email is required" },
    { key: "website", message: "Website is required" },
  ];

  for (const field of requiredFields) {
    if (
      !data[field.key] ||
      (field.isArray &&
        (!Array.isArray(data[field.key]) || data[field.key].length === 0))
    ) {
      return getActionFailureResponse(field.message, field.key);
    }
  }

  if (!isValidEmail(data.email)) {
    return getActionFailureResponse("Invalid email", "email");
  }

  if (!isValidWebsite(data.website)) {
    return getActionFailureResponse("Invalid website", "website");
  }
  if (data.redirect) {
    const slugData = await findEventByRedirectSlug(data);
  }

  return null; // No errors
};

async function findEventByRedirectSlug(data) {
  // const redirectValue = data.redirect;
  try {
    const result = await events.findOne({
      slug: data.redirect,
    });
    if (result) {
      return result;
    } else {
      throw new Error("Enter a valid redirect slug");
    }
  } catch (error) {
    console.error("Error searching events:", error);
    throw error;
  }
}
