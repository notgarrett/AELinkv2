import mongoose from "mongoose";

import { identifyDiscordProfile } from "./identifyProfile";
import { getRobloxName } from "./getRobloxName";
import { ProfileSchema } from "../models/ProfileModel";

const User = mongoose.model("Users", ProfileSchema);

export const addUsername = async (id) => {
  let profile = await identifyDiscordProfile(id);
  console.log(id);
  if (!profile) return;
  let robloxname = await getRobloxName(profile.RobloxId);
  User.updateOne(
    { DiscordId: id },
    { $set: { RobloxUserName: robloxname } },
    { upsert: true },
    (err, doc) => {
      if (err) console.error(err);
      console.log(doc);
    }
  );
};
