import mongoose from "mongoose";
import { ProfileSchema } from "../models/ProfileModel";
import { success } from "../embeds/embedFunctions";
import { getRobloxId } from "../functions/getRobloxId";

const User = mongoose.model("Users", ProfileSchema);

module.exports = {
  name: "unban",
  description: "Unbans the user.",
  async execute(msg, args) {
    const robloxUser = args[1];
    const robloxID = await getRobloxId(robloxUser);
    User.updateOne(
      { RobloxId: robloxID },
      { Banned: false },
      { upsert: true },
      (err, doc) => {
        success(msg.channel, "Unbanned!", `${robloxUser} has been unbanned!`);
      }
    );
  },
};
