const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");

const fs = require('fs');

function embed(fieldsArray, channel) {
  const config = JSON.parse(fs.readFileSync("config.json"));

  const em = new EmbedBuilder()
    .setColor(10509236)
    .setTimestamp(Date.now())
    .setTitle(`**${config.createdTicketEmbedTitle}**`)
    .setThumbnail("https://cdn.discordapp.com/embed/avatars/0.png")
    .setFooter({ text: "ticketing by nevo" });

  fieldsArray.forEach(([customId, value]) => {
    em.addFields({ name: customId, value: `> ${value}`, inline: false });
  });

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
