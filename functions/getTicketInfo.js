const { ActionRowBuilder, ComponentType, ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');
const fs = require('fs');

const utils = require('../utils');
const components = utils.getComponents();

async function exec(interaction) {
    const text = fs.readFileSync('data/items.json');
    items = JSON.parse(text);

    items = items.filter((item) => item.amount > 0);

    const dropDown = components.itemDropdown.dropdown(interaction, items);

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