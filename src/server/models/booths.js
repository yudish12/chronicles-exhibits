import mongoose from "mongoose";

const boothSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  boothSize: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "boothsizes",
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  main_image: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
});

const Booth = mongoose.models.booths || mongoose.model("booths", boothSchema);

export default Booth;
