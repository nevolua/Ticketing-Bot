# Discord Ticketing Bot

The Discord Ticketing Bot is a versatile bot designed to create and manage ticketing systems, specifically for selling products/currency in your Discord server. This bot simplifies the process of handling support requests, enabling efficient communication between server members and support staff.


## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Bot Commands](#bot-commands)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Discord Ticketing Bot streamlines your server's support operations by providing users with a user-friendly interface to request assistance or create tickets. It's designed to be easy to set up and highly customizable, allowing server admins to tailor the system to their specific needs.

## Features

- **User-Friendly Ticket Creation**: Members can easily create support tickets with a few clicks using interactive buttons and forms.

- **Support Staff Integration**: Assign designated support staff to handle tickets and provide assistance.

- **Customizable Components**: Customize the appearance and behavior of ticket-related components, including buttons, forms, and messages.

- **Real-Time Stock Updates**: Keep users informed about the availability of items or services with real-time stock updates in a designated channel.

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

3. Configure the bot by editing the `config.json` file. Replace the placeholders with your bot token and other settings.

4. Start the bot:
```
npm run start
```

## Usage:

1. To create a support ticket, click the "Create Ticket" button.
2. Fill out the required information in the form.
3. Wait for a support staff member to respond to your ticket.

## Configuration:

The bot's behavior can be customized by editing the `config.json` file. Here's what each configuration option means:

- **token**: Your Discord bot token.
- **ticketMessageChannel**: The ID of the channel where ticket messages will be sent.
- **stockChannel**: The ID of the channel where stock information is displayed.
- **admins**: An array of user IDs with admin privileges.
- **stockUpdateInterval**: The time interval (in milliseconds) inbetween each stock information update.

## Bot Commands:

- `/addstock <item> [amount]`: Add items to the stock.
- `/subtractstock <item> [amount]`: Subtract items from the stock.
- `/newitem <name> <price> <amount>`: Add a new item to the stock.
- `/removeitem <name>`: Removes an item from the stock entirely.

## Customization:

You can customize the Discord Ticketing Bot in various ways:

- Modify the appearance and behavior of components in the `components/` directory.
- Extend the bot's functionality by adding new commands and features.
- Customize the messages and templates used by the bot for user interactions.

## Contributing:

We welcome contributions to this project. To get started, please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on our code of conduct and the process for submitting pull requests.

## License:

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements:

I'd like to acknowledge the following libraries and services that have made this project possible:

- [Discord.js](https://discord.js.org/): The Discord API library that powers this bot.
- [Node.js](https://nodejs.org/): The runtime environment for executing JavaScript code on the server.
