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
  name: "add",
  description: "adds user to the db",
  async execute(msg, args) {
    if (!args[1] || !args[2]) {
      failure(
        msg.channel,
        "Invalid arguements!",
        "Please fill out the command as: _add @user username"
      );
      return;
    }

    const robloxUserId = await getRobloxId(args[2]);
    const discordUser = await msg.guild.member(
      msg.mentions.users.first() || msg.guild.members.fetch(args[1])
    );

    if (!robloxUserId) {
      failure(
        msg.channel,
        "Invalid ROBLOX User!",
        "The ROBLOX user does not exist."
      );
      return;
    }

    if (!discordUser) {
      failure(
        msg.channel,
        "Invalid Discord User!",
        "Discord user is not recognized."
      );
      return;
    }

    let roleArray = [];
    discordUser._roles.forEach((element) => {
      roleArray.push(element);
    });

    let newUser = new User({
      RobloxId: robloxUserId,
      DiscordId: discordUser.id,
      Roles: roleArray,
    });

    newUser.save((err, newUser) => {
      success(
        msg.channel,
        "User added!",
        "The user has been added to the database!"
      );
    });
  },
};
