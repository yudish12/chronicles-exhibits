import mongoose from "mongoose";

const boothSizesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: String,
  image_alt_text: String,
  meta_title: String,
  meta_description: String,
});

const BoothSize =
  mongoose.models.boothsizes || mongoose.model("boothsizes", boothSizesSchema);

export default BoothSize;
