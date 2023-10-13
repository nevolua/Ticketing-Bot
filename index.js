const { Client, GatewayIntentBits, Events } = require("discord.js");
const fs = require("fs");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const utils = require("./utils");
const settings = JSON.parse(fs.readFileSync("config.json"));

const functions = utils.getFunctions();
const commands = utils.getCommands();
const components = utils.getComponents();

// Register commands
utils.registerCmds();

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  setupTicketChannel();
  scheduleStockUpdates();
});

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    commands[interaction.commandName].exec(interaction);
  } catch (e) {
    //
  }

  if (interaction.isModalSubmit()) {
    await handleModalSubmit(interaction);
  }

  try {
    if (interaction.isButton) {
      handleButtonInteraction(interaction);
    }
  } catch (e) {
    //
  }
});

client.login(settings.token);

// Function to set up the ticket channel
async function setupTicketChannel() {
  const ticketChannel = client.channels.cache.get(
    settings.ticketMessageChannel,
  );
  await utils.purge(ticketChannel);
  await ticketChannel.send(components.startEmbed.embed());
}

// Function to schedule stock updates
function scheduleStockUpdates() {
  setInterval(async () => {
    utils.registerCmds();

    const stockChannel = client.channels.cache.get(settings.stockChannel);

    await utils.purge(stockChannel);
    await stockChannel.send(components.stockEmbed.embed());
  }, settings.stockUpdateInterval);
}

// Function to handle button interactions
async function handleButtonInteraction(interaction) {
  try {
    if (interaction.customId.startsWith("close-")) {
      const hasAdmin = utils.checkAdmin(interaction);
      if (hasAdmin) {
        await interaction.reply("Ticket will be closed in a few seconds..");
        setTimeout(async () => {
          await interaction.channel.delete();
        }, 3000);
      } else {
        await interaction.reply(
          "You don't have permission to use that command.",
          { ephemeral: true },
        );
      }
    } else if (interaction.customId === "buyItem") {
      functions.getTicketInfo.exec(interaction);
    }
  } catch (e) {
    //
  }
}

// Function to handle modal submissions
async function handleModalSubmit(interaction) {
  await interaction.reply({
    content:
      "Your submission was received successfully! Creating you a ticket now.",
    ephemeral: true,
  });
  await functions.createTicketChannel.exec(interaction);
}
