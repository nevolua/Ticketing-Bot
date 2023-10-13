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

  var amount;
  interaction.options.get("amount")
    ? (amount = interaction.options.get("amount").value)
    : (amount = 1);

  try {
    var data = JSON.parse(fs.readFileSync("data/items.json"));

    try {
      for (var i = 0; i < amount; i++) {
        data.find((item) => item.name === name).amount++;
      }
    } catch (e) {
      //
    }

    fs.writeFileSync("data/items.json", JSON.stringify(data));

    await interaction.reply(
      `Successfully incremented amount of ${name} to ${
        utils.getDataForItem(name).amount
      }`,
      (ephemeral = true),
    );
  } catch (e) {
    await interaction.reply("Item not found.", (ephemeral = true));
  }
}

function commandBuilder() {
  var cmdBuilder = new SlashCommandBuilder()
    .setName("addstock")
    .setDescription("Adds to the stock of an item (default 1)");

  var items = utils.getItems();

  const choices = items.map(item => ({
    name: item.name,
    value: item.name
  }));

  cmdBuilder.addStringOption((option) =>
    option
      .setName("item")
      .setDescription("Item to add stock to")
      .setRequired(true)
      .addChoices(...choices),
  );

  cmdBuilder.addStringOption((option) =>
    option
      .setName("amount")
      .setDescription("Amount to add")
      .setRequired(true),
  );

  return cmdBuilder;
}
module.exports = { exec, commandBuilder };
