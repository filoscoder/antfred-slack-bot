import mongoose, { Schema } from "mongoose";

const ptoSchema = new Schema(
  {
    approver: {
      type: String,
      required: [true, "`approver` is required"],
    },
    reporter: {
      type: String,
      required: [true, "`reporter` is required"],
    },
    department: {
      type: String,
      required: [true, "`department` is required"],
    },
    start: {
      type: String,
      required: [true, "`start` is required"],
    },
    end: {
      type: String,
      required: [true, "`end` is required"],
    },
    reason: {
      type: String,
      required: [true, "`reason` is required"],
    },
    author: {
      id: String,
      username: String,
      name: String,
      team_id: String,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    collection: "Off",
    versionKey: false,
    minimize: false,
    timestamps: true,
  },
);

export const Off = mongoose.model("Off", ptoSchema);
