const utils = require('../utils');
const fs = require('fs');

async function exec(interaction) {
  if(!(utils.checkAdmin(interaction))) return await interaction.reply("You don't have permission to use that command.", ephemeral = true);
      
  var name = interaction.options.get('name').value
  var amount = interaction.options.get('amount').value 
  var price = interaction.options.get('price').value 

  var items = JSON.parse(fs.readFileSync('./data/items.json'));

  try {
    if (!(items.find(item => item.name === name))) { // if item doesnt already exist
        newitem = {"name":name,"price":price,"amount":amount}

        items.push(newitem);

        fs.writeFileSync('./data/items.json', JSON.stringify(items));

        return await interaction.reply("Successfully added item.", ephemeral = true);
    }
  } catch (e) {
    return await interaction.reply("An error occured.", ephemeral = true);
  }
  

}

module.exports = { exec };