"use server";

import dbConnect from "@/config/db-connect";
import Portfolio from "../models/portfolio";
import Locations from "../models/locations";
import pages from "../models/pages";
import mongoose from "mongoose";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";
import {
  PORTFOLIO_CMS_PAGE_NAMES,
  PORTFOLIO_STATIC_PAGES,
  formatPortfolioPageLabel,
} from "@/utils/portfolio-pages";

await dbConnect();

const DEFAULT_PORTFOLIO_LIMIT = 9;

export const getPortfolioPageOptions = async () => {
  try {
    await dbConnect();
    const locations = await Locations.find().select("name").sort({ name: 1 }).lean();
    const cmsPages = await pages
      .find({ name: { $in: PORTFOLIO_CMS_PAGE_NAMES } })
      .select("name")
      .lean();

    const pageOptions = [
      ...PORTFOLIO_STATIC_PAGES,
      ...cmsPages.map((page) => ({
        value: page.name,
        label: formatPortfolioPageLabel(page.name),
      })),
    ];

    const locationOptions = locations.map((loc) => ({
      value: loc.name,
      label: loc.name,
    }));

    return getActionSuccessResponse({ locations: locationOptions, pages: pageOptions });
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};

export const getPortfoliosForPage = async (
  pageName,
  skip = 0,
  limit = DEFAULT_PORTFOLIO_LIMIT,
  projection,
  { useFallback = true } = {},
) => {
  try {
    await dbConnect();

    const buildQuery = (filter) => {
      let query = Portfolio.find(filter).sort({ _id: -1 });
      if (skip) query = query.skip(skip);
      if (limit) query = query.limit(limit);
      if (projection) query = query.select(projection);
      return query;
    };

    let data = [];

    if (!pageName) {
      data = await buildQuery({}).lean();
      const count = await Portfolio.countDocuments();
      return getActionSuccessResponse(data, count);
    }

    data = await buildQuery({ show_on_pages: pageName }).lean();

    if (useFallback && data.length === 0) {
      data = await buildQuery({}).lean();
    }

    const count = await Portfolio.countDocuments({ show_on_pages: pageName });

    return getActionSuccessResponse(data, count);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};
export const findPortfolioById = async (id) => {
  try {
    const data = await Portfolio.find({ _id: id }).lean();
    return getActionSuccessResponse(data);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};
export const getAllPortfolios = async (
  skip,
  limit,
  projection,
  pageFilter = null,
) => {
  try {
    await dbConnect();

    let filter = {};
    if (Array.isArray(pageFilter) && pageFilter.length > 0) {
      filter = { show_on_pages: { $in: pageFilter } };
    } else if (typeof pageFilter === "string" && pageFilter) {
      filter = { show_on_pages: pageFilter };
    }

    let query = Portfolio.find(filter).sort({ _id: -1 });
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
    const count = await Portfolio.countDocuments(filter);
    return getActionSuccessResponse(data, count);
  } catch (error) {
    return getActionFailureResponse(error, "toast");
  }
};

export const getAllDataBySearch = async (searchValue) => {
  try {
    const data = await Portfolio.find({
      image_alt_text: { $regex: searchValue, $options: "i" },
    }).lean();
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
        show_on_pages: data.show_on_pages ?? [],
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
