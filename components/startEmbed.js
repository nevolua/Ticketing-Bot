const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

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
    description: "**Open tickets here**",

    footer: {
      text: "ticketing by @bznel",
    },
  });

  const button = new ButtonBuilder()
    .setCustomId("buyItem")
    .setLabel("Buy Item(s)")
    .setStyle(ButtonStyle.Secondary);

  const currencyButton = new ButtonBuilder()
    .setCustomId("buyCurrency")
    .setLabel("Buy Currency")
    .setStyle(ButtonStyle.Primary);

  const row = new ActionRowBuilder().addComponents(button, currencyButton);

  return {
    content: "",
    embeds: [em],
    components: [row],
  };
}
module.exports = { embed };
