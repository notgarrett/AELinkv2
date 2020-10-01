import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const ProfileSchema = new Schema({
  RobloxId: {
    type: Number,
    required: true,
  },
  DiscordId: {
    type: Number,
    required: true,
  },
  Roles: {
    type: Array,
  },
  Banned: {
    type: Boolean,
  },
});
