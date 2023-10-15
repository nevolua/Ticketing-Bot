const { StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

function dropdown(interaction, items) {


  if (items.length == 0) { 
     items.push({'name': "No skins are currently available.", "amount": "NULL", "price": "NULL"});
   }
  

  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId(interaction.id)
    .setPlaceholder('Select item(s) (3 max)')
    .setMinValues(1)
    .addOptions(
      items.map((item) => 
        new StringSelectMenuOptionBuilder()
          .setLabel(`${items.length !== 0 ? (item.name + " (" + item.amount+ " available)") : ("No skins are currently available")}`)
          .setDescription(`Price: ${items.length !== 0 ? (item.price) : ' NULL'}`)
          .setValue(`${items.length !== 0 ? item.name : null}`)
      )
    )

  const row = new ActionRowBuilder().addComponents(selectMenu);

  return {
      components: [row],
      ephemeral: true
  }
  
}
module.exports = { dropdown }