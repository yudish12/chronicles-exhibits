"use server";

import dbConnect from "@/config/db-connect";
import events from "../models/events";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";
import Locations from "../models/locations";
import mongoose from "mongoose";

// await dbConnect()
export const getAllData = async () => {
    try {
      await dbConnect();
      const data = await events.find().populate("location_id" , "city continent").lean();
    //   console.log("[]" , data)
      return getActionSuccessResponse(data);
    } catch (error) {
      return getActionFailureResponse(error, "toast");
    }
  };

  export const getAllLocations = async () => {
    try {
      await dbConnect();
      const data = await Locations.find({}, { city: 1, continent: 1 }).lean();
    //   console.log("==locations data==" , data)
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
  
      // Find and update the document, returning the updated version
      const updatedEvent = await events.findOneAndUpdate(
        { _id: id },
        data,
        {
          new: true, // Return the updated document
          runValidators: true, // Run validation
        }
      );
  
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
      await dbConnect();
      if(!data.event_name){
          return getActionFailureResponse("event name is required", "description");
      }
      if (!data.start_date) {
        return getActionFailureResponse("Start date is required", "description");
      }
      if (!data.end_date) {
        return getActionFailureResponse("End date is required", "description");
      }

      if(!data.location_id){
        return getActionFailureResponse("Location is required", "description");
      }

      const resp = await events.create(data);
      console.log("added data ",resp)
      return getActionSuccessResponse(resp);
    } catch (error) {
      getActionFailureResponse(error.message, "toast");
    }
  };
  export const deleteData = async(id)=>{
    try {
      await dbConnect();
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
  }