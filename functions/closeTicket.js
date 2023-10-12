const utils = require('../utils');

async function exec(interaction) {
      if (utils.checkAdmin(interaction) == true) {
              await interaction.reply("Ticket will be closed in a few seconds..")
              setTimeout(async function() { await interaction.channel.delete() }, 3000)
      } else {
              await interaction.reply("You don't have permission to use that command.", ephemeral = true)
      }
}

module.exports = { exec }