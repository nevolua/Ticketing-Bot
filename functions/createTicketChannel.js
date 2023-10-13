const {ComponentType} = require('discord.js');

const components = require('../components/_export');
const utils = require('../utils');

async function exec(interaction) {
      const guild = interaction.guild;
      const username = interaction.user.username;

      var itemsAndPrices = [];

      var items = interaction.customId;
      var items = items.split(", ");

      items.forEach((item) => {
            try {
                  var newDict = {}

                  newDict['name'] = item;
                  newDict['price'] = utils.getDataForItem(item).price
      
                  itemsAndPrices.push(newDict);
            } catch (e) {
                  //
            }
           
      })

      var robloxUsername = interaction.fields.getField("usernameInput").value;
      var tag = interaction.user.tag;

      const ticketChannel = await utils.createTextChannel(guild, username);

      const embedData = components.ticketEmbed.embed(itemsAndPrices, robloxUsername, tag, ticketChannel);

      await ticketChannel.send(embedData);
}

module.exports = { exec }