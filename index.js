// Imports /////////////////////////////////////
////////////////////////////////////////////////

import mongoose from "mongoose";
import Discord from "discord.js";
import fs from "fs";
import tokens from "./tokens.json";
import bodyParser from "body-parser";
import express from "express";
import routes from "./routes/routes.js";

// Discord Variables /////////////////////////////////////
////////////////////////////////////////////////

const bot = new Discord.Client();
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
  console.log("bot is operational");
  bot.user.setActivity(`Upgrades people, upgrades!`);
});

bot.on("guildMemberAdd", (member) => {});

bot.on("guildMemberUpdate", (oldMember, newMember) => {});

bot.on("message", (msg) => {
  if (msg.author.bot) return;

  let args = msg.content.substring(prefix.length).split(" ");

  if (msg.content.charAt(0) === prefix) {
    //Bot commands are listed in here //////////////////
    ////////////////////////////////////////////

    switch (args[0]) {
      case "verify":
        bot.commands.get("verify").execute(msg);
        break;
      case "ban":
        bot.commands.get("ban").execute(msg, args);
        break;
    }
  }
});

bot.login(token);
