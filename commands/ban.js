import mongoose from "mongoose";
import { ProfileSchema } from "../models/ProfileModel";
import { VerificationSchema } from "../models/VerificationModel";
import {
  notification,
  success,
  failure,
  verification,
} from "../embeds/embedFunctions";
import fetch from "node-fetch";
import e from "express";

const User = mongoose.model("Users", ProfileSchema);
const Verification = mongoose.model("Verificaiton", VerificationSchema);

const getRobloxId = async (robloxId) => {
  return new Promise((resolve, reject) => {
    fetch(`https://api.roblox.com/users/get-by-username?username=${robloxId}`)
      .then((res) => res.json())
      .then((json) => {
        resolve(json.Id);
      });
  });
};

module.exports = {
  name: "ban",
  description: "Bans the user.",
  async execute(msg, args) {
    const robloxUser = args[1];
    const robloxID = await getRobloxId(robloxUser);
    User.updateOne(
      { RobloxId: robloxID },
      { Banned: true },
      { upsert: true },
      (err, doc) => {
        success(msg.channel, "Banned!", `${robloxUser} has been banned!`);
      }
    );
  },
};
