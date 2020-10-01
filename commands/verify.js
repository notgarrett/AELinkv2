import mongoose from "mongoose";
import { ProfileSchema } from "../models/ProfileModel";
import { VerificationSchema } from "../models/VerificationModel";
import {
  notification,
  success,
  failure,
  verification,
} from "../embeds/embedFunctions";

const User = mongoose.model("Users", ProfileSchema);
const Verification = mongoose.model("Verificaiton", VerificationSchema);

const identifyProfile = async (discordMemberId, msg) => {
  return new Promise((resolve, reject) => {
    User.exists({ DiscordId: discordMemberId }, (err, doc) => {
      if (err) throw err;
      if (doc) {
        console.log(doc);
        resolve(true);
      }
      resolve(false);
    });
  });
};

const checkExistingCode = async (discordMemberId, msg) => {
  return new Promise((resolve, reject) => {
    Verification.findOne({ DiscordId: discordMemberId }, (err, doc) => {
      if (err) throw err;
      if (doc) {
        console.log(doc);
        notification(
          msg.channel,
          "Notification",
          "You have been DM'd with your verification key!"
        );
        verification(msg.author, doc.VerificationKey);
        resolve(true);
      }
      resolve(false);
    });
  });
};

function makeKey(length) {
  // Generates random key for users
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = {
  name: "verify",
  description: "Verification process for a user.",
  async execute(msg, args) {
    const serverMember = msg.member; // Server member

    // Database checks to be sure the user isn't already verified.

    console.log("Checking profiles");
    if (await identifyProfile(serverMember.id, msg)) {
      console.log("User has a profile already.");
      return;
    }

    console.log("Checking verification codes");
    if (await checkExistingCode(serverMember.id, msg)) {
      console.log("User already has a verification code.");
      return;
    }

    console.log("Checks passed, generating code.");
    // If the database checks turn up negative than this code block runs

    const newKey = makeKey(20);

    const newVerification = new Verification({
      VerificationKey: newKey,
      DiscordId: serverMember.id,
    });

    newVerification.save((err, verification) => {
      if (err) {
        console.error(err);
      }
      notification(
        msg.channel,
        "Notification",
        "You have been DM'd with your verification key!"
      );
      verification(msg.author, verification.VerificationKey);
    });
  },
};
