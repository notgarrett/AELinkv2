import mongoose from "mongoose";

import { ProfileSchema } from "../models/ProfileModel";

const User = mongoose.model("Users", ProfileSchema);

export const removeRoles = (role, member) => {
  User.updateOne(
    { DiscordId: member.user.id },
    { $pullAll: { Roles: role } },
    (err, doc) => {
      if (err) console.error(err);
      console.log(doc);
    }
  );
  console.log("Roles removed!");
};
