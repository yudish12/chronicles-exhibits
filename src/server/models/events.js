import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  event_name: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  location_id: {
    type: mongoose.Types.ObjectId,
    ref: "locations",
    required: true,
  },
  icon: {
    type: String,
    default: "/event-sample.png",
  },
});

const events = mongoose.models.events || mongoose.model("events", eventSchema);

export default events;
