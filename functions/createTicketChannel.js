const {ComponentType} = require('discord.js');

const components = require('../components/export');
const utils = require('../utils');

async function exec(interaction) {
      const guild = interaction.guild;
      const username = interaction.user.username;

      var item = interaction.customId;
      var price = utils.getDataForItem(item).price;
      var robloxUsername = interaction.fields.getField("usernameInput").value;
      var tag = interaction.user.tag;

      const ticketChannel = await utils.createTextChannel(guild, username);
      const embedData = components.ticketEmbed.embed(item, price, robloxUsername, tag, ticketChannel);

      await ticketChannel.send(embedData);
}

module.exports = { exec }