import mongoose from "mongoose";

const boothSchema = new mongoose.Schema(
  {
    booth_code: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    booth_size: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "boothsizes",
      required: true,
    },
    booth_code: {
      type: String,
      required: true,
    },
    thumbnail_image: {
      type: String,
      required: true,
    },
    all_images: [
      {
        type: String,
        required: true,
      },
    ],
    image_alt_text: {
      type: String,
      required: true,
    },
    package_title: {
      type: String,
      required: true,
    },
    package_description: {
      type: String,
      required: true,
    },
    meta_title: {
      type: String,
      required: true,
    },
    meta_description: {
      type: String,
      required: true,
    },
    meta_keywords: [String],
  },
  { timestamps: true }
);

boothSchema.index({ booth_code: 1 }, { unique: true });
boothSchema.index({ createdAt: -1 });
boothSchema.index({ slug: 1 }, { unique: true });

const Booth = mongoose.models.booths || mongoose.model("booths", boothSchema);

export default Booth;
