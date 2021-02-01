import fetch from "node-fetch";

export const getGroupRank = async (robloxId) => {
  return new Promise((resolve, reject) => {
    fetch(`https://groups.roblox.com/v2/users/${robloxId}/groups/roles`)
      .then((res) => res.json())
      .then((json) => {
        if (json.data === undefined) resolve(false);
        json.data.forEach((item) => {
          if (item.group.id === 5002385) resolve(item.role.rank);
        });
      })
      .then(() => resolve(false));
  });
};

export const getSecondaryGroupRank = async (robloxId) => {
  return new Promise((resolve, reject) => {
    fetch(`https://groups.roblox.com/v2/users/${robloxId}/groups/roles`)
      .then((res) => res.json())
      .then((json) => {
        if (json.data === undefined) resolve(false);
        json.data.forEach((item) => {
          if (item.group.id === 5002373) resolve(item.role.rank);
        });
      })
      .then(() => resolve(false));
  });
};
