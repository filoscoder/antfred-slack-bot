import mongoose, { Schema } from "mongoose";

const formSchema = new Schema(
  {
    name: {
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
    collection: "notes",
    versionKey: false,
    minimize: false,
  },
);

export const Forms = mongoose.model("Forms", formSchema);
