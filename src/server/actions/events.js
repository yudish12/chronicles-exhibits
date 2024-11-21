"use server";

import dbConnect from "@/config/db-connect";
import events from "../models/events";
import { getActionFailureResponse, getActionSuccessResponse } from "@/utils";
import Locations from "../models/locations";
import mongoose from "mongoose";

export const getAllData = async () => {
    try {
      const data = await events.find().populate("location_id", "city continent").lean();
      return getActionSuccessResponse(data);
    } catch (error) {
      return getActionFailureResponse(error, "toast");
    }
  };

  export const getAllLocations = async () => {
    try {
      const data = await Locations.find({}).lean();
      console.log("==data==" , data)
      return getActionSuccessResponse(data);
    } catch (error) {
      return getActionFailureResponse(error, "toast");
    }
  };

  export const addData = async (data) => {
    try {
      if(!data.event_name){
          return getActionFailureResponse("event name is required", "description");
      }
      if (!data.start_date) {
        return getActionFailureResponse("Start date is required", "description");
      }
      if (!data.end_date) {
        return getActionFailureResponse("End date is required", "description");
      }

      if(!data.location){
        return getActionFailureResponse("Location is required", "description");
      }

      const resp = await events.create(data);
      return getActionSuccessResponse(resp);
    } catch (error) {
      getActionFailureResponse(error.message, "toast");
    }
  };