const { StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

function dropdown(interaction, items) {
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId(interaction.id)
    .setPlaceholder('Select item(s)..')
    .setMinValues(0)
    .setMaxValues(items.length)
    .addOptions(
      items.map((item) => 
        new StringSelectMenuOptionBuilder()
          .setLabel(item.name)
          .setDescription(item.price)
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