import mongoose from "mongoose";
import { ProfileSchema } from "../models/ProfileModel";
import {
  notification,
  success,
  failure,
  verification,
} from "../embeds/embedFunctions";
import { getRobloxId } from "../functions/getRobloxId";

const User = mongoose.model("Users", ProfileSchema);

module.exports = {
  name: "ban",
  description: "Bans the user.",
  async execute(msg, args) {
    const robloxUser = args[1];
    const robloxID = await getRobloxId(robloxUser);

    if (robloxID && args) {
      User.updateOne(
        { RobloxId: robloxID },
        { Banned: true },
        { upsert: true },
        (err, doc) => {
          success(msg.channel, "Banned!", `${robloxUser} has been banned!`);
        }
      );
    } else {
      failure(
        msg.channel,
        "User does not exist!",
        "The user you attempted to ban does not exist."
      );
    }
  },
};
