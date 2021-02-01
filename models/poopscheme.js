import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const poop = new Schema(
  {
    userID: {
      type: String,
    },
    discordID: {
      type: String,
    },
    discordRoles: {
      type: Array,
    },
    states: {
      type: Object,
    },
    userName: {
      type: String,
    },
  },
  { collection: "IDs" }
);
