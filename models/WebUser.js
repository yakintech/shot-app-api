const mongoose = require("mongoose");

const WebUserSchema = new mongoose.Schema(
  {
    supabaseId: {
      type: String,
      required:true
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      // required: true,
      // unique: true,
    },
    birthDate: {
      type: Date,
    },
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
    image: String,
    position: {
      type: String,
      enum: [
        "Goalkeeper",
        "Right Back",
        "Left Back",
        "Center Back",
        "Defensive Midfielder",
        "Central Midfielder",
        "Attacking Midfielder",
        "Right Winger",
        "Left Winger",
        "Striker",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    followFacibilities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Facibility",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WebUser", WebUserSchema);
