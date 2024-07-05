const { REST, Permissions } = require("discord.js");
const { ChannelType, SlashCommandBuilder } = require("discord.js");
const fs = require("fs");
const settings = JSON.parse(fs.readFileSync("config.json"));
const path = require("path");

const rest = new REST({ version: "10" }).setToken(settings.token);

async function createTextChannel(guild, username) {
  const channel = await guild.channels.create({
    name: username + "- Ticket",
    type: ChannelType.GuildText,
    parent: null,
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
