import mongoose from "mongoose";
import { ProfileSchema } from "./models/ProfileModel";
import { poop } from "./models/poopscheme";
import tokens from "./tokens.json";
import Discord from "discord.js";
const token = tokens.token;
export const bot = new Discord.Client();

const url = tokens.url;

mongoose.Promise = global.Promise;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("Users", ProfileSchema);
const IDs = mongoose.model("IDs", poop);

function wow() {
  IDs.find({}, (err, docs) => {
    console.log("hmm");
    if (err) console.log(err);
    if (docs) {
      console.log(docs);
      docs.forEach((object) => {
        let robloxId = object.userID;
        let discordId = 0;
        if (object.discordID) discordId = object.discordID;
        let roles = [];
        let username;
        if (object.userName) username = object.userName;
        if (object.discordRoles) {
          object.discordRoles.forEach((element) => {
            let x = element;
            roles.push(x);
          });
        }
        let banned = false;
        if (object.states && object.states.blacklisted) banned = true;

        User.updateOne(
          { RobloxId: robloxId },
          {
            DiscordId: discordId,
            Roles: roles,
            Banned: banned,
            RobloxUserName: username,
          },
          (err, docs) => {
            if (err) throw err;
            if (docs) console.log(docs);
          }
        );
      });
    }
  });
}

function clense() {
  User.find({}, (err, doc) => {
    if (err) throw err;
    console.log("test");
    let guild = bot.guilds.resolve("518686827096440832");
    console.log(guild);
    let x = 0;
    doc.forEach((profile) => {
      if (!profile.DiscordId) {
        console.log("nope");
        return;
      }

      guild.members
        .fetch(profile.discordID)
        .then((member) => {
          x++;
          console.log(x);
          if (member) console.log("1");
          else console.log("no");
        })
        .catch(console.error);
    });
  });
}

bot.on("ready", () => {
  console.log("yeah");
  clense();
});

bot.login(token);
