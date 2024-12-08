const mongoose = require("mongoose");

const FacibilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    address: String,
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    images: [],
    followedBy: [
      {
        type: String,
        ref: "WebUser",
      },
    ],
    followedCount: {
      type: Number,
      default: 0,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Facibility", FacibilitySchema);
