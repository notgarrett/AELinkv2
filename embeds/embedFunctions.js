import Discord from "discord.js";
const url = "https://www.roblox.com/games/5037618249/data";
const url2 = "https://www.roblox.com/games/5037618249/data";

export const warn = (target, title, message) => {
  let sembed = new Discord.MessageEmbed()
    .setAuthor("Clan Authenticator")
    .setColor(4220927)
    .setTitle(title)
    .setDescription(message)
    .setTimestamp()
    .setFooter("Developed By AvidiusVulcan.");
  target.send(sembed);
};

export const notification = (target, title, message) => {
  let sembed = new Discord.MessageEmbed()
    .setAuthor("Clan Authenticator")
    .setColor(6708479)
    .setTitle(title)
    .setDescription(message)
    .setTimestamp()
    .setFooter("Developed By AvidiusVulcan.");
  target.send(sembed);
};

export const success = (target, title, message) => {
  let sembed = new Discord.MessageEmbed()
    .setAuthor("Clan Authenticator")
    .setColor(2555702)
    .setTitle(title)
    .setDescription(message)
    .setTimestamp()
    .setFooter("Developed By AvidiusVulcan.");
  target.send(sembed);
};

export const failure = (target, title, message) => {
  let sembed = new Discord.MessageEmbed()
    .setAuthor("Clan Authenticator")
    .setColor(16722998)
    .setTitle(title)
    .setDescription(message)
    .setTimestamp()
    .setFooter("Developed By AvidiusVulcan.");
  target.send(sembed);
};

export const verification = (target, key) => {
  let sembed = new Discord.MessageEmbed()
    .setAuthor("Clan Authenticator")
    .setColor(6708479)
    .setURL(url)
    .setTitle(url)
    .setDescription(`Type ${key} in chat in the game listed above to verify!`)
    .setTimestamp()
    .setFooter("Developed by AvidiusVulcan.");
  target.send(sembed);
};

export const update = (target, key) => {
  let sembed = new Discord.MessageEmbed()
    .setAuthor("Clan Authenticator")
    .setColor(6708479)
    .setURL(url2)
    .setTitle(url2)
    .setDescription(
      `Type ${key} in chat in the game listed above to update your profile!`
    )
    .setTimestamp()
    .setFooter("Developed by AvidiusVulcan.");
  target.send(sembed);
};

export const clanGenerated = (target, clan) => {
  let sembed = new Discord.MessageEmbed()
    .setColor(2555702)
    .setAuthor("Clan Authenticator")
    .setTitle("ClanAuth has been authenticated in your server!")
    .setDescription(
      `${clan} has been linked to this discord server, and the bot has been activated here!`
    )
    .setFooter("Developed by AvidiusVulcan.");
  target.send(sembed);
};
