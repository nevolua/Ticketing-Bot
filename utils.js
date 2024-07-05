const { REST, Permissions } = require("discord.js");
const { ChannelType, SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const settings = JSON.parse(fs.readFileSync("config.json"));
const path = require("path");

const rest = new REST({ version: "10" }).setToken(settings.token);

async function createTextChannel(guild, username, allowed_users) {
  const channel = await guild.channels.create({
    name: username + "- Ticket",
    type: 'GUILD_TEXT',
    parent: null,
  });

  await Promise.all(allowed_users.map(async (userId) => {
    const user = await guild.members.fetch(userId);
    if (user) {
      await channel.permissionOverwrites.create(user, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        READ_MESSAGE_HISTORY: true,
      });
    }
  }));

  await channel.permissionOverwrites.create(guild.roles.everyone, {
    VIEW_CHANNEL: false,
  });

  return channel;
}


function checkAdmin(interaction) {
  const settings = JSON.parse(fs.readFileSync("config.json"));

  if (settings.admins.includes(interaction.user.id)) {
    return true;
  }

  return false;
}

async function purge(channel) {
  try {
    let fetched;
    do {
      fetched = await channel.messages.fetch({ limit: 100 });
      await channel.bulkDelete(fetched);
    } while (fetched.size >= 2);
  } catch (e) {
    //
  }
}


function getComponents() {
  var requires = {};

  fs.readdirSync(`${__dirname}/components/`).forEach((file) => {
    requires[file.replace(".js", "")] = require(
      path.join(`${__dirname}/components/`, file),
    );
  });

  return requires;
}


module.exports = {
  createTextChannel,
  checkAdmin,
  purge,
  getComponents
};
