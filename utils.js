const { REST, Routes } = require('discord.js');
const { ChannelType, SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const settings = JSON.parse(fs.readFileSync('config.json'));
const path = require('path');

async function createTextChannel(guild, username) {
  const channel = await guild.channels.create({
    name: username + '- Ticket',
    type: ChannelType.GuildText,
    parent: null,
  });

  return channel
}

async function registerCmds() {

  var requires = []; 

  fs.readdirSync(`${__dirname}/commands/`).forEach(file => {
    if(file !== '_export.js') {
      requires.push(require(path.join(`${__dirname}/commands/`, file)));
    }
  });

  var commands = []; 

  requires.forEach((commandFile) => {
    var commandBuilder = commandFile.commandBuilder();
    commands.push(commandBuilder);
  })

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

function getCommands() {
  var requires = {};

  fs.readdirSync(`${__dirname}/commands/`).forEach(file => {
      requires[file.replace('.js', '')] = require(path.join(`${__dirname}/commands/`, file));
  });


  return requires;

}

function getComponents() {
  var requires = {};

  fs.readdirSync(`${__dirname}/components/`).forEach(file => {
      requires[file.replace('.js', '')] = require(path.join(`${__dirname}/components/`, file));
  });

  return requires;
}

function getFunctions() {
  var requires = {};

  fs.readdirSync(`${__dirname}/functions/`).forEach(file => {
      requires[file.replace('.js', '')] = require(path.join(`${__dirname}/functions/`, file));
  });

  return requires;
}

function getItems() {
      const data = JSON.parse(fs.readFileSync("data/items.json"))
      return data;
}
module.exports = { registerCmds, createTextChannel, getDataForItem, checkAdmin, purge, getCommands, getComponents, getFunctions, getItems }
