import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const VerificationSchema = new Schema({
  VerificationKey: {
    type: String,
    required: "Enter a Verification Key",
  },
  DiscordId: {
    type: Number,
    required: "Enter a discord ID",
  },
  Updating: {
    type: Boolean,
  },
});
