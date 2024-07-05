const { Client, GatewayIntentBits, Events } = require("discord.js");
const fs = require("fs");
const config = JSON.parse(require('fs').readFileSync("config.json"))
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const utils = require("./utils");
const settings = JSON.parse(fs.readFileSync("config.json"));

const components = utils.getComponents();

client.once("ready", () => {
  console.log(`Logged into ${client.user.tag}`);
  setupTicketChannel();
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

async function createTicketChannel(interaction) {
  const guild = interaction.guild;
  const username = interaction.user.username;

  const ticketChannel = await utils.createTextChannel(guild, username);

  if (interaction.customId == "buying") {
    const fieldsArray = [];

    interaction.fields.fields.forEach((field, key) => {
      fieldsArray.push([field.customId, field.value]);
    });

    const embedData = components.ticketEmbed.embed(
      fieldsArray,
      ticketChannel
    );

    await ticketChannel.send(embedData);
  }
}

async function setupTicketChannel() {
  const ticketChannel = client.channels.cache.get(
    settings.ticketCreationChannelID,
  );
  await utils.purge(ticketChannel);
  await ticketChannel.send(components.startEmbed.embed());
}


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
          "Only admins can close tickets.",
          { ephemeral: true },
        );
      }
    } else if (interaction.customId === "open") {
       const modal = await components.buyModal.modal();
       await interaction.showModal(modal);
    }
  } catch (e) {
    console.log(e);  }
}

// Function to handle modal submissions
async function handleModalSubmit(interaction) {
  await interaction.reply({
    content:
      "Your submission was received! Creating you a ticket now...",
    ephemeral: true,
  });

  await createTicketChannel(interaction);
}
