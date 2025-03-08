const mongoose = require("mongoose");

const AvailabilitySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    user: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true
        },
  },
  { timestamps: true }
);

const Availability = mongoose.model("Availability", AvailabilitySchema);

module.exports = Availability;
