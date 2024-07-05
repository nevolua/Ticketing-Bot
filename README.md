# Discord Ticketing Bot

The Discord Ticketing Bot is a versatile bot designed to create and manage ticketing systems, specifically for selling products/currency in your Discord server. This bot simplifies the process of handling support requests, enabling efficient communication between server members and support staff.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Discord Ticketing Bot streamlines your server's support operations by providing users with a user-friendly interface to request assistance or create tickets. It's designed to be easy to set up and highly customizable, allowing server admins to tailor the system to their specific needs.

## Features

- **User-Friendly Ticket Creation**: Members can easily create support tickets with a few clicks using interactive buttons and forms.
- **Support Staff Integration**: Assign designated support staff to handle tickets and provide assistance.
- **Customizable Components**: Customize the appearance and behavior of ticket-related components, including buttons, forms, and messages.
- **Secure and Efficient**: The bot ensures data privacy and efficiency in handling support requests.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- NodeJS installed on your computer
- A Discord server where you have administrative privileges.
- A Discord bot token, which you can obtain by creating a bot on the Discord Developer Portal.

## Installation

1. Clone the repository to your local machine:
```
git clone https://github.com/yourusername/discord-ticketing-bot.git
```

2. Install the required Node.js dependencies:
```
npm install
```

3. Configure the bot by editing the `config.json` file. (refer to [configuration](#configuration))

4. Start the bot:
```
npm run start
```


## Usage (bot user)

1. To create a support ticket, click the button below the ticket creation embed
2. Fill out the required information in the form.
3. Wait for a support staff member to respond to your ticket.

## Configuration

The bot's behavior can be customized by editing the `config.json` file. Here's what each configuration option means:

- **token**: Your Discord bot token.
- **ticketCreationChannelID**: The ID of the channel where ticket messages will be sent.
- **admins**: An array of user IDs with admin privileges.
- **fields**: A set of fields to be filled out when creating a ticket.
- **ticketCreationEmbedText**: The text displayed on the ticket creation embed.
- **ticketCreationButtonText**: The text on the ticket creation button.
- **ticketCreationPopupTitle**: The title of the ticket creation popup.
- **createdTicketEmbedTitle**: The title of the embed sent when a ticket is created.


## Customization

You can customize the Discord Ticketing Bot in various ways:

- Modify the appearance and behavior of components in the `components/` directory.
- Extend the bot's functionality by adding new commands and features.
- Customize the messages and templates used by the bot for user interactions.

## Contributing

We welcome contributions to this project. To get started, please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
