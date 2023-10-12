const { Client, GatewayIntentBits, Events } = require('discord.js');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const utils = require("./utils");
const settings = JSON.parse(fs.readFileSync('config.json'));
const functions = require("./functions/export.js");
const commands = require("./commands/export.js");

utils.registerCmds();

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  functions.sendStartMessage.exec(client);
  functions.sendSkinStock.exec(client);

  fs.watch('data/skins.json',  (event, filename) => {
    if (event === 'change') {
      console.log(`File ${filename} has been modified.`);


      functions.sendSkinStock.exec(client);
      
    }
  });
  
});

client.on(Events.InteractionCreate, async interaction => {
  try{
    commands[interaction.commandName].exec(interaction);
  } catch (e) {
    //
  }
  
  if (interaction.isModalSubmit()) {
      await interaction.reply({ content: 'Your submission was received successfully! Creating you a ticket now.', ephemeral:true});

      await functions.createTicketChannel.exec(interaction);

  }
  try {
    if (interaction.isButton) {
      if (interaction.customId.startsWith("close-")) {
        functions.closeTicket.exec(interaction);
      }
      if (interaction.customId == ("buySkin")) {
        functions.getTicketInfo.exec(interaction);
      }
    }
  } catch (e) {
    //
  }
  
});

client.login(settings.token);
