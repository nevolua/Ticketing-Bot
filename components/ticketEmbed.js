const { EmbedBuilder,ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

function embed(item, price, robloxUsername, tag, channel) {
  const em = new EmbedBuilder({
    "color": 10509236,
    "timestamp": Date.now(),
    "url": "https://discord.com",
    "author": {
        "url": "https://discord.com",
        "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
        "name": `Ticket for ${tag}`
    },
    "thumbnail": {
        "url": "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    "footer": {
        "text": "ticketing by @bznel",
    },
    "fields": [
        {
            "name": " Item to Purchase",
            "value": `> ${item}`,
            "inline": false
        },
        {
            "name": "Price",
            "value": `> ${price}`,
            "inline": false
        },
        {
            "name": "Buyers Roblox Username",
            "value": `> ${robloxUsername}`,
            "inline": false
        }
    ]
  })

  const button = new ButtonBuilder()
        .setCustomId('close-'+channel.id)
        .setLabel('Close Ticket')
        .setStyle(ButtonStyle.Secondary)
    
    
  const row = new ActionRowBuilder()
        .addComponents(button)


  return { 
        embeds: [em] ,
        components: [row],
  };
}
module.exports = { embed }