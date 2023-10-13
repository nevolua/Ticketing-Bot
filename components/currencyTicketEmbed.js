const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

function embed(amount, method, channel) {
  const em = new EmbedBuilder({
    color: 10509236,
    timestamp: Date.now(),
    title: `**Buying Currency:**`,
    thumbnail: {
      url: "https://cdn.discordapp.com/embed/avatars/0.png",
    },
    footer: {
      text: "ticketing by @bznel",
    },
  });

  em.addFields(
    {
      name: "Amount",
      value: `> ${amount}`,
      inline: false,
    },

    {
      name: "Proposed Method",
      value: `> ${method}`,
      inline: false,
    },
  );

  const button = new ButtonBuilder()
    .setCustomId("close-" + channel.id)
    .setLabel("Close Ticket")
    .setStyle(ButtonStyle.Secondary);

  const row = new ActionRowBuilder().addComponents(button);

  return {
    embeds: [em],
    components: [row],
  };
}
module.exports = { embed };
