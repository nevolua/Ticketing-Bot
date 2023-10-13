const { EmbedBuilder,ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

function embed(itemsAndPrices, robloxUsername, tag, channel) {


  const em = new EmbedBuilder({
    "color": 10509236,
    "timestamp": Date.now(),
    "title": `**Buying Items:**`,
    "thumbnail": {
        "url": "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    "footer": {
        "text": "ticketing by @bznel",
    }
  })

  const fields = itemsAndPrices.map(item => ({ 

    name: item.name, 
    value: "",
    inline: true

  }));


  itemsAndPrices.forEach((item, index) => {
    fields[index].value += `\n> Price: ${item.price}`;
  });
  
  fields.forEach((field) => {
    em.addFields(field);
  });

  em.addFields({
    "name": "Buyers Roblox Username",
    "value": `> ${robloxUsername}`,
    "inline": false
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