import { failure, success } from "../embeds/embedFunctions";
import mongoose from "mongoose";
import { ProfileSchema } from "../models/ProfileModel";
import { getRobloxId } from "../functions/getRobloxId";
import {
  identifyDiscordProfile,
  identifyRobloxProfile,
} from "../functions/identifyProfile";

const User = mongoose.model("Users", ProfileSchema);

module.exports = {
  name: "wipe",
  description: "wipes the user from the db",
  async execute(msg, args) {
    if (!args[1]) {
      failure(
        msg.channel,
        "Invalid arguements!",
        "Please fill out the command as: _wipe username"
      );
      return;
    }

    const robloxUserId = await getRobloxId(args[1]);
    const checkProfile = await identifyRobloxProfile(robloxUserId);

    if (!robloxUserId) {
      failure(
        msg.channel,
        "Invalid ROBLOX User!",
        "The ROBLOX user does not exist."
      );
      return;
    }

    if (!checkProfile) {
      failure(
        msg.channel,
        "User does not exist!",
        "The ROBLOX user does not exist in the sentinel database."
      );
      return;
    }

    console.log(robloxUserId);

    User.deleteOne({ RobloxId: robloxUserId }, (err, doc) => {
      if (err) {
        failure(msg.channel, "Error!", "There was an unidentified error!");
      } else {
        success(
          msg.channel,
          "User removed!",
          "The user has been removed to the database!"
        );
      }
    });
  },
};
