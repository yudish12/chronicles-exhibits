"use server";

import dbConnect from "@/config/db-connect";
import Portfolio from "../models/portfolio";
import mongoose from "mongoose";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";

await dbConnect();

export const getAllPortfolios = async () => {
    try {
      const data = await Portfolio.find().lean();
      return getActionSuccessResponse(data);
    } catch (error) {
      return getActionFailureResponse(error, "toast");
    }
  };

export const updateAllPortfolios = async(id , data)=>{
    try{
        if(!id || !mongoose.Types.ObjectId.isValid(id)){
            return getActionFailureResponse("Invalid id format", "toast");
        }
        if(!data || typeof data !== 'object'){
            return getActionFailureResponse("Invalid data format", "toast");
        }
        const resp = await Portfolio.findByIdAndUpdate(
            id, 
            {
                image : data.image , 
                heading : data.heading, 
                description : data.description
            },
            {
                new: true, 
                runValidators: true,
            }
        ).lean();
        if (!resp) 
        {
            return getActionFailureResponse("Document not found", "toast");
        }
        return getActionSuccessResponse(resp);
    }catch(error){
        console.error("Error updating data:", error);
        return getActionFailureResponse(error.message, "toast");
    }
}

export const addPortfolio = async (data)=>{
try{
if(!data.image){
    return getActionFailureResponse("Image is required", "image");
}
if(!data.heading){
    return getActionFailureResponse("Heading is required", "heading");
}
if(!data.description){
    return getActionFailureResponse("Description is required", "description");
}
const resp = await Portfolio.create(data);
return getActionSuccessResponse(resp);
}catch(error){
    getActionFailureResponse(error.message, "toast");
}
}

export const deletePortfolio = async (id)=>{
    if(!id || !mongoose.Types.ObjectId.isValid(id)){
        return getActionFailureResponse("Invalid id format", "toast");
    }
    const response = await Portfolio.findByIdAndDelete(id);
    if(!response){
        return getActionFailureResponse("Portfolio not found ", "toast");
    }
    return getActionSuccessResponse(response);
}