const { EmbedBuilder } = require('discord.js');
const fs = require('fs');


const settings = JSON.parse(fs.readFileSync('config.json'))

function embed() {
  var skins = JSON.parse(fs.readFileSync('data/skins.json'));
  
  const em = new EmbedBuilder({
    "color": 10509236,
    "timestamp": Date.now(),
    "url": "https://discord.com",
    "author": {
        "url": "https://discord.com",
        "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
        "name": `Skin Stock`
    },
    "description": "",
      
    "footer": {
        "text": "ticketing by @bznel",
    }
  })
  

  const fields = skins.map((skin) => ({
    name: skin.name,
    value: "",
    inline: true,
  }));
  

  skins.forEach((skin, index) => {
    fields[index].value += `\n> Price: ${skin.price}\n> In Stock: ${skin.amount}\n`;
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