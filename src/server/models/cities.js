import mongoose from "mongoose";

const citySchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);

citySchema.index({ name: 1 }, { unique: true });
citySchema.index({ createdAt: -1 });

const Cities = mongoose.models.cities || mongoose.model("cities", citySchema);

export default Cities;
