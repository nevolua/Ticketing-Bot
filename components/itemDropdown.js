const { StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

function dropdown(interaction, items) {
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId(interaction.id)
    .setPlaceholder('Select item(s) (3 max)')
    .setMinValues(0)
    .setMaxValues(3)
    .addOptions(
      items.map((item) => 
        new StringSelectMenuOptionBuilder()
          .setLabel(`${item.name} (${item.amount} available)`)
          .setDescription(`Price: ${item.price} each`)
          .setValue(item.name)
      )
    )

  const row = new ActionRowBuilder().addComponents(selectMenu);

  return {
      components: [row],
      ephemeral: true
  }
  
}
module.exports = { dropdown }