import mongoose, { Schema } from "mongoose";

const formSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "`name` is required"],
    },
    content: {
      type: String,
      required: [true, "`content` is required"],
    },
    author: {
      id: String,
      username: String,
      name: String,
      team_id: String,
    },
  },
  {
    collection: "Forms",
    versionKey: false,
    minimize: false,
    timestamps: true,
  },
);

export const Forms = mongoose.model("Forms", formSchema);
