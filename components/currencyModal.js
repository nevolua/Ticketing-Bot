const {
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
  ActionRowBuilder,
} = require("discord.js");

function modal() {
  const fields = {
    amount: new TextInputBuilder()
      .setCustomId("amountInput")
      .setLabel("How much do you want to buy?")
      .setStyle(TextInputStyle.Short),

    method: new TextInputBuilder()
      .setCustomId("methodInput")
      .setLabel("How do you want to pay? (robux, cashapp, etc)")
      .setStyle(TextInputStyle.Short),
  };

  return new ModalBuilder()
    .setCustomId("buyingCurrency")
    .setTitle("Buying Currency")
    .addComponents(
      new ActionRowBuilder().addComponents(fields.amount),
      new ActionRowBuilder().addComponents(fields.method),
    );
}
module.exports = { modal };
