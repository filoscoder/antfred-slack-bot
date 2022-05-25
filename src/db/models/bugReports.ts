import mongoose, { Schema } from "mongoose";

const bugReportSchema = new Schema(
  {
    channel: {
      type: String,
      required: [true, "`channel` is required"],
    },
    browser: {
      type: String,
      required: [true, "`browser` is required"],
    },
    account: {
      type: String,
      required: [true, "`account` is required"],
    },
    url: {
      type: String,
      required: [true, "`url` is required"],
    },
    reproduction: {
      type: String,
      required: [true, "`reproduction` is required"],
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
    collection: "BugReports",
    versionKey: false,
    minimize: false,
    timestamps: true,
  },
);

export const BugReports = mongoose.model("BugReports", bugReportSchema);
