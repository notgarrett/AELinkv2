// Imports //////////////////////////
///////////////////////

import { ProfileSchema } from "../models/ProfileModel";
import { VerificationSchema } from "../models/VerificationModel";
import mongoose from "mongoose";
import tokens from "../tokens.json";
import { success } from "../embeds/embedFunctions";

import { bot } from "../index";
import { json } from "express";
const User = mongoose.model("Users", ProfileSchema);
const Verification = mongoose.model("Verification", VerificationSchema);

export const getAllProfiles = (req, res) => {
  User.find({}, (err, doc) => {
    res.send(doc);
  });
};

export const addOneProfile = (req, res) => {
  const guild = bot.guilds.resolve(tokens.serverid);

  let verifiedRole = guild.roles.cache.find((r) => r.name === "VERIFIED");
  let unverifiedRole = guild.roles.cache.find((r) => r.name === "VERIFYING");

  let member = guild.members.resolve(req.body.DiscordId);
  console.log(member);

  member.roles.add(verifiedRole).catch(console.error);
  member.roles.remove(unverifiedRole).catch(console.error);

  let roles = [];

  member.roles.cache.forEach((element) => {
    roles.push(element);
  });

  console.log("1");

  let query = new User({
    RobloxId: req.body.RobloxId,
    DiscordId: req.body.DiscordId,
    Roles: roles,
    RobloxUserName: req.body.UserName,
  });

  query.save((err, profile) => {
    if (err) throw err;
    if (profile) {
      Verification.deleteOne({ DiscordId: req.body.DiscordId });
      bot.users
        .fetch(req.body.DiscordId)
        .then((user) => {
          success(
            user,
            "Verified!",
            `You have been verified as ${req.body.UserName}`
          );
          res.send(profile);
        })
        .catch(console.error);
    }
  });
};

export const getOneProfiles = (req, res) => {
  User.findOne(req.params, (err, doc) => {
    if (err) throw err;
    if (doc) {
      res.send(doc);
    } else res.send({ message: "User does not exist!", failure: true });
  });
};

export const getOneVerificationCode = (req, res) => {
  Verification.findOne(req.params, (err, doc) => {
    if (err) throw err;
    if (doc) {
      res.send(doc);
    } else res.send({ message: "Key does not exist!", failure: true });
  });
};

export const getVerificationCodes = (req, res) => {
  Verification.find({}, (err, doc) => {
    if (err) throw err;
    if (doc) {
      res.send(doc);
    } else res.send({ message: "Keys do not exist!", failure: true });
  });
};

export const getPrettyData = (req, res) => {
  res.send(User.find().pretty());
};
