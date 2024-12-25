import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  name: String,
});

const Cities = mongoose.models.cities || mongoose.model("cities", citySchema);

export default Cities;
