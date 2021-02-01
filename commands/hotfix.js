import { failure, success } from "../embeds/embedFunctions";
import mongoose from "mongoose";
import { ProfileSchema } from "../models/ProfileModel";
import { getGroupRank } from "../functions/getGroupRank";

const User = mongoose.model("Users", ProfileSchema);

module.exports = {
  name: "hotfix",
  description: "logic and stuff to fix recent discord changes.",
  async execute(msg, args) {
    // loop through discord members
    // loop through database
    // compare them to database
    // compare them to roblox group
    //
    msg.channel.send("This is a test, the command isn't ready just yet");
    let count = 0;
    User.find({}, (err, docs) => {
      docs.forEach(async (profile) => {
        if (profile.Banned) return;
        count++;

        let robloxId = profile.RobloxId;
        let exists = await getGroupRank(robloxId);
        console.log(count);
        if (exists) {
          console.log(profile.RobloxUserName + " is in the group!");
        } else {
          console.log(profile.RobloxUserName + " is not in the group!");
          User.deleteOne({ RobloxId: robloxId }, (err, docs) => {
            console.log("they have been deleted.");
          });
        }
      });
    });
  },
};
