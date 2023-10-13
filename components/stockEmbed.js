const { EmbedBuilder } = require('discord.js');
const fs = require('fs');


const settings = JSON.parse(fs.readFileSync('config.json'))

function embed() {
  var items = JSON.parse(fs.readFileSync('data/items.json'));
  
  const em = new EmbedBuilder({
    "color": 10509236,
    "timestamp": Date.now(),
    "url": "https://discord.com",
    "author": {
        "url": "https://discord.com",
        "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
        "name": `Item Stock`
    },
    "description": "",
      
    "footer": {
        "text": "ticketing by @bznel",
    }
  })
  

  const fields = items.map((item) => ({
    name: item.name,
    value: "",
    inline: true,
  }));
  

  items.forEach((item, index) => {
    fields[index].value += `\n> Price: ${item.price}\n> In Stock: ${item.amount}\n`;
  });
  
  // Add the fields to the embed
  fields.forEach((field) => {
    em.addFields(field);
  });

  return { 
        embeds: [em] 
  };
}
module.exports = { embed }