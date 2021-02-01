import mongoose from "mongoose";
import { VerificationSchema } from "../models/VerificationModel";

const Verification = mongoose.model("Verification", VerificationSchema);

//Checks if user has a verification code

export const checkVerifyKey = async (discordMemberId) => {
  return new Promise((resolve, reject) => {
    Verification.findOne({ DiscordId: discordMemberId }, (err, doc) => {
      if (err) throw err;
      if (doc) {
        console.log(doc);
        resolve(doc);
      }
      resolve(false);
    });
  });
};
