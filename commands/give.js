import { failure, success } from "../embeds/embedFunctions";
import mongoose from "mongoose";
import { ProfileSchema } from "../models/ProfileModel";
import { identifyRobloxProfile } from "../functions/identifyProfile";

const User = mongoose.model("Users", ProfileSchema);

module.exports = {
  name: "give",
  description: "gives players AECoin",
  async execute(msg, args) {
    if (!args[1] || !args[2] || Number.isInteger(args[2])) {
      failure(
        msg.channel,
        "Invalid arguements!",
        "Please fill out the command as: _give robloxid [number]"
      );
      return;
    }

    let docs = await identifyRobloxProfile(args[1]);
    let number = args[2];

    if (!docs) {
      failure(msg.channel, "Failed!", "ID does not exist in the database.");
      return;
    }

    let coinammount = 0;
    if (docs.Coin) coinammount = docs.Coin;

    coinammount = coinammount + args[2];

    User.updateOne(
      { RobloxId: args[1] },
      { Coin: coinammount },
      { upsert: true },
      (err, response) => {
        if (err) throw err;
        success(
          msg.channel,
          "Success!",
          `${coinammount} coins were added to ${docs.RobloxUserName}'s balence!`
        );
      }
    );
  },
};
