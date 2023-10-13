const utils = require("../utils");
const fs = require("fs");

const { SlashCommandBuilder } = require("discord.js");

async function exec(interaction) {
  if (!utils.checkAdmin(interaction))
    return await interaction.reply(
      "You don't have permission to use that command.",
      (ephemeral = true),
    );

  var name = interaction.options.get("item").value;

  var items = JSON.parse(fs.readFileSync("./data/items.json"));

  try {
    const indexToRemove = items.findIndex((item) => item.name === name);

    if (indexToRemove !== -1) {
      items.splice(indexToRemove, 1);

      fs.writeFileSync("./data/items.json", JSON.stringify(items));

      return await interaction.reply("Successfully removed item.", {
        ephemeral: true,
      });
    }
  } catch (e) {
    return await interaction.reply("An error occured.", (ephemeral = true));
  }
}

function commandBuilder() {
  var cmdBuilder = new SlashCommandBuilder()
    .setName("removeitem")
    .setDescription("Completely removes an item from the stock");

  var items = utils.getItems();

  const choices = items.map((item) => ({
    name: item.name,
    value: item.name,
  }));

  cmdBuilder.addStringOption((option) =>
    option
      .setName("item")
      .setDescription("Item to remove")
      .setRequired(true)
      .addChoices(...choices),
  );

  return cmdBuilder;
}

module.exports = { exec, commandBuilder };
