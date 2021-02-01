import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ProfileSchema = new Schema(
  {
    RobloxId: {
      type: String,
      required: true,
    },
    DiscordId: {
      type: String,
      required: true,
    },
    Roles: {
      type: Array,
    },
    Banned: {
      type: Boolean,
    },
    RobloxUserName: {
      type: String,
    },
    Coin: {
      type: Number,
    },
  },
  { collection: "users" }
);
