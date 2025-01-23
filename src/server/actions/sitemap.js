"use server";

import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";
import sitemap from "../models/sitemap";

const { default: dbConnect } = require("@/config/db-connect");

await dbConnect();


export async function addUrl(url) {
    await dbConnect();
    console.log(url)
    try {
        const newUrl = new sitemap({ url });
        await newUrl.save();
        return getActionSuccessResponse("URL added successfully");
    } catch (error) {
        return getActionFailureResponse(error.message);
    }
}

export async function getUrls(page,limit) {
    await dbConnect();
    const query =  sitemap.find().sort({ lastModified: -1 })
    page = page || 1;
    limit = limit || 12;
    const sitemaps = await query.skip((page - 1) * limit).limit(limit);
    const count = await sitemap.countDocuments();
    const totalPages = Math.ceil(count / limit);
    return getActionSuccessResponse(sitemaps, totalPages );
}

export async function deleteUrl(id) {
    console.log(id)
    await dbConnect();
    try {
        await sitemap.findByIdAndDelete(id);
        return getActionSuccessResponse("URL deleted successfully");
    } catch (error) {
        return getActionFailureResponse(error.message);
    }
}

export async function updateUrl(id, url) {
    await dbConnect();
    try {
        await sitemap.findByIdAndUpdate(id, { url });
        return getActionSuccessResponse("URL updated successfully");
    } catch (error) {
        return getActionFailureResponse(error.message);
    }
}