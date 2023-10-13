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
        .setDescription('Removes from the stock of an item (default 1)')
        .addStringOption(option =>
            option.setName('item')
                .setDescription('Item to remove stock from')
                .setRequired(true)
        )
        .addStringOption(option =>
              option.setName('amount')
                  .setDescription('Amount to remove (default 1)')
                  .setRequired(false)
        ),

    new SlashCommandBuilder()
        .setName('addstock')
        .setDescription("Adds to the stock of an item (default 1)")
        .addStringOption(option =>
            option.setName('item')
                .setDescription('Item to add stock to')
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('amount')
                .setDescription('Amount to add (default 1)')
                .setRequired(false)
        ),
        
    new SlashCommandBuilder()
        .setName('newitem')
        .setDescription("Adds a new item to the stock")
        .addStringOption(option =>
          option.setName('name')
              .setDescription('Name of item')
              .setRequired(true)
        )
        .addStringOption(option =>
          option.setName('price')
              .setDescription('Price of one of the items')
              .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('amount')
                .setDescription('Amount of item in stock')
                .setRequired(true)
        ),
        
        
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
    const data = JSON.parse(fs.readFileSync("data/items.json"))

    const itemData = data.find(item => item.name === itemToLookFor);

    return itemData;
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

module.exports = { registerCmds, createTextChannel, getDataForItem, checkAdmin, purge }
