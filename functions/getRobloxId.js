import fetch from "node-fetch";
//Get ROBLOX ID from username.

export const getRobloxId = async (robloxId) => {
  return new Promise((resolve, reject) => {
    fetch(`https://api.roblox.com/users/get-by-username?username=${robloxId}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.Id) resolve(json.Id);
        resolve(false);
      });
  });
};
