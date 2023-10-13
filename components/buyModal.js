const { TextInputBuilder, TextInputStyle, ModalBuilder, ActionRowBuilder } = require('discord.js');

function modal(interaction) {
      const fields = {
        'username': new TextInputBuilder()
          .setCustomId('usernameInput')
          .setLabel("What is your Roblox username?")
          .setStyle(TextInputStyle.Short),
      
        'timezone': new TextInputBuilder()
          .setCustomId('timezoneInput')
          .setLabel("What is your timezone?")
          .setStyle(TextInputStyle.Short)
      }

      var items = "";
      interaction.values.forEach((item, index) => {
        items = items + item 

        if (!index == interaction.values.length-1) {
          items = items + ", "
        }
      })
  
      return new ModalBuilder()
        .setCustomId(interaction.values[0])
        .setTitle('Buying: '+items)
        .addComponents(
          new ActionRowBuilder().addComponents(fields.username),
          new ActionRowBuilder().addComponents(fields.timezone),
      )

}
module.exports = { modal }