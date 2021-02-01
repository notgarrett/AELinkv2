import mongoose from "mongoose";
import { VerificationSchema } from "../models/VerificationModel";
import { identifyDiscordProfile } from "../functions/identifyProfile";
import { makeKey } from "../functions/makeKey";
import { notification, verification, failure } from "../embeds/embedFunctions";
import { checkVerifyKey } from "../functions/checkVerifyKey";

const Verification = mongoose.model("Verification", VerificationSchema);

module.exports = {
  name: "verify",
  description: "Verification process for a user.",
  async execute(msg, args) {
    const serverMember = msg.member; // Server member

    // Database checks to be sure the user isn't already verified.

    console.log("Checking profiles");

    let existingProfile = await identifyDiscordProfile(serverMember.id);

    if (existingProfile) {
      console.log("User has a profile already.");
      failure(msg.channel, "Already Verified!", "You are already verified!");
      return;
    }

    let existingKey = await checkVerifyKey(serverMember.id);

    console.log("Checking verification codes");
    if (existingKey) {
      console.log("User already has a verification code.");
      notification(
        msg.channel,
        "Notification",
        "You have been DM'd with your verification key!"
      );
      verification(msg.author, existingKey.VerificationKey);
      return;
    }

    console.log("Checks passed, generating code.");
    // If the database checks turn up negative than this code block runs

    const newKey = makeKey(20);

    const newVerification = new Verification({
      VerificationKey: newKey,
      DiscordId: serverMember.id,
    });

    newVerification.save((err, verifications) => {
      if (err) {
        console.error(err);
      }
      notification(
        msg.channel,
        "Notification",
        "You have been DM'd with your verification key!"
      );
      verification(msg.author, verifications.VerificationKey);
    });
  },
};
