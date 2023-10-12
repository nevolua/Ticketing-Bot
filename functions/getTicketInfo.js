const { ActionRowBuilder, ComponentType, ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const fs = require('fs');

const components = require('../components/export');

async function exec(interaction) {
    const text = fs.readFileSync('data/skins.json');
    skins = JSON.parse(text);

    skins = skins.filter((skin) => skin.amount > 0);

    const dropDown = components.skinDropdown.dropdown(interaction, skins);

    await interaction.reply(dropDown)
    const reply = await interaction.fetchReply();
    
    const collector = await reply.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
      filter: (i) => i.user.id === interaction.user.id && i.customId === interaction.id,
      time: 60_000,
    })

    collector.on('collect', async (interaction) => {

      const modal = components.buyModal.modal(interaction);
        
      await interaction.showModal(modal);

    })
}

module.exports = { exec };