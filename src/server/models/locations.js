import { continents } from "@/utils/constants/enums";
import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  title: String,
  body: String,
});

const Locations =
  mongoose.models.locations || mongoose.model("locations", locationSchema);

export default Locations;
