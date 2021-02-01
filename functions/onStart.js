import mongoose from "mongoose";
import { ProfileSchema } from "../models/ProfileModel";
import { identifyDiscordProfile } from "./identifyProfile";
import { getRobloxName } from "./getRobloxName";

const User = mongoose.model("Users", ProfileSchema);

export const onStart = (members) => {
  members.forEach(async (member) => {
    let discordRoles = member._roles;
    let discordId = member.user.id;
    let profile = await identifyDiscordProfile(discordId);
    if (!profile) return;
    let robloxName = await getRobloxName(profile.RobloxId);
    User.updateOne(
      { DiscordId: discordId },
      { $set: { Roles: discordRoles, RobloxUserName: robloxName } },
      (err, docs) => {
        if (err) throw err;
        if (docs) console.log(docs);
      }
    );
  });
};
