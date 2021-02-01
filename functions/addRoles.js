import mongoose from "mongoose";
import { ProfileSchema } from "../models/ProfileModel";

const User = mongoose.model("Users", ProfileSchema);

export const addRoles = (role, member) => {
  console.log(typeof role);
  console.log(Number(member.user.id));
  User.updateOne(
    { DiscordId: member.user.id },
    { $push: { Roles: role } },
    (err, doc) => {
      if (err) console.error(err);
      if (doc) console.log(doc);
    }
  );
  console.log("Roles added!");
};
