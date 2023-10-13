const utils = require('../utils');
const fs = require('fs');

async function exec(interaction) {
      if(!(utils.checkAdmin(interaction))) return await interaction.reply("You don't have permission to use that command.", ephemeral = true);
      
      var name = interaction.options.get('item').value

      var amount;
      interaction.options.get('amount') ? amount = interaction.options.get('amount').value : amount = 1;

      try {
        var data = JSON.parse(fs.readFileSync('data/items.json'));

        if(data.find(item => item.name === name).amount > 0) {

          try {
            for (var i = 0; i < amount; i++) {
              data.find(item => item.name === name).amount--;
            }
          } catch (e) {
            //
          }
          
              
        }

        fs.writeFileSync('data/items.json', JSON.stringify(data));

        await interaction.reply(`Successfully decremented amount of ${name} to ${utils.getDataForItem(name).amount}`, ephemeral=true);

      } catch (e) {
         await interaction.reply("Item not found.", ephemeral = true);
      }

}


module.exports = { exec };