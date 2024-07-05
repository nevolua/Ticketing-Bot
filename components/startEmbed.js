const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const fs = require('fs');
const config = JSON.parse(fs.readFileSync("config.json"));

function embed() {
  const em = new EmbedBuilder({
    color: 10509236,
    timestamp: Date.now(),
    url: "https://discord.com",
    author: {
      url: "https://discord.com",
      icon_url: "https://cdn.discordapp.com/embed/avatars/0.png",
      name: ``,
    },
    description: `**${config.ticketCreationEmbedText}**`,

    footer: {
      text: "ticketing by nevo",
    },
  });

  const button = new ButtonBuilder()
    .setCustomId("open")
    .setLabel(config.ticketCreationButtonText)
    .setStyle(ButtonStyle.Primary);

  const row = new ActionRowBuilder().addComponents(button);

  return {
    content: "",
    embeds: [em],
    components: [row],
  };
}
module.exports = { embed };
