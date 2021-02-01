import fetch from "node-fetch";
//Get ROBLOX ID from username.

export const getRobloxName = async (robloxId) => {
  return new Promise((resolve, reject) => {
    fetch(`https://api.roblox.com/users/${robloxId}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.Username) resolve(json.Username);
        resolve(false);
      });
  });
};
