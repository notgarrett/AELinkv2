// Imports /////////////////////////////////////
////////////////////////////////////////////////

import mongoose from "mongoose";
import Discord from "discord.js";
import fs from "fs";
import tokens from "./tokens.json";
import bodyParser from "body-parser";
import express from "express";
import routes from "./routes/routes.js";
import { addRoles } from "./functions/addRoles";
import { removeRoles } from "./functions/removeRoles";
import { updateNickname } from "./functions/updateNickname";
import { deleteUser } from "./functions/deleteUser";
import { failure } from "./embeds/embedFunctions";
import { onStart } from "./functions/onStart";

// Discord Variables /////////////////////////////////////
////////////////////////////////////////////////

export const bot = new Discord.Client();
bot.commands = new Discord.Collection();

// Nessasary Variables /////////////////////////////////////
////////////////////////////////////////////////

const token = tokens.token;
const prefix = tokens.prefix;
const url = tokens.url || "mongodb://localhost:27017/sentinelv2";

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  console.log(file);
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

// Mongoose Connection ///////////////////////////////////
////////////////////////////////////////

mongoose.Promise = global.Promise;
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Express setup /////////////////////////////////////
/////////////////////////////////////////////////

const app = express();
const PORT = 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.get("/", (req, res) => {
  res.send(`Node and express server running on port: ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Your server is running on port: ${PORT}`);
});

// ClanAuth /////////////////////////////////////
////////////////////////////////////////

bot.on("ready", () => {
  //return;
  console.log("bot is operational");
  bot.user.setActivity(`Upgrades people, upgrades!`);

  let guild = bot.guilds.cache.get(tokens.serverid);
  let members = guild.members.cache;
  onStart(members);
});

bot.on("guildMemberAdd", (member) => {});

bot.on("guildMemberUpdate", (oldMember, newMember) => {
  console.log("test");
  //return;
  // If the role(s) are present on the old member object but no longer on the new one (i.e role(s) were removed)
  if (newMember === undefined) {
    deleteUser(oldMember);
    return;
  }

  let removedRoles = oldMember.roles.cache.filter(
    (role) => !newMember.roles.cache.has(role.id)
  );
  if (removedRoles.size > 0) {
    removedRoles = removedRoles.map((r) => r.id);
    removeRoles(removedRoles, newMember);
    updateNickname(newMember);
    return;
  }
  // If the role(s) are present on the new member object but are not on the old one (i.e role(s) were added)
  let addedRoles = newMember.roles.cache.filter(
    (role) => !oldMember.roles.cache.has(role.id)
  );
  if (addedRoles.size > 0) {
    addedRoles = addedRoles.map((r) => r.id);
    addRoles(addedRoles, newMember);
    updateNickname(newMember);
    return;
  }
});

bot.on("message", (msg) => {
  //if (msg.author.bot) return;
  // return;

  let args = msg.content.substring(prefix.length).split(" ");

  if (msg.content.charAt(0) === prefix) {
    //Bot commands are listed in here //////////////////
    ////////////////////////////////////////////

    switch (args[0]) {
      case "verify":
        bot.commands.get("verify").execute(msg);
        break;
      case "hotfix":
        bot.commands.get("hotfix").execute(msg);
        break;
      case "give":
        bot.commands.get("give").execute(msg, args);
        break;
      case "ban":
        if (msg.member.hasPermission("ADMINISTRATOR")) {
          bot.commands.get("ban").execute(msg, args);
        } else {
          failure(
            msg.channel,
            "Failed!",
            "You do not have premission to do that."
          );
        }
        break;
      case "unban":
        if (msg.member.hasPermission("ADMINISTRATOR")) {
          bot.commands.get("unban").execute(msg, args);
        } else {
          failure(
            msg.channel,
            "Failed!",
            "You do not have premission to do that."
          );
        }
        break;
      case "add":
        if (msg.member.hasPermission("ADMINISTRATOR")) {
          bot.commands.get("add").execute(msg, args);
        } else {
          failure(
            msg.channel,
            "Failed!",
            "You do not have premission to do that."
          );
        }
        break;
      case "wipe":
        if (msg.member.hasPermission("ADMINISTRATOR")) {
          bot.commands.get("wipe").execute(msg, args);
        } else {
          failure(
            msg.channel,
            "Failed!",
            "You do not have premission to do that."
          );
        }
        break;
      case "update":
        bot.commands.get("update").execute(msg, args);
        break;
      case "banlist":
        bot.commands.get("banlist").execute(msg, args);
        break;
      case "manual":
        if (msg.member.hasPermission("ADMINISTRATOR")) {
          bot.commands.get("manual").execute(msg, args);
        } else {
          failure(
            msg.channel,
            "Failed!",
            "You do not have premission to do that."
          );
        }
        break;
    }
  }
});

bot.login(token);
