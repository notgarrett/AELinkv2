import { getUsers } from "../functions/getUsers";
import { getRobloxName } from "../functions/getRobloxName";

module.exports = {
  name: "banlist",
  description: "adds user to the db",
  async execute(msg, args) {
    const users = await getUsers({ Banned: true });
    console.log(users);
    let message = [];
    for (let index = 0; index < users.length; index++) {
      const name = await getRobloxName(users[index].RobloxId);
      message.push(name);
    }
    msg.channel.send(message);
  },
};
