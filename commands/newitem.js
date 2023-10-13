const utils = require("../utils");
const fs = require("fs");

const { SlashCommandBuilder } = require("discord.js");

async function exec(interaction) {
  if (!utils.checkAdmin(interaction))
    return await interaction.reply(
      "You don't have permission to use that command.",
      (ephemeral = true),
    );

  var name = interaction.options.get("name").value;
  var amount = interaction.options.get("amount").value;
  var price = interaction.options.get("price").value;

  var items = JSON.parse(fs.readFileSync("./data/items.json"));

  try {
    if (!items.find((item) => item.name === name)) {
      // if item doesnt already exist
      newitem = { name: name, price: price, amount: amount };

      items.push(newitem);

      fs.writeFileSync("./data/items.json", JSON.stringify(items));

      return await interaction.reply(
        "Successfully added item.",
        (ephemeral = true),
      );
    }
  } catch (e) {
    return await interaction.reply("An error occured.", (ephemeral = true));
  }
}

function commandBuilder() {
  return new SlashCommandBuilder()
    .setName("newitem")
    .setDescription("Adds a new item to the stock")
    .addStringOption((option) =>
      option.setName("name").setDescription("Name of item").setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("price")
        .setDescription("Price of one of the items")
        .setRequired(true),
    )
    .addStringOption((option) =>
      option
        .setName("amount")
        .setDescription("Amount of item in stock")
        .setRequired(true),
    );
}

module.exports = { exec, commandBuilder };
