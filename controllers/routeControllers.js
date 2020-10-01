// Imports //////////////////////////
///////////////////////

import { ProfileSchema } from "../models/ProfileModel";
import { VerificationSchema } from "../models/VerificationModel";
import mongoose from "mongoose";
import Discord from "discord.js";
import tokens from "../tokens.json";

const bot = new Discord.Client();
const User = mongoose.model("Users", ProfileSchema);
const Verification = mongoose.model("Verificaiton", VerificationSchema);

const token = tokens.token;

bot.login(token);

export const getAllProfiles = (req, res) => {
  User.find({}, (err, doc) => {
    res.send(doc);
  });
};

export const addOneProfile = (req, res) => {
  const newProfile = new User({
    DiscordId: req.body.DiscordId,
    RobloxId: req.body.RobloxId,
  });
  newProfile.save((err, profile) => {
    res.send(profile);
  });
};

export const getOneProfiles = (req, res) => {
  User.findOne({ RobloxId: req.params }, (err, doc) => {
    if (doc) {
      res.send(doc);
    } else res.send({ message: "User does not exist!", failure: true });
  });
};

