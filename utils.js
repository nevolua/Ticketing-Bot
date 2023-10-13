const { REST, Routes } = require('discord.js');
const { ChannelType, SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

const settings = JSON.parse(fs.readFileSync('config.json'));

async function createTextChannel(guild, username) {
  const channel = await guild.channels.create({
    name: username + '- Ticket',
    type: ChannelType.GuildText,
    parent: null,
  });

  return channel
}


async function registerCmds() {
  const commands = [

    new SlashCommandBuilder()
        .setName('subtractstock')
        .setDescription('Removes from the stock of a skin')
        .addStringOption(option =>
            option.setName('item')
                .setDescription('Item to remove stock from')
                .setRequired(true)
        )
        .addStringOption(option =>
              option.setName('amount')
                  .setDescription('Amount to remove')
                  .setRequired(false)
        ),

    new SlashCommandBuilder()
        .setName('addstock')
        .setDescription("Adds to the stock of a skin")
        .addStringOption(option =>
            option.setName('item')
                .setDescription('Item to add stock to')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('amount')
                .setDescription('Amount to add')
                .setRequired(false)
        )
        
  ];
  
  const rest = new REST({ version: '10' }).setToken(settings.token);
  
  try {
    console.log('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands('1158193136447791234'), { body: commands });
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.log(error);
  }
}

function getDataForItem(itemToLookFor) {
    const data = JSON.parse(fs.readFileSync("data/skins.json"))

    const itemData = data.find(item => item.name === itemToLookFor);

    return itemData;
}

function addNewItems(name, amount = null, price = null) {
    var data = JSON.parse(fs.readFileSync('data/skins.json'));

    try{
        data.find(item => item.name === name).amount += amount;
    } catch (e) {
        data.push({'name': name, 'price': price, 'amount': amount});
    }


    fs.writeFileSync('data/skins.json', JSON.stringify(data));
}

function decrementItem(name, amount) {
    var data = JSON.parse(fs.readFileSync('data/skins.json'));

    try{
        if(data.find(item => item.name === name).amount > 0) {

          for (var i = 0; i < amount; i++) {
            data.find(item => item.name === name).amount--;
          }
          
        }
    } catch (e) {
        console.log(e);
    }

    fs.writeFileSync('data/skins.json', JSON.stringify(data));
}

function incrementItem(name, amount) {
    var data = JSON.parse(fs.readFileSync('data/skins.json'));

    try{
      for (var i = 0; i < amount; i++) {
        data.find(item => item.name === name).amount++;
      }
    } catch (e) {
        console.log(e);
    }

    fs.writeFileSync('data/skins.json', JSON.stringify(data));
}

function checkAdmin(interaction) {
  const settings = JSON.parse(fs.readFileSync('config.json'));

  if (settings.admins.includes(interaction.user.id)) {
    return true;
  } 

  return false;
  
}

async function purge(channel) {
  try{
    let fetched;
    do {
      fetched = await channel.messages.fetch({limit: 100});
      await channel.bulkDelete(fetched);
    }
    while(fetched.size >= 2);
  } catch (e) {
    //
  }  
  
}

module.exports = { registerCmds, createTextChannel, getDataForItem, addNewItems, decrementItem, checkAdmin, purge, incrementItem }
