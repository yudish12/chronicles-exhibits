import mongoose from "mongoose";

const boothSizesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const BoothSize =
  mongoose.models.boothsizes || mongoose.model("boothsizes", boothSizesSchema);

export default BoothSize;
