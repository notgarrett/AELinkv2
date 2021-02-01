import mongoose from "mongoose";
import { ProfileSchema } from "../models/ProfileModel";

const User = mongoose.model("Users", ProfileSchema);

export const getUsers = async (query) => {
  return new Promise((resolve, reject) => {
    User.find(query, (err, doc) => {
      if (err) throw err;
      if (doc) resolve(doc);
      else resolve(false);
    });
  });
};
