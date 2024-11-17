import { continents } from "@/utils/constants/enums";
import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  continent: {
    type: String,
    enum: Object.values(continents),
    required: true,
    default: continents.america,
  },
  city: {
    type: String,
    required: true,
  },
});
