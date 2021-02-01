import mongoose from "mongoose";
import { ProfileSchema } from "../models/ProfileModel";

const User = mongoose.model("Users", ProfileSchema);

// Checks if a profile already exists.

export const identifyDiscordProfile = async (discordMemberId) => {
  return new Promise((resolve, reject) => {
    User.findOne({ DiscordId: discordMemberId }, (err, doc) => {
      if (err) throw err;
      console.log(doc);
      if (doc) {
        console.log(doc);
        resolve(doc);
      } else resolve(false);
    });
  });
};

export const identifyRobloxProfile = async (robloxMemberId) => {
  return new Promise((resolve, reject) => {
    User.findOne({ RobloxId: robloxMemberId }, (err, doc) => {
      if (err) throw err;
      if (doc) {
        console.log(doc);
        resolve(doc);
      } else resolve(false);
    });
  });
};
