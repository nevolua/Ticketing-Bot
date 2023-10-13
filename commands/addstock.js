const utils = require('../utils');

async function exec(interaction) {
  if(!(utils.checkAdmin(interaction))) return await interaction.reply("You don't have permission to use that command.", ephemeral = true);
      
      var item = interaction.options.get('item').value
      var amount = interaction.options.get('amount').value || 1

      try {
        utils.incrementItem(item, amount);
      } catch (e) {
        await interaction.reply("Item not found.", ephemeral = true);
      }
      
      
      await interaction.reply(`Successfully incremented amount of ${item} to ${utils.getDataForItem(item).amount}`, ephemeral=true);
}

module.exports = { exec };