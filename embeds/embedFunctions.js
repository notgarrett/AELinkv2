import Discord from "discord.js";
const url =
  "https://www.roblox.com/games/5079873220/AE-The-Sentinel-Verification";
const url2 = "https://www.roblox.com/games/5037618249/data";
const footer = "Developed by ArtimusPhilosophus";
const author = "The Sentinel";

export const warn = (target, title, message) => {
  let sembed = new Discord.MessageEmbed()
    .setAuthor(author)
    .setColor(4220927)
    .setTitle(title)
    .setDescription(message)
    .setTimestamp()
    .setFooter(footer);
  target.send(sembed);
};

export const notification = (target, title, message) => {
  let sembed = new Discord.MessageEmbed()
    .setAuthor(author)
    .setColor(6708479)
    .setTitle(title)
    .setDescription(message)
    .setTimestamp()
    .setFooter(footer);
  target.send(sembed);
};

export const success = (target, title, message) => {
  let sembed = new Discord.MessageEmbed()
    .setAuthor(author)
    .setColor(2555702)
    .setTitle(title)
    .setDescription(message)
    .setTimestamp()
    .setFooter(footer);
  target.send(sembed);
};

export const failure = (target, title, message) => {
  let sembed = new Discord.MessageEmbed()
    .setAuthor(author)
    .setColor(16722998)
    .setTitle(title)
    .setDescription(message)
    .setTimestamp()
    .setFooter(footer);
  target.send(sembed);
};

export const verification = (target, key) => {
  let sembed = new Discord.MessageEmbed()
    .setAuthor(author)
    .setColor(6708479)
    .setURL(url)
    .setTitle(url)
    .setDescription(`Type ${key} in chat in the game listed above to verify!`)
    .setTimestamp()
    .setFooter(footer);
  target.send(sembed);
};

export const update = (target, key) => {
  let sembed = new Discord.MessageEmbed()
    .setAuthor(author)
    .setColor(6708479)
    .setURL(url)
    .setTitle(url)
    .setDescription(
      `Type ${key} in chat in the game listed above to update your profile!`
    )
    .setTimestamp()
    .setFooter(footer);
  target.send(sembed);
};

export const clanGenerated = (target, clan) => {
  let sembed = new Discord.MessageEmbed()
    .setColor(2555702)
    .setAuthor(author)
    .setTitle("ClanAuth has been authenticated in your server!")
    .setDescription(
      `${clan} has been linked to this discord server, and the bot has been activated here!`
    )
    .setFooter(footer);
  target.send(sembed);
};
