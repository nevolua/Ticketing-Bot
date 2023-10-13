const fs = require("fs");

const utils = require("../utils");
const components = utils.getComponents();

async function exec(interaction) {
  const modal = components.currencyModal.modal();

  await interaction.showModal(modal);
}

module.exports = { exec };
