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

      var skins = "";
      interaction.values.forEach((skin, index) => {
        skins = skins + skin 

        if (!index == interaction.values.length-1) {
          skins = skins + ", "
        }
      })
  
      return new ModalBuilder()
        .setCustomId(interaction.values[0])
        .setTitle('Buying: '+skins)
        .addComponents(
          new ActionRowBuilder().addComponents(fields.username),
          new ActionRowBuilder().addComponents(fields.timezone),
      )

}
module.exports = { modal }