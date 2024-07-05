const {
  TextInputBuilder,
  TextInputStyle,
  ModalBuilder,
  ActionRowBuilder,
} = require("discord.js");


function modal() {
  const config = JSON.parse(require('fs').readFileSync("config.json"))

  const fields = {};

  function addField(name, description) {
    fields[name] = new TextInputBuilder()
      .setCustomId(name)
      .setLabel(description)
      .setStyle(TextInputStyle.Short);
  }


  for (const fieldName in config.fields) {
    if (config.fields.hasOwnProperty(fieldName)) {
      const description = config.fields[fieldName];
      addField(fieldName, description);
    }
  }

  const builder = new ModalBuilder()
    .setCustomId("buying")
    .setTitle(config.ticketCreationPopupTitle);

  for (const field in fields) {
    builder.addComponents(new ActionRowBuilder().addComponents(fields[field]));
  }

  return builder;
}
module.exports = { modal };
