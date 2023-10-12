const { StringSelectMenuBuilder, ActionRowBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

function dropdown(interaction, skins) {
  const selectMenu = new StringSelectMenuBuilder()
    .setCustomId(interaction.id)
    .setPlaceholder('Select Skin..')
    .setMinValues(0)
    .setMaxValues(skins.length)
    .addOptions(
      skins.map((skin) => 
        new StringSelectMenuOptionBuilder()
          .setLabel(skin.name)
          .setDescription(skin.price)
          .setValue(skin.name)
      )
    )

  const row = new ActionRowBuilder().addComponents(selectMenu);

  return {
      components: [row],
      ephemeral: true
  }
  
}
module.exports = { dropdown }