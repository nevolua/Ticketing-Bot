const {EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, ComponentType } = require('discord.js');
const fs = require('fs');
const path = require('path');

const settings = JSON.parse(fs.readFileSync('config.json'));

const utils = require('../utils');
const components = require('../components/export');

async function exec(client){

      const ticketChannel = await client.channels.cache.get(settings.ticketMessageChannel);
  
      await utils.purge(ticketChannel);
  
      const embedData = components.startEmbed.embed();
      
      await ticketChannel.send(embedData);
}

module.exports = { exec };