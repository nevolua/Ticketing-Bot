const { Client, GatewayIntentBits, Events, TextInputBuilder, TextInputStyle, ModalBuilder, ActionRowBuilder, } = require("discord.js");
const fs = require("fs");
const config = JSON.parse(require('fs').readFileSync("config.json"))
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const components = [
  buyModal = function() {
    const config = JSON.parse(require('fs').readFileSync("config.json"))
  
    const fields = {};
  
    function addField(name, description) {
      fields[name] = new TextInputBuilder()
        .setCustomId(name)
        .setLabel(description)
        .setStyle(TextInputStyle.Short);
    }
  
  
    for (const fieldName in config.ticketFields) {
      if (config.ticketFields.hasOwnProperty(fieldName)) {
        const description = config.ticketFields[fieldName];
        addField(fieldName, description);
      }
    }
  
    const builder = new ModalBuilder()
      .setCustomId("buying")
      .setTitle(config.ticketCreationPopupTitle);
  
    for (const field in fields) {
      builder.addComponents(new ActionRowBuilder().addComponents(fields[field]));
    }
  
    return builder;
  },
  startEmbed = function() {
    const em = new EmbedBuilder({
      color: 10509236,
      timestamp: Date.now(),
      url: "https://discord.com",
      author: {
        url: "https://discord.com",
        icon_url: "https://cdn.discordapp.com/embed/avatars/0.png",
        name: ``,
      },
      description: `**${config.ticketCreationEmbedText}**`,
  
      footer: {
        text: "ticketing by nevo",
      },
    });
  
    const button = new ButtonBuilder()
      .setCustomId("open")
      .setLabel(config.ticketCreationButtonText)
      .setStyle(ButtonStyle.Primary);
  
    const row = new ActionRowBuilder().addComponents(button);
  
    return {
      content: "",
      embeds: [em],
      components: [row],
    };
  },
  ticketEmbed = function(fieldsArray, channel) {
    const config = JSON.parse(fs.readFileSync("config.json"));
  
    const em = new EmbedBuilder()
      .setColor(10509236)
      .setTimestamp(Date.now())
      .setTitle(`**${config.createdTicketEmbedTitle}**`)
      .setThumbnail("https://cdn.discordapp.com/embed/avatars/0.png")
      .setFooter({ text: "ticketing by nevo" });
  
    fieldsArray.forEach(([customId, value]) => {
      em.addFields({ name: customId, value: `> ${value}`, inline: false });
    });
  
    const button = new ButtonBuilder()
      .setCustomId("close-" + channel.id)
      .setLabel("Close Ticket")
      .setStyle(ButtonStyle.Secondary);
  
    const row = new ActionRowBuilder().addComponents(button);
  
    return {
      embeds: [em],
      components: [row],
    };
  }
]

const utils = [
  purge = async function(channel) {
    try {
      let fetched;
      do {
        fetched = await channel.messages.fetch({ limit: 100 });
        await channel.bulkDelete(fetched);
      } while (fetched.size >= 2);
    } catch (e) {
      //
    }
  },
  checkAdmin = function(interaction) {
    try {
      return (config.admins.includes(interaction.user.id)) || (config.admins.includes(parseInt(interaction.user.id)))
    } catch (e) {
      console.warn(`Config error: ${e}`)
    }
   
  },
  createTextChannel = async function(guild, username) {
    const channel = await guild.channels.create({
      name: username + "- Ticket",
      type: ChannelType.GuildText,
      parent: null,
    });
  
    return channel;
  },
  createTicketChannel = async function(interaction) {
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
  },
  
  setupTicketChannel = async function() {
    const ticketChannel = client.channels.cache.get(
      config.ticketCreationChannelID,
    );
    await utils.purge(ticketChannel);
    await ticketChannel.send(components.startEmbed());
  }
]

const handlers = [
  
  handleButtonInteraction = async function(interaction) {
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
      console.log(e);  
    }
  },

  handleModalSubmit = async function(interaction) {
    await interaction.reply({
      content:
        "Your submission was received! Creating you a ticket now...",
      ephemeral: true,
    });

    await utils.createTicketChannel(interaction);
  }

]


client.once("ready", () => {
  console.log(`Logged into ${client.user.tag}`);
  utils.setupTicketChannel();
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isModalSubmit()) {
    await handlers.handleModalSubmit(interaction);
  }

  try {
    if (interaction.isButton) {
      handlers.handleButtonInteraction(interaction);
    }
  } catch (e) {
    //
  }
});

(async () => {
  try {
    await client.login(config.token);
    console.log('Logged in successfully');
  } catch (e) {
    console.warn("Config Error: The bot token field in config.json is either missing or invalid.");
  }
})();